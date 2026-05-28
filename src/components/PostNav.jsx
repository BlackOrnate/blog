import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { postTitlesEn } from '../i18n/post-titles-en'

export default function PostNav({ prev, next }) {
  const { lang, t } = useLang()
  if (!prev && !next) return null

  const getTitle = (post) => lang === 'en' ? (postTitlesEn[post.id] ?? post.title) : post.title

  return (
    <nav className="post-nav">
      {prev && (
        <Link to={`/post/${prev.id}`} className="post-nav__item">
          <span className="post-nav__label">← {t.post.prev}</span>
          <span className="post-nav__title">{getTitle(prev)}</span>
        </Link>
      )}
      {next && (
        <Link
          to={`/post/${next.id}`}
          className="post-nav__item post-nav__item--next post-nav__item--push-right"
        >
          <span className="post-nav__label">{t.post.next} →</span>
          <span className="post-nav__title">{getTitle(next)}</span>
        </Link>
      )}
    </nav>
  )
}
