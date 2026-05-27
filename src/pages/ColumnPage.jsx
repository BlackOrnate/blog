// src/pages/ColumnPage.jsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { getColumn, getColumnAncestors, getTopLevelColumns, getChildColumns } from '../data/columns'
import { getPostsByColumn, posts } from '../data/posts'
import { postTitlesEn } from '../i18n/post-titles-en'
import Breadcrumb from '../components/Breadcrumb'
import { useLang } from '../contexts/LangContext'

function Sidebar({ currentColumnId }) {
  const { lang, t } = useLang()
  const topColumns = getTopLevelColumns()

  return (
    <aside className="column-sidebar">
      <p className="column-sidebar__title">{t.columns.sidebarNav}</p>
      <div className="column-tree">
        {topColumns.map((parent) => {
          const children = getChildColumns(parent.id)
          const parentName = lang === 'en' ? (parent.nameEn ?? parent.name) : parent.name
          if (children.length > 0) {
            return (
              <div key={parent.id} className="column-tree__parent">
                <div className="column-tree__parent-name">
                  <span>{parent.icon}</span>
                  <span>{parentName}</span>
                </div>
                <div className="column-tree__children">
                  {children.map((child) => {
                    const count = posts.filter((p) => p.column === child.id).length
                    const childName = lang === 'en' ? (child.nameEn ?? child.name) : child.name
                    return (
                      <Link
                        key={child.id}
                        to={`/column/${child.id}`}
                        className={`column-tree__child${currentColumnId === child.id ? ' active' : ''}`}
                      >
                        <span className="column-tree__child-name">{childName}</span>
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
                <span className="column-tree__child-name">{parentName}</span>
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
  const { lang, t } = useLang()
  const column = getColumn(columnId)

  if (!column) return <Navigate to="/columns" replace />

  const columnPosts = getPostsByColumn(columnId)
  const ancestors = getColumnAncestors(columnId)
  const colName = lang === 'en' ? (column.nameEn ?? column.name) : column.name
  const colDesc = lang === 'en' ? (column.descEn ?? column.description) : column.description

  const breadcrumbItems = [
    { label: t.breadcrumb.columns, href: '/columns' },
    ...ancestors.map((a) => ({
      label: lang === 'en' ? (a.nameEn ?? a.name) : a.name,
      href: `/column/${a.id}`,
    })),
    { label: colName },
  ]

  return (
    <div className="column-layout">
      <Sidebar currentColumnId={columnId} />

      <div className="column-main">
        <Breadcrumb items={breadcrumbItems} />

        <div className="column-main__header">
          <div className="column-main__icon">{column.icon}</div>
          <h1 className="column-main__name">{colName}</h1>
          <p className="column-main__desc">{colDesc}</p>
        </div>

        {getChildColumns(columnId).length > 0 ? (
          <div className="subcolumn-grid">
            {getChildColumns(columnId).map((child) => {
              const childName = lang === 'en' ? (child.nameEn ?? child.name) : child.name
              const childDesc = lang === 'en' ? (child.descEn ?? child.description) : child.description
              const count = posts.filter((p) => p.column === child.id).length
              return (
                <Link key={child.id} to={`/column/${child.id}`} className="column-card">
                  <div className="column-card__icon">{child.icon ?? column.icon}</div>
                  <div className="column-card__name">{childName}</div>
                  <div className="column-card__desc">{childDesc}</div>
                  <div className="column-card__count">{count} {t.columns.articles}</div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="column-article-list">
            {columnPosts.map((post, i) => {
              const title = lang === 'en' ? (postTitlesEn[post.id] ?? post.title) : post.title
              return (
                <Link key={post.id} to={`/post/${post.id}`} className="column-article-item">
                  <span className="column-article-item__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="column-article-item__title">{title}</span>
                  <span className="column-article-item__date">{post.date}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
