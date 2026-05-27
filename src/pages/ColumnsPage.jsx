import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { columns, getTopLevelColumns, getChildColumns } from '../data/columns'

function ColumnGroup({ parent }) {
  const children = getChildColumns(parent.id)
  const hasChildren = children.length > 0

  if (hasChildren) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{parent.icon}</span>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{parent.name}</h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{parent.description}</span>
        </div>
        <div className="post-grid">
          {children.map((child) => {
            const count = posts.filter((p) => p.column === child.id).length
            return (
              <Link key={child.id} to={`/column/${child.id}`} className="column-card">
                <div className="column-card__icon">{child.icon || parent.icon}</div>
                <div className="column-card__name">{child.name}</div>
                <div className="column-card__desc">{child.description}</div>
                <div className="column-card__count">{count} 篇文章</div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const count = posts.filter((p) => p.column === parent.id).length
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="post-grid">
        <Link to={`/column/${parent.id}`} className="column-card">
          <div className="column-card__icon">{parent.icon}</div>
          <div className="column-card__name">{parent.name}</div>
          <div className="column-card__desc">{parent.description}</div>
          <div className="column-card__count">{count} 篇文章</div>
        </Link>
      </div>
    </div>
  )
}

export default function ColumnsPage() {
  const topColumns = getTopLevelColumns()

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-header__title">所有专栏</h1>
        <p className="page-header__subtitle">
          共 {columns.filter((c) => !c.parent).length} 个专栏 · 76 篇文章
        </p>
      </div>

      {topColumns.map((col) => (
        <ColumnGroup key={col.id} parent={col} />
      ))}
    </div>
  )
}
