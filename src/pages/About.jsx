// src/pages/About.jsx
import React from 'react'
import TagBadge from '../components/TagBadge'
import { useLang } from '../contexts/LangContext'

const skills = [
  'Python', 'PyTorch', 'Machine Learning', 'Computer Vision',
  'Data Analysis', 'NumPy & Pandas', 'Java', 'Django',
  'MySQL', 'Linux', 'Git', 'R',
]

const education = [
  {
    degree: 'M.S. Biomedical Informatics',
    school: 'Stony Brook University',
    period: '2024.08 — 2026.05',
  },
  {
    degree: 'B.S. Applied Mathematics & Software Engineering',
    school: '大连交通大学',
    period: '2019.09 — 2024.05',
  },
]

export default function About() {
  const { t } = useLang()
  const bioParagraphs = t.about.bio.split('\n\n')

  return (
    <div className="container container--narrow">
      <div className="page-header">
        <div className="about-avatar">👨‍💻</div>
        <h1 className="about-name">Hongrui Zhu</h1>
        <p className="about-role">{t.about.role}</p>
        <p className="about-bio">
          {bioParagraphs.map((para, i) => (
            <React.Fragment key={i}>
              {para}
              {i < bioParagraphs.length - 1 && <><br /><br /></>}
            </React.Fragment>
          ))}
        </p>

        <h2 className="about-section-title">{t.about.sectionSkills}</h2>
        <div className="about-skills">
          {skills.map((s) => (
            <TagBadge key={s} tag={s} />
          ))}
        </div>

        <h2 className="about-section-title">{t.about.sectionEdu}</h2>
        <div className="about-education">
          {education.map((e) => (
            <div key={e.degree} className="about-edu-item">
              <div className="about-edu-degree">{e.degree}</div>
              <div className="about-edu-school">{e.school}</div>
              <div className="about-edu-period">{e.period}</div>
            </div>
          ))}
        </div>

        <h2 className="about-section-title">{t.about.sectionContact}</h2>
        <div className="about-links">
          <a href="https://github.com/BlackOrnate" target="_blank" rel="noopener noreferrer" className="about-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hongruizhu/" target="_blank" rel="noopener noreferrer" className="about-link">
            LinkedIn
          </a>
          <a href="https://blog.csdn.net/BlackOrnate" target="_blank" rel="noopener noreferrer" className="about-link">
            CSDN
          </a>
          <a href="mailto:zhuhongrui0917@gmail.com" className="about-link">
            {t.about.contactEmail}
          </a>
        </div>
      </div>
    </div>
  )
}
