import { Link } from 'react-router-dom'
import { posts, getRecentPosts } from '../data/posts'
import { columns, getTopLevelColumns, getChildColumns, getColumn } from '../data/columns'

const recentPosts = getRecentPosts(6)
const topColumns = getTopLevelColumns()

function TopColumnCard({ col }) {
  const children = getChildColumns(col.id)
  const count = children.length > 0
    ? posts.filter((p) => children.some((c) => c.id === p.column)).length
    : posts.filter((p) => p.column === col.id).length

  return (
    <Link to={`/column/${col.id}`} className="column-card">
      <div className="column-card__icon">{col.icon}</div>
      <div className="column-card__name">{col.name}</div>
      <div className="column-card__desc">{col.description}</div>
      <div className="column-card__count">{count} 篇文章{children.length > 0 ? ` · ${children.length} 个子专栏` : ''}</div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="container">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero__eyebrow">✦&nbsp;&nbsp;技术博客</div>
        <h1 className="home-hero__title">BlackOrnate 的博客</h1>
        <p className="home-hero__subtitle">
          记录从 C语言 到 机器学习 的完整学习历程，涵盖 Python · Java · 数据结构 · LLM 等方向。
        </p>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-item__num">76</div>
          <div className="stat-item__label">篇文章</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">{columns.filter((c) => !c.parent).length}</div>
          <div className="stat-item__label">个专栏</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">3+</div>
          <div className="stat-item__label">年积累</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__num">43K+</div>
          <div className="stat-item__label">CSDN 阅读</div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="section">
        <p className="section__label">最近更新</p>
        <div className="post-grid">
          {recentPosts.map((post) => {
            const col = getColumn(post.column)
            return (
              <Link key={post.id} to={`/post/${post.id}`} className="post-card">
                <div className="post-card__meta">
                  <span className="post-card__order">{col?.name}</span>
                  <span className="post-card__date">{post.date}</span>
                </div>
                <h3 className="post-card__title">{post.title}</h3>
              </Link>
            )
          })}
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <Link to="/columns" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>
            浏览全部 76 篇文章 →
          </Link>
        </div>
      </div>

      {/* Column Overview */}
      <div className="section" style={{ paddingBottom: '3rem' }}>
        <p className="section__label">全部专栏</p>
        <div className="home-columns-grid">
          {topColumns.map((col) => (
            <TopColumnCard key={col.id} col={col} />
          ))}
        </div>
      </div>
    </div>
  )
}
