// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { posts, getRecentPosts } from '../data/posts'
import { columns, getTopLevelColumns, getChildColumns, getColumn } from '../data/columns'
import { useLang } from '../contexts/LangContext'
import { postTitlesEn } from '../i18n/post-titles-en'

const recentPosts = getRecentPosts(6)
const topColumns = getTopLevelColumns()

function TopColumnCard({ col }) {
  const { lang, t } = useLang()
  const children = getChildColumns(col.id)
  const count =
    children.length > 0
      ? posts.filter((p) => children.some((c) => c.id === p.column)).length
      : posts.filter((p) => p.column === col.id).length

  const name = lang === 'en' ? (col.nameEn ?? col.name) : col.name
  const desc = lang === 'en' ? (col.descEn ?? col.description) : col.description

  return (
    <Link to={`/column/${col.id}`} className="column-card">
      <div className="column-card__icon">{col.icon}</div>
      <div className="column-card__name">{name}</div>
      <div className="column-card__desc">{desc}</div>
      <div className="column-card__count">
        {count} {t.columns.articles}
        {children.length > 0 ? ` · ${children.length} ${t.columns.subColumns}` : ''}
      </div>
    </Link>
  )
}

export default function Home() {
  const { lang, t } = useLang()

  return (
    <div className="container">
      <div className="home-hero">
        <div className="home-hero__eyebrow">{t.home.eyebrow}</div>
        <h1 className="home-hero__title">{t.home.title}</h1>
        <p className="home-hero__subtitle">{t.home.subtitle}</p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-item__num">76</div>
          <div className="stat-item__label">{t.stats.articles}</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">{columns.filter((c) => !c.parent).length}</div>
          <div className="stat-item__label">{t.stats.columns}</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">3+</div>
          <div className="stat-item__label">{t.stats.years}</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">43K+</div>
          <div className="stat-item__label">{t.stats.reads}</div>
        </div>
      </div>

      <div className="section">
        <p className="section__label">{t.home.recentPosts}</p>
        <div className="post-grid">
          {recentPosts.map((post) => {
            const col = getColumn(post.column)
            const colName = lang === 'en' ? (col?.nameEn ?? col?.name) : col?.name
            const title = lang === 'en' ? (postTitlesEn[post.id] || post.title) : post.title
            return (
              <Link key={post.id} to={`/post/${post.id}`} className="post-card">
                <div className="post-card__meta">
                  <span className="post-card__order">{colName}</span>
                  <span className="post-card__date">{post.date}</span>
                </div>
                <h3 className="post-card__title">{title}</h3>
              </Link>
            )
          })}
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <Link to="/columns" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
            {t.home.viewAll}
          </Link>
        </div>
      </div>

      <div className="section" style={{ paddingBottom: '3rem' }}>
        <p className="section__label">{t.home.allColumns}</p>
        <div className="home-columns-grid">
          {topColumns.map((col) => (
            <TopColumnCard key={col.id} col={col} />
          ))}
        </div>
      </div>
    </div>
  )
}
