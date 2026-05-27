// scripts/translate.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_ZH = path.join(ROOT, 'src/content')
const CONTENT_EN = path.join(ROOT, 'src/content-en')
const TITLES_FILE = path.join(ROOT, 'src/i18n/post-titles-en.js')
const API_KEY = process.env.DEEPL_API_KEY

if (!API_KEY) {
  console.error('Error: DEEPL_API_KEY environment variable is required')
  console.error('Get your free key at https://www.deepl.com/pro-api')
  console.error('Run: $env:DEEPL_API_KEY = "your-key-here"; node scripts/translate.js')
  process.exit(1)
}

// Free keys end with :fx → use api-free subdomain; Pro keys use api subdomain
const DEEPL_ENDPOINT = API_KEY.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate'

// Build contentPath → postId map by parsing posts.js source text
const postsSource = fs.readFileSync(path.join(ROOT, 'src/data/posts.js'), 'utf-8')
const pathToId = {}
for (const m of postsSource.matchAll(/id:\s*(\d+),[\s\S]*?contentPath:\s*'([^']+)'/g)) {
  pathToId[m[2]] = Number(m[1])
}

function getAllMdFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...getAllMdFiles(full, base))
    else if (entry.name.endsWith('.md')) files.push(path.relative(base, full))
  }
  return files
}

// Replace code blocks and math with __KEEP_N__ placeholders before sending to DeepL.
// DeepL treats identifiers of this form as untranslatable tokens.
function protectNonTranslatable(text) {
  const saved = []
  let i = 0
  const save = (match) => {
    const id = `__KEEP_${i++}__`
    saved.push({ id, original: match })
    return id
  }
  // Order: fenced code blocks first (longest match), then display math, inline code, inline math
  const processed = text
    .replace(/```[\s\S]*?```/g, save)
    .replace(/\$\$[\s\S]*?\$\$/g, save)
    .replace(/`[^`\n]+`/g, save)
    .replace(/\$[^\n$]+\$/g, save)
  return { processed, saved }
}

function restoreNonTranslatable(text, saved) {
  let result = text
  for (const { id, original } of saved) {
    result = result.split(id).join(original)
  }
  return result
}

async function translateWithDeepL(content) {
  const { processed, saved } = protectNonTranslatable(content)

  const res = await fetch(DEEPL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [processed],
      source_lang: 'ZH',
      target_lang: 'EN-US',
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`DeepL API error ${res.status}: ${body}`)
  }

  const data = await res.json()
  return restoreNonTranslatable(data.translations[0].text, saved)
}

function extractFirstHeading(md) {
  const m = md.match(/^#{1,6}\s+(.+)/m)
  return m ? m[1].trim() : null
}

async function main() {
  const mdFiles = getAllMdFiles(CONTENT_ZH)
  const total = mdFiles.length
  console.log(`Found ${total} markdown files`)
  console.log(`Using endpoint: ${DEEPL_ENDPOINT}\n`)

  // Load any previously saved titles (resumable across runs)
  const titlesMap = {}
  if (fs.existsSync(TITLES_FILE)) {
    const src = fs.readFileSync(TITLES_FILE, 'utf-8')
    for (const m of src.matchAll(/(\d+):\s*"((?:[^"\\]|\\.)*)"/g)) {
      titlesMap[Number(m[1])] = m[2]
    }
  }

  function writeTitles() {
    const lines = Object.entries(titlesMap)
      .map(([id, t]) => `  ${id}: ${JSON.stringify(t)}`)
      .join(',\n')
    fs.writeFileSync(TITLES_FILE, `export const postTitlesEn = {\n${lines},\n}\n`, 'utf-8')
  }

  let done = 0
  for (const relPath of mdFiles) {
    const srcFile = path.join(CONTENT_ZH, relPath)
    const destFile = path.join(CONTENT_EN, relPath)
    const relPathForward = relPath.replace(/\\/g, '/')

    if (fs.existsSync(destFile)) {
      done++
      console.log(`[${done}/${total}] Skipping (exists): ${relPathForward}`)
      continue
    }

    done++
    console.log(`[${done}/${total}] Translating: ${relPathForward}`)

    const zhContent = fs.readFileSync(srcFile, 'utf-8')
    const enContent = await translateWithDeepL(zhContent)

    fs.mkdirSync(path.dirname(destFile), { recursive: true })
    fs.writeFileSync(destFile, enContent, 'utf-8')

    const postId = pathToId[relPathForward]
    if (postId) {
      const title = extractFirstHeading(enContent)
      if (title) {
        titlesMap[postId] = title
        writeTitles()
      }
    }

    // DeepL free tier allows up to 5 req/s; 300ms gap keeps well within limit
    await new Promise((r) => setTimeout(r, 300))
  }

  console.log(`\nDone! Processed ${total} files.`)
  console.log(`English titles saved to src/i18n/post-titles-en.js`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
