import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Search from '../Search'
import { useLang } from '../../contexts/LangContext'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })

  const toggle = () => {
    const next = !isDark
    const theme = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    setIsDark(next)
  }

  return [isDark, toggle]
}

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const [isDark, toggleTheme] = useTheme()
  const { lang, t, toggle: toggleLang } = useLang()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">B</span>
            BlackOrnate
          </Link>

          <div className="navbar__right">
            <nav>
              <ul className="navbar__nav">
                <li><NavLink to="/" end>{t.nav.home}</NavLink></li>
                <li><NavLink to="/columns">{t.nav.columns}</NavLink></li>
                <li><NavLink to="/about">{t.nav.about}</NavLink></li>
              </ul>
            </nav>

            <button className="search-trigger" onClick={() => setShowSearch(true)} aria-label={t.search.trigger}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>{t.search.trigger}</span>
            </button>

            <button className="lang-toggle" onClick={toggleLang} aria-label={t.lang.ariaLabel} aria-pressed={lang === 'en'}>
              {t.lang.label}
            </button>

            <button className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? t.theme.light : t.theme.dark}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {showSearch && <Search onClose={() => setShowSearch(false)} />}
    </>
  )
}
