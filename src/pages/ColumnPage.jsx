import { useParams, Link, Navigate } from 'react-router-dom'
import { getColumn, getColumnAncestors, getTopLevelColumns, getChildColumns } from '../data/columns'
import { getPostsByColumn, posts } from '../data/posts'
import Breadcrumb from '../components/Breadcrumb'

function Sidebar({ currentColumnId }) {
  const topColumns = getTopLevelColumns()

  return (
    <aside className="column-sidebar">
      <p className="column-sidebar__title">专栏导航</p>
      <div className="column-tree">
        {topColumns.map((parent) => {
          const children = getChildColumns(parent.id)
          if (children.length > 0) {
            return (
              <div key={parent.id} className="column-tree__parent">
                <div className="column-tree__parent-name">
                  <span>{parent.icon}</span>
                  <span>{parent.name}</span>
                </div>
                <div className="column-tree__children">
                  {children.map((child) => {
                    const count = posts.filter((p) => p.column === child.id).length
                    return (
                      <Link
                        key={child.id}
                        to={`/column/${child.id}`}
                        className={`column-tree__child${currentColumnId === child.id ? ' active' : ''}`}
                      >
                        <span className="column-tree__child-name">{child.name}</span>
                        <span className="column-tree__child-count">{count}篇</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }
          const count = posts.filter((p) => p.column === parent.id).length
          return (
            <div key={parent.id} className="column-tree__parent">
              <Link
                to={`/column/${parent.id}`}
                className={`column-tree__child${currentColumnId === parent.id ? ' active' : ''}`}
                style={{ paddingLeft: 0 }}
              >
                <span>{parent.icon}</span>
                <span className="column-tree__child-name">{parent.name}</span>
                <span className="column-tree__child-count">{count}篇</span>
              </Link>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default function ColumnPage() {
  const { columnId } = useParams()
  const column = getColumn(columnId)

  if (!column) return <Navigate to="/columns" replace />

  const columnPosts = getPostsByColumn(columnId)
  const ancestors = getColumnAncestors(columnId)

  const breadcrumbItems = [
    { label: '专栏', href: '/columns' },
    ...ancestors.map((a) => ({ label: a.name, href: `/column/${a.id}` })),
    { label: column.name },
  ]

  return (
    <div className="column-layout">
      <Sidebar currentColumnId={columnId} />

      <div className="column-main">
        <Breadcrumb items={breadcrumbItems} />

        <div className="column-main__header">
          <div className="column-main__icon">{column.icon}</div>
          <h1 className="column-main__name">{column.name}</h1>
          <p className="column-main__desc">{column.description}</p>
        </div>

        <div className="column-article-list">
          {columnPosts.map((post, i) => (
            <Link key={post.id} to={`/post/${post.id}`} className="column-article-item">
              <span className="column-article-item__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="column-article-item__title">{post.title}</span>
              <span className="column-article-item__date">{post.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
