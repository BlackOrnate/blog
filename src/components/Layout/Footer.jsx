import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>
        © {year} BlackOrnate · Hongrui Zhu
        {' · '}
        <a href="https://github.com/BlackOrnate" target="_blank" rel="noopener noreferrer">GitHub</a>
        {' · '}
        <a href="https://www.linkedin.com/in/hongruizhu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {' · '}
        <a href="https://blog.csdn.net/BlackOrnate" target="_blank" rel="noopener noreferrer">CSDN</a>
        {' · '}
        <Link to="/columns">76 篇文章</Link>
        {' · 用 React + Vite 构建'}
      </p>
    </footer>
  )
}
