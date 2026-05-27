export default function TagBadge({ tag, active, onClick }) {
  return (
    <span
      className={`tag-badge${active ? ' tag-badge--active' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {tag}
    </span>
  )
}
