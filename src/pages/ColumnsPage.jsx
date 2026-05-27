// src/pages/ColumnsPage.jsx
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import { columns, getTopLevelColumns, getChildColumns } from '../data/columns'
import { useLang } from '../contexts/LangContext'

function ColumnGroup({ parent }) {
  const { lang, t } = useLang()
  const children = getChildColumns(parent.id)
  const hasChildren = children.length > 0
  const parentName = lang === 'en' ? (parent.nameEn ?? parent.name) : parent.name
  const parentDesc = lang === 'en' ? (parent.descEn ?? parent.description) : parent.description

  if (hasChildren) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{parent.icon}</span>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{parentName}</h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{parentDesc}</span>
        </div>
        <div className="post-grid">
          {children.map((child) => {
            const count = posts.filter((p) => p.column === child.id).length
            const childName = lang === 'en' ? (child.nameEn ?? child.name) : child.name
            const childDesc = lang === 'en' ? (child.descEn ?? child.description) : child.description
            return (
              <Link key={child.id} to={`/column/${child.id}`} className="column-card">
                <div className="column-card__icon">{child.icon || parent.icon}</div>
                <div className="column-card__name">{childName}</div>
                <div className="column-card__desc">{childDesc}</div>
                <div className="column-card__count">{count} {t.columns.articles}</div>
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
          <div className="column-card__name">{parentName}</div>
          <div className="column-card__desc">{parentDesc}</div>
          <div className="column-card__count">{count} {t.columns.articles}</div>
        </Link>
      </div>
    </div>
  )
}

export default function ColumnsPage() {
  const { t } = useLang()
  const topColumns = getTopLevelColumns()

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-header__title">{t.columns.pageTitle}</h1>
        <p className="page-header__subtitle">
          {t.columns.subtitle.replace('{count}', columns.filter((c) => !c.parent).length)}
        </p>
      </div>

      {topColumns.map((col) => (
        <ColumnGroup key={col.id} parent={col} />
      ))}
    </div>
  )
}
