import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/">首页</Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="breadcrumb__sep">›</span>
          {item.href ? (
            <Link to={item.href}>{item.label}</Link>
          ) : (
            <span className="breadcrumb__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
