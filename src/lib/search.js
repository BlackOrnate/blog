import { posts } from '../data/posts'
import { loadPostContent } from './content'

let indexCache = null
let indexBuildPromise = null

export async function ensureSearchIndex() {
  if (indexCache) return indexCache
  if (indexBuildPromise) return indexBuildPromise

  indexBuildPromise = Promise.all(
    posts.map(async (post) => {
      const content = await loadPostContent(post.contentPath)
      return { post, content: content || '' }
    })
  ).then((entries) => {
    indexCache = entries
    return entries
  })

  return indexBuildPromise
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')   // remove code blocks
    .replace(/`[^`]+`/g, ' ')           // remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' ')   // remove images
    .replace(/\[.*?\]\(.*?\)/g, ' ')    // remove links
    .replace(/^#{1,6}\s+/gm, ' ')       // remove heading markers
    .replace(/[*_>|]/g, ' ')            // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim()
}

export function getSnippet(content, query) {
  const stripped = stripMarkdown(content)
  const lower = stripped.toLowerCase()
  const qLower = query.toLowerCase()
  const idx = lower.indexOf(qLower)
  if (idx === -1) return ''
  const start = Math.max(0, idx - 35)
  const end = Math.min(stripped.length, idx + qLower.length + 85)
  let snippet = stripped.slice(start, end).trim()
  if (start > 0) snippet = '…' + snippet
  if (end < stripped.length) snippet += '…'
  return snippet
}

export function searchInIndex(entries, query) {
  const q = query.toLowerCase().trim()
  if (!q || !entries) return []

  const results = []
  for (const { post, content } of entries) {
    const titleMatch = post.title.toLowerCase().includes(q)
    const contentMatch = content.toLowerCase().includes(q)
    if (titleMatch || contentMatch) {
      results.push({
        post,
        titleMatch,
        snippet: titleMatch ? null : getSnippet(content, q),
      })
    }
  }
  // Title matches appear first, then content-only matches
  return results.sort((a, b) => Number(b.titleMatch) - Number(a.titleMatch))
}
