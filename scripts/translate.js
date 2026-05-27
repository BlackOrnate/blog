// scripts/translate.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_ZH = path.join(ROOT, 'src/content')
const CONTENT_EN = path.join(ROOT, 'src/content-en')
const TITLES_FILE = path.join(ROOT, 'src/i18n/post-titles-en.js')
const API_KEY = process.env.OPENAI_API_KEY

if (!API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required')
  process.exit(1)
}

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

async function translateWithOpenAI(content) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a technical translator. Translate the following Chinese Markdown article to English.
Rules:
- Preserve ALL Markdown syntax exactly (headings, code blocks, tables, math, lists)
- Do NOT translate content inside code blocks (\`\`\` blocks)
- Do NOT translate LaTeX math expressions ($...$  and $$...$$)
- Translate technical terms accurately
- Keep the same document structure and heading hierarchy
Return only the translated Markdown, no explanation.`,
        },
        { role: 'user', content },
      ],
      temperature: 0.3,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API error ${response.status}: ${err}`)
  }
  const data = await response.json()
  return data.choices[0].message.content
}

function extractFirstHeading(md) {
  const m = md.match(/^#{1,6}\s+(.+)/m)
  return m ? m[1].trim() : null
}

async function main() {
  const mdFiles = getAllMdFiles(CONTENT_ZH)
  const total = mdFiles.length
  console.log(`Found ${total} markdown files`)

  // Load any previously saved titles
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
    const enContent = await translateWithOpenAI(zhContent)

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

    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`\nDone! Processed ${total} files.`)
  console.log(`English titles saved to src/i18n/post-titles-en.js`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
