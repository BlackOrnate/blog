import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { getPost, getAdjacentPosts } from '../data/posts'
import { getColumn, getColumnAncestors } from '../data/columns'
import { loadPostContent } from '../lib/content'
import Breadcrumb from '../components/Breadcrumb'
import TableOfContents from '../components/TableOfContents'
import PostNav from '../components/PostNav'
import CodeBlock from '../components/CodeBlock'

const rehypeHighlightOptions = { detect: true, ignoreMissing: true }

// Strip common leading whitespace from fenced code block content.
// CommonMark strips at most 3 spaces from code content, so deeply-nested
// code blocks (4+ space indent) leak 1 extra space into the rendered output.
function rehypeDedentCode() {
  return (tree) => {
    function walk(node) {
      if (
        node.type === 'element' &&
        node.tagName === 'pre' &&
        node.children?.length
      ) {
        const codeNode = node.children.find(
          (c) => c.type === 'element' && c.tagName === 'code'
        )
        if (
          codeNode?.children?.length === 1 &&
          codeNode.children[0].type === 'text'
        ) {
          const text = codeNode.children[0].value
          const lines = text.split('\n')
          const nonEmpty = lines.filter((l) => l.trim().length > 0)
          if (nonEmpty.length === 0) return
          const minIndent = Math.min(
            ...nonEmpty.map((l) => (l.match(/^( *)/) || ['', ''])[1].length)
          )
          if (minIndent > 0) {
            codeNode.children[0].value = lines
              .map((l) => l.slice(minIndent))
              .join('\n')
          }
        }
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}

function PostImage({ src, alt }) {
  const [broken, setBroken] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (broken) {
    return (
      <span className="img-broken" title={src}>
        [{alt || '图片'}]
      </span>
    )
  }
  return (
    <>
      <img
        src={src}
        alt={alt || ''}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="post-img-zoomable"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <button className="lightbox-close" onClick={() => setOpen(false)}>✕</button>
          <img
            src={src}
            alt={alt || ''}
            referrerPolicy="no-referrer"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          {alt && <p className="lightbox-caption">{alt}</p>}
        </div>
      )}
    </>
  )
}

function PreBlock({ children }) {
  const nodes = Array.isArray(children) ? children : [children]
  const codeEl = nodes.find(
    (n) => n?.type === 'code' || n?.props?.className?.includes('language-')
  )
  const props = codeEl?.props ?? {}
  const className = props.className || ''
  return <CodeBlock className={className}>{props.children}</CodeBlock>
}

const mdComponents = {
  pre: PreBlock,
  img: PostImage,
}

export default function PostDetail() {
  const { id } = useParams()
  const post = getPost(id)

  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [headings, setHeadings] = useState([])
  const contentRef = useRef(null)
  const isFirstMount = useRef(true)

  // Take over scroll restoration from the browser
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Save scroll position to sessionStorage on scroll
  useEffect(() => {
    if (!id) return
    const onScroll = () => sessionStorage.setItem(`scroll:${id}`, String(window.scrollY))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [id])

  useEffect(() => {
    if (!post) return
    // On SPA navigation (not first mount / refresh), clear saved position
    if (!isFirstMount.current) sessionStorage.removeItem(`scroll:${id}`)
    isFirstMount.current = false
    setLoading(true)
    setHeadings([])
    loadPostContent(post.contentPath).then((raw) => {
      setContent(raw)
      setLoading(false)
    })
  }, [post?.id])

  // After content renders: restore saved position or scroll to top
  useEffect(() => {
    if (loading) return
    const saved = sessionStorage.getItem(`scroll:${id}`)
    if (saved) {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)))
    } else {
      window.scrollTo(0, 0)
    }
  }, [loading, id])

  // Extract headings from the rendered DOM — uses real rehype-slug IDs
  useEffect(() => {
    if (!contentRef.current || loading) return
    const timer = setTimeout(() => {
      const els = contentRef.current.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
      const found = Array.from(els)
        .filter((el) => el.id && el.textContent.trim() !== '目录')
        .map((el) => ({
          level: parseInt(el.tagName[1]),
          text: el.textContent.trim(),
          id: el.id,
        }))
      // Normalize so the shallowest heading always maps to level 2 (TOC CSS base)
      const minLevel = found.length ? Math.min(...found.map((h) => h.level)) : 2
      const shift = minLevel - 2
      setHeadings(found.map((h) => ({ ...h, level: h.level - shift })))
    }, 80)
    return () => clearTimeout(timer)
  }, [loading, content])

  if (!post) {
    return (
      <div className="container container--narrow">
        <div className="not-found" style={{ padding: '4rem 0' }}>
          <h1>404</h1>
          <p>文章未找到</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    )
  }

  const column = getColumn(post.column)
  const ancestors = getColumnAncestors(post.column)
  const { prev, next } = getAdjacentPosts(post)

  const breadcrumbItems = [
    { label: '专栏', href: '/columns' },
    ...ancestors.map((a) => ({ label: a.name, href: `/column/${a.id}` })),
    { label: column?.name, href: `/column/${post.column}` },
    { label: post.title },
  ]

  const isPending = content && content.includes('内容待导入')
  const hasToc = headings.length > 0

  return (
    <div className={`post-layout${hasToc ? '' : ' post-layout--no-toc'}`}>
      <article className="post-main">
        <Breadcrumb items={breadcrumbItems} />

        <header className="post-detail__header">
          <h1 className="post-detail__title">{post.title}</h1>
          <div className="post-detail__meta">
            <span>{post.date}</span>
            <span className="post-detail__meta-sep">·</span>
            <Link to={`/column/${post.column}`} style={{ color: 'var(--accent)' }}>
              {column?.name}
            </Link>
            <span className="post-detail__meta-sep">·</span>
            <a
              href={post.csdnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="csdn-link-btn"
            >
              查看 CSDN 原文 ↗
            </a>
          </div>
        </header>

        {isPending && (
          <div className="content-pending-banner">
            <span>⚠️ 文章内容尚未导入，请直接查看 CSDN 原文。</span>
          </div>
        )}

        {loading ? (
          <div style={{ color: 'var(--text-secondary)', padding: '2rem 0' }}>加载中...</div>
        ) : (
          <div className="post-content" ref={contentRef}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[
                rehypeDedentCode,
                [rehypeHighlight, rehypeHighlightOptions],
                rehypeSlug,
                rehypeKatex,
              ]}
              components={mdComponents}
            >
              {content || ''}
            </ReactMarkdown>
          </div>
        )}

        <PostNav prev={prev} next={next} />
      </article>

      {hasToc && <TableOfContents headings={headings} />}
    </div>
  )
}
