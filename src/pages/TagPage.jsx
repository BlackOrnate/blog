import { useNavigate } from 'react-router-dom'
import { posts, getAllTags } from '../data/posts'
import TagBadge from '../components/TagBadge'

const allTags = getAllTags()

export default function TagPage() {
  const navigate = useNavigate()

  const handleTagClick = (tag) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-header__title">所有标签</h1>
        <p className="page-header__subtitle">
          共 {allTags.length} 个标签 · {posts.length} 篇文章
        </p>
      </div>

      <div className="section">
        <div className="tag-cloud" style={{ marginBottom: '2rem' }}>
          {allTags.map(({ name }) => (
            <TagBadge
              key={name}
              tag={name}
              onClick={() => handleTagClick(name)}
            />
          ))}
        </div>

        <div className="tag-stats">
          {allTags.map(({ name, count }) => (
            <div key={name} className="tag-stat-row">
              <TagBadge tag={name} onClick={() => handleTagClick(name)} />
              <span className="tag-stat-count">{count} 篇文章</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
