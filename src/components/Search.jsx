// src/components/Search.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getColumn } from '../data/columns'
import { postTitlesEn } from '../i18n/post-titles-en'
import { ensureSearchIndex, searchInIndex } from '../lib/search'
import { useLang } from '../contexts/LangContext'

function Highlight({ text, query }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  )
}

export default function Search({ onClose }) {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [index, setIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    setLoading(true)
    setIndex(null)
    ensureSearchIndex(lang).then((idx) => {
      setIndex(idx)
      setLoading(false)
    })
  }, [lang])

  useEffect(() => {
    if (!index) return
    setResults(searchInIndex(index, query))
  }, [query, index])

  const goTo = (id) => {
    navigate(`/post/${id}`)
    onClose()
  }

  return (
    <div
      className="search-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="search-modal" role="dialog" aria-label={t.search.trigger}>
        <div className="search-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close" onClick={onClose}>ESC</button>
        </div>

        <div className="search-results">
          {loading && (
            <div className="search-empty">{t.search.indexing}</div>
          )}
          {!loading && query && results.length === 0 && (
            <div className="search-empty">
              {t.search.noResults.replace('{query}', query)}
            </div>
          )}
          {!loading && results.map(({ post, snippet }) => {
            const col = getColumn(post.column)
            const title = lang === 'en' ? (postTitlesEn[post.id] ?? post.title) : post.title
            const colName = lang === 'en' ? (col?.nameEn ?? col?.name) : col?.name
            return (
              <div
                key={post.id}
                className="search-result-item"
                tabIndex={0}
                onClick={() => goTo(post.id)}
                onKeyDown={(e) => e.key === 'Enter' && goTo(post.id)}
              >
                <div className="search-result-body">
                  <div className="search-result-title">
                    <Highlight text={title} query={query} />
                  </div>
                  {snippet && (
                    <div className="search-result-snippet">
                      <Highlight text={snippet} query={query} />
                    </div>
                  )}
                </div>
                <span className="search-result-column">{colName}</span>
              </div>
            )
          })}
          {!loading && !query && (
            <div className="search-empty">{t.search.hint}</div>
          )}
        </div>
      </div>
    </div>
  )
}
