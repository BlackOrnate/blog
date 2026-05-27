export const columns = [
  {
    id: 'machine-learning',
    name: '机器学习',
    icon: '🤖',
    isParent: true,
    children: ['deep-learning', 'python-ml-basics'],
    description: '机器学习算法与理论',
  },
  {
    id: 'deep-learning',
    name: '深度学习',
    icon: '🧠',
    parent: 'machine-learning',
    description: '深度学习核心概念与数学基础',
  },
  {
    id: 'python-ml-basics',
    name: 'Python机器学习基础教程',
    icon: '📊',
    parent: 'machine-learning',
    description: '使用 Python 实现经典机器学习算法',
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    isParent: true,
    children: ['python-crash-course', 'automate-boring-stuff', 'python-crawler'],
    description: 'Python 编程系列',
  },
  {
    id: 'python-crash-course',
    name: 'Python编程从入门到实践',
    icon: '📘',
    parent: 'python',
    description: 'Python Crash Course 读书笔记',
  },
  {
    id: 'automate-boring-stuff',
    name: 'Python编程快速上手',
    icon: '⚡',
    parent: 'python',
    description: 'Automate the Boring Stuff with Python 笔记',
  },
  {
    id: 'python-crawler',
    name: 'Python3网络爬虫开发实战',
    icon: '🕷️',
    parent: 'python',
    description: '网络爬虫技术实战',
  },
  {
    id: 'django',
    name: 'Django',
    icon: '🌐',
    isParent: false,
    description: 'Django Web 框架学习笔记',
  },
  {
    id: 'c-language',
    name: 'C语言',
    icon: '⚙️',
    isParent: false,
    description: 'C Primer Plus 读书笔记，系统学习C语言',
  },
  {
    id: 'data-structures',
    name: '数据结构',
    icon: '🌲',
    isParent: false,
    description: '数据结构与算法',
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    isParent: true,
    children: ['java-basics', 'java-common-classes', 'java-collections'],
    description: 'Java 编程系列',
  },
  {
    id: 'java-basics',
    name: 'Java基础',
    icon: '📗',
    parent: 'java',
    description: '跟狂神学Java基础',
  },
  {
    id: 'java-common-classes',
    name: '常用类',
    icon: '📦',
    parent: 'java',
    description: 'Java 常用类库',
  },
  {
    id: 'java-collections',
    name: '集合框架',
    icon: '🗂️',
    parent: 'java',
    description: 'Java 集合框架详解',
  },
  {
    id: 'reading',
    name: '阅读',
    icon: '📚',
    isParent: true,
    children: ['understanding-jvm', 'model-thinking'],
    description: '技术与思维类书籍读书笔记',
  },
  {
    id: 'understanding-jvm',
    name: '深入理解Java虚拟机',
    icon: '🔬',
    parent: 'reading',
    description: '《深入理解Java虚拟机》第三版读书笔记',
  },
  {
    id: 'model-thinking',
    name: '模型思维',
    icon: '🧩',
    parent: 'reading',
    description: '《模型思维》读书笔记',
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
