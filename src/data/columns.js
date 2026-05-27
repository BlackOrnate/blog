export const columns = [
  {
    id: 'machine-learning',
    name: '机器学习',
    nameEn: 'Machine Learning',
    icon: '🤖',
    isParent: true,
    children: ['deep-learning', 'python-ml-basics'],
    description: '机器学习算法与理论',
    descEn: 'ML algorithms and theory',
  },
  {
    id: 'deep-learning',
    name: '深度学习',
    nameEn: 'Deep Learning',
    icon: '🧠',
    parent: 'machine-learning',
    description: '深度学习核心概念与数学基础',
    descEn: 'Core concepts and mathematical foundations of deep learning',
  },
  {
    id: 'python-ml-basics',
    name: 'Python机器学习基础教程',
    nameEn: 'Python ML Fundamentals',
    icon: '📊',
    parent: 'machine-learning',
    description: '使用 Python 实现经典机器学习算法',
    descEn: 'Classic ML algorithms implemented in Python',
  },
  {
    id: 'python',
    name: 'Python',
    nameEn: 'Python',
    icon: '🐍',
    isParent: true,
    children: ['python-crash-course', 'automate-boring-stuff', 'python-crawler'],
    description: 'Python 编程系列',
    descEn: 'Python programming series',
  },
  {
    id: 'python-crash-course',
    name: 'Python编程从入门到实践',
    nameEn: 'Python Crash Course',
    icon: '📘',
    parent: 'python',
    description: 'Python Crash Course 读书笔记',
    descEn: 'Notes on Python Crash Course',
  },
  {
    id: 'automate-boring-stuff',
    name: 'Python编程快速上手',
    nameEn: 'Automate the Boring Stuff',
    icon: '⚡',
    parent: 'python',
    description: 'Automate the Boring Stuff with Python 笔记',
    descEn: 'Notes on Automate the Boring Stuff with Python',
  },
  {
    id: 'python-crawler',
    name: 'Python3网络爬虫开发实战',
    nameEn: 'Python Web Scraping',
    icon: '🕷️',
    parent: 'python',
    description: '网络爬虫技术实战',
    descEn: 'Web scraping in practice',
  },
  {
    id: 'django',
    name: 'Django',
    nameEn: 'Django',
    icon: '🌐',
    isParent: false,
    description: 'Django Web 框架学习笔记',
    descEn: 'Notes on Django web framework',
  },
  {
    id: 'c-language',
    name: 'C语言',
    nameEn: 'C Language',
    icon: '⚙️',
    isParent: false,
    description: 'C Primer Plus 读书笔记，系统学习C语言',
    descEn: 'Notes on C Primer Plus',
  },
  {
    id: 'data-structures',
    name: '数据结构',
    nameEn: 'Data Structures',
    icon: '🌲',
    isParent: false,
    description: '数据结构与算法',
    descEn: 'Data structures and algorithms',
  },
  {
    id: 'java',
    name: 'Java',
    nameEn: 'Java',
    icon: '☕',
    isParent: true,
    children: ['java-basics', 'java-common-classes', 'java-collections'],
    description: 'Java 编程系列',
    descEn: 'Java programming series',
  },
  {
    id: 'java-basics',
    name: 'Java基础',
    nameEn: 'Java Basics',
    icon: '📗',
    parent: 'java',
    description: '跟狂神学Java基础',
    descEn: 'Java fundamentals',
  },
  {
    id: 'java-common-classes',
    name: '常用类',
    nameEn: 'Java Common Classes',
    icon: '📦',
    parent: 'java',
    description: 'Java 常用类库',
    descEn: 'Java standard library classes',
  },
  {
    id: 'java-collections',
    name: '集合框架',
    nameEn: 'Java Collections',
    icon: '🗂️',
    parent: 'java',
    description: 'Java 集合框架详解',
    descEn: 'Java Collections Framework',
  },
  {
    id: 'reading',
    name: '阅读',
    nameEn: 'Reading',
    icon: '📚',
    isParent: true,
    children: ['understanding-jvm', 'model-thinking'],
    description: '技术与思维类书籍读书笔记',
    descEn: 'Notes on technical and thinking books',
  },
  {
    id: 'understanding-jvm',
    name: '深入理解Java虚拟机',
    nameEn: 'Understanding the JVM',
    icon: '🔬',
    parent: 'reading',
    description: '《深入理解Java虚拟机》第三版读书笔记',
    descEn: 'Notes on Understanding the JVM, 3rd Ed.',
  },
  {
    id: 'model-thinking',
    name: '模型思维',
    nameEn: 'The Model Thinker',
    icon: '🧩',
    parent: 'reading',
    description: '《模型思维》读书笔记',
    descEn: 'Notes on The Model Thinker',
  },
]

// --- Helper functions ---

const columnMap = Object.fromEntries(columns.map((c) => [c.id, c]))

export function getColumn(id) {
  return columnMap[id] || null
}

export function getColumnAncestors(id) {
  const result = []
  let current = columnMap[id]
  while (current?.parent) {
    current = columnMap[current.parent]
    if (current) result.unshift(current)
  }
  return result
}

export function getTopLevelColumns() {
  return columns.filter((c) => !c.parent)
}

export function getChildColumns(parentId) {
  return columns.filter((c) => c.parent === parentId)
}
