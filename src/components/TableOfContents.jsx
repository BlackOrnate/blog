import { useState, useEffect, useRef } from 'react'

function computeParentIds(headings) {
  const parents = new Set()
  for (let i = 0; i < headings.length - 1; i++) {
    if (headings[i + 1].level > headings[i].level) parents.add(headings[i].id)
  }
  return parents
}

function computeVisible(headings, collapsed) {
  const result = []
  let hideBelow = null
  for (const h of headings) {
    if (hideBelow !== null) {
      if (h.level > hideBelow) continue
      hideBelow = null
    }
    result.push(h)
    if (collapsed.has(h.id)) hideBelow = h.level
  }
  return result
}

export default function TableOfContents({ headings }) {
  const [active, setActive] = useState('')
  const [collapsed, setCollapsed] = useState(new Set())
  const lockRef = useRef(false)
  const lockTimer = useRef(null)

  useEffect(() => {
    if (!headings.length) return
    const ids = headings.map((h) => h.id)
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  const parentIds = computeParentIds(headings)
  const visible = computeVisible(headings, collapsed)

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setActive(id)
    lockRef.current = true
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { lockRef.current = false }, 1500)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleCollapse = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside className="toc-sidebar">
      <p className="toc-sidebar__title">目录</p>
      <ul className="toc-list">
        {visible.map((h) => {
          const isParent = parentIds.has(h.id)
          const isCollapsed = collapsed.has(h.id)
          return (
            <li key={h.id} className={`toc-item toc-item--h${h.level}`}>
              {isParent ? (
                <div className="toc-item-row">
                  <a
                    href={`#${h.id}`}
                    className={`toc-link${active === h.id ? ' active' : ''}`}
                    onClick={(e) => handleLinkClick(e, h.id)}
                  >
                    {h.text}
                  </a>
                  <button
                    className={`toc-toggle${isCollapsed ? ' toc-toggle--collapsed' : ''}`}
                    onClick={(e) => toggleCollapse(e, h.id)}
                    title={isCollapsed ? '展开' : '折叠'}
                  >
                    ▾
                  </button>
                </div>
              ) : (
                <a
                  href={`#${h.id}`}
                  className={`toc-link${active === h.id ? ' active' : ''}`}
                  onClick={(e) => handleLinkClick(e, h.id)}
                >
                  {h.text}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
