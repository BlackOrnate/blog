// src/lib/content.js
const contentModulesZh = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
})
const contentModulesEn = import.meta.glob('../content-en/**/*.md', {
  query: '?raw',
  import: 'default',
})

function stripCsdnToc(md) {
  // Remove CSDN-injected catalog block (Chinese or English heading variants)
  return md.replace(/^#{1,6}\s*(?:目录|Catalog|Table of Contents)\s*\n[\s\S]*?(?=\n#{1,3}\s)/m, '')
}

export async function loadPostContent(contentPath, lang = 'zh') {
  if (lang === 'en') {
    const enPath = `../content-en/${contentPath}`
    const enLoader = contentModulesEn[enPath]
    if (enLoader) {
      const raw = await enLoader()
      return stripCsdnToc(raw)
    }
    return null
  }
  const zhPath = `../content/${contentPath}`
  const loader = contentModulesZh[zhPath]
  if (!loader) return null
  const raw = await loader()
  return stripCsdnToc(raw)
}
