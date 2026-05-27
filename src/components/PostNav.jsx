import { Link } from 'react-router-dom'

export default function PostNav({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav className="post-nav">
      {prev && (
        <Link to={`/post/${prev.id}`} className="post-nav__item">
          <span className="post-nav__label">← 上一篇</span>
          <span className="post-nav__title">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link
          to={`/post/${next.id}`}
          className="post-nav__item post-nav__item--next post-nav__item--push-right"
        >
          <span className="post-nav__label">下一篇 →</span>
          <span className="post-nav__title">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}
