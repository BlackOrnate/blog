const contentModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
})

// Remove CSDN-generated TOC block at the top of articles.
// Pattern: a heading whose text is only "目录", followed by list items until the next real heading.
function stripCsdnToc(md) {
  return md.replace(/^#{1,6}\s*目录\s*\n[\s\S]*?(?=\n#{1,3}\s)/m, '')
}

export async function loadPostContent(contentPath) {
  const path = `../content/${contentPath}`
  const loader = contentModules[path]
  if (!loader) return null
  const raw = await loader()
  return stripCsdnToc(raw)
}

