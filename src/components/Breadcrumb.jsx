// src/components/Breadcrumb.jsx
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

export default function Breadcrumb({ items }) {
  const { t } = useLang()
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/">{t.breadcrumb.home}</Link>
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
