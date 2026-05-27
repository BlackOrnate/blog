import { Link } from 'react-router-dom'
import TagBadge from './TagBadge'

export default function PostCard({ post, onTagClick }) {
  return (
    <Link to={`/post/${post.slug}`} className="post-card">
      <h2 className="post-card__title">{post.title}</h2>
      <div className="post-card__meta">
        <span className="post-card__date">{post.date}</span>
        {post.tags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            onClick={(e) => {
              e && e.preventDefault && e.preventDefault()
              onTagClick && onTagClick(tag)
            }}
          />
        ))}
      </div>
      <p className="post-card__summary">{post.summary}</p>
    </Link>
  )
}
