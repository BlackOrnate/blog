import TagBadge from './TagBadge'

export default function TagCloud({ tags, activeTag, onTagClick }) {
  return (
    <div className="tag-cloud">
      {tags.map(({ name, count }) => (
        <TagBadge
          key={name}
          tag={`${name} (${count})`}
          active={activeTag === name}
          onClick={() => onTagClick(name)}
        />
      ))}
    </div>
  )
}
