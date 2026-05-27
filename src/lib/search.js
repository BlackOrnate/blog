// src/lib/search.js
import { posts } from '../data/posts'
import { loadPostContent } from './content'

const indexCache = { zh: null, en: null }
const indexBuildPromise = { zh: null, en: null }

export function resetSearchIndex() {
  indexCache.zh = null
  indexCache.en = null
  indexBuildPromise.zh = null
  indexBuildPromise.en = null
}

export async function ensureSearchIndex(lang = 'zh') {
  if (indexCache[lang]) return indexCache[lang]
  if (indexBuildPromise[lang]) return indexBuildPromise[lang]

  indexBuildPromise[lang] = Promise.all(
    posts.map(async (post) => {
      const content = await loadPostContent(post.contentPath, lang)
      return { post, content: content || '' }
    })
  ).then((entries) => {
    indexCache[lang] = entries
    return entries
  })

  return indexBuildPromise[lang]
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[.*?\]\(.*?\)/g, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[*_>|]/g, ' ')
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
  return results.sort((a, b) => Number(b.titleMatch) - Number(a.titleMatch))
}
