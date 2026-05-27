import TagBadge from '../components/TagBadge'

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
  return (
    <div className="container container--narrow">
      <div className="page-header">
        <div className="about-avatar">👨‍💻</div>
        <h1 className="about-name">Hongrui Zhu</h1>
        <p className="about-role">M.S. Biomedical Informatics · Stony Brook University</p>
        <p className="about-bio">
          你好！我是朱泓瑞，目前就读于石溪大学（Stony Brook University）生物医学信息学硕士项目，
          研究方向聚焦于计算机视觉、计算病理学与生物医学图像分析。
          <br /><br />
          本科期间主修应用数学与软件工程双学位，打下了扎实的数学与编程基础。
          研究生阶段专注于深度学习在医学影像中的应用，涵盖图像分割、弱监督学习等方向。
          <br /><br />
          这个博客记录了我系统学习编程与 AI 过程中的笔记与心得，涵盖 C 语言、数据结构、Java、Python、
          机器学习等多个方向。目前正积极寻找 AI / 机器学习 / 数据分析方向的实习与全职机会。
        </p>

        <h2 className="about-section-title">技术栈</h2>
        <div className="about-skills">
          {skills.map((s) => (
            <TagBadge key={s} tag={s} />
          ))}
        </div>

        <h2 className="about-section-title">教育背景</h2>
        <div className="about-education">
          {education.map((e) => (
            <div key={e.degree} className="about-edu-item">
              <div className="about-edu-degree">{e.degree}</div>
              <div className="about-edu-school">{e.school}</div>
              <div className="about-edu-period">{e.period}</div>
            </div>
          ))}
        </div>

        <h2 className="about-section-title">联系方式</h2>
        <div className="about-links">
          <a
            href="https://github.com/BlackOrnate"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hongruizhu/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            LinkedIn
          </a>
          <a
            href="https://blog.csdn.net/BlackOrnate"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            CSDN
          </a>
          <a href="mailto:zhuhongrui0917@gmail.com" className="about-link">
            邮件联系
          </a>
        </div>
      </div>
    </div>
  )
}
