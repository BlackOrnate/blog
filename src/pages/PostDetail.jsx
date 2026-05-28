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
import { useLang } from '../contexts/LangContext'
import { postTitlesEn } from '../i18n/post-titles-en'

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
  const { lang, t } = useLang()
  const post = getPost(id)

  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [headings, setHeadings] = useState([])
  const [showFallback, setShowFallback] = useState(false)
  const contentRef = useRef(null)
  const isFirstMount = useRef(true)
  const prevPostId = useRef(null)

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
    const isLangSwitch = prevPostId.current === post.id
    prevPostId.current = post.id
    // Only clear saved scroll on actual navigation, not on language switch
    if (!isFirstMount.current && !isLangSwitch) sessionStorage.removeItem(`scroll:${id}`)
    isFirstMount.current = false
    setLoading(true)
    setHeadings([])
    setShowFallback(false)

    loadPostContent(post.contentPath, lang).then((raw) => {
      if (raw === null && lang === 'en') {
        setShowFallback(true)
        return loadPostContent(post.contentPath, 'zh').then((zhRaw) => {
          setContent(zhRaw)
          setLoading(false)
        })
      }
      setContent(raw)
      setLoading(false)
    })
  }, [post?.id, lang])

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
          <p>{t.post.notFound}</p>
          <Link to="/" className="btn">{t.post.backHome}</Link>
        </div>
      </div>
    )
  }

  const column = getColumn(post.column)
  const ancestors = getColumnAncestors(post.column)
  const { prev, next } = getAdjacentPosts(post)

  const displayTitle = lang === 'en' ? (postTitlesEn[post.id] ?? post.title) : post.title
  const colName = lang === 'en' ? (column?.nameEn ?? column?.name) : column?.name

  const breadcrumbItems = [
    { label: t.breadcrumb.columns, href: '/columns' },
    ...ancestors.map((a) => ({
      label: lang === 'en' ? (a.nameEn ?? a.name) : a.name,
      href: `/column/${a.id}`,
    })),
    { label: colName, href: `/column/${post.column}` },
    { label: displayTitle },
  ]

  const isPending = content && content.includes('内容待导入')
  const hasToc = headings.length > 0

  return (
    <div className={`post-layout${hasToc ? '' : ' post-layout--no-toc'}`}>
      <article className="post-main">
        <Breadcrumb items={breadcrumbItems} />

        <header className="post-detail__header">
          <h1 className="post-detail__title">{displayTitle}</h1>
          <div className="post-detail__meta">
            <span>{post.date}</span>
            <span className="post-detail__meta-sep">·</span>
            <Link to={`/column/${post.column}`} style={{ color: 'var(--accent)' }}>
              {colName}
            </Link>
            <span className="post-detail__meta-sep">·</span>
            <a href={post.csdnUrl} target="_blank" rel="noopener noreferrer" className="csdn-link-btn">
              {t.post.csdnLink}
            </a>
          </div>
        </header>

        {showFallback && (
          <div className="content-pending-banner">
            <span>{t.post.noEnglish}</span>
          </div>
        )}

        {isPending && !showFallback && (
          <div className="content-pending-banner">
            <span>{t.post.pendingBanner}</span>
          </div>
        )}

        {loading ? (
          <div style={{ color: 'var(--text-secondary)', padding: '2rem 0' }}>{t.post.loading}</div>
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
