import { useState, useRef } from 'react'

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef(null)

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="code-block-outer">
      <div className="code-block-scroll">
        <pre className={className} ref={preRef}>
          <code>{children}</code>
        </pre>
      </div>
      <button className="code-copy-btn" onClick={handleCopy}>
        {copied ? '已复制!' : '复制'}
      </button>
    </div>
  )
}
