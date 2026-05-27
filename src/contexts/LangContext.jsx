// src/contexts/LangContext.jsx
import { createContext, useContext, useState } from 'react'
import zh from '../i18n/zh'
import en from '../i18n/en'

const strings = { zh, en }

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'zh')

  const toggle = () => {
    const next = lang === 'zh' ? 'en' : 'zh'
    localStorage.setItem('lang', next)
    setLang(next)
  }

  return (
    <LangContext.Provider value={{ lang, t: strings[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
