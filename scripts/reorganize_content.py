"""
Move flat src/content/{id}.md files to hierarchical folder structure.
Run once after scraping articles.
"""
import os
import shutil

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'content')

MOVES = [
    # (article_id, target_relative_path)
    (136405772, 'machine-learning/deep-learning/第2章 线性代数.md'),

    (135496627, 'machine-learning/python-ml-basics/第1章 引言.md'),
    (135496744, 'machine-learning/python-ml-basics/第2章 监督学习.md'),
    (135693550, 'machine-learning/python-ml-basics/第3章 无监督学习与预处理.md'),
    (135936139, 'machine-learning/python-ml-basics/第4章 数据表示与特征工程.md'),

    (134311419, 'python/python-crash-course/第2章 变量和简单数据类型.md'),
    (134311604, 'python/python-crash-course/第3章 列表简介.md'),
    (134311636, 'python/python-crash-course/第4章 操作列表.md'),
    (134311717, 'python/python-crash-course/第5章 if语句.md'),
    (134311748, 'python/python-crash-course/第6章 字典.md'),
    (134311768, 'python/python-crash-course/第7章 用户输入和while循环.md'),
    (134311795, 'python/python-crash-course/第8章 函数.md'),
    (134311815, 'python/python-crash-course/第9章 类.md'),
    (134311848, 'python/python-crash-course/第10章 文件和异常.md'),
    (134311880, 'python/python-crash-course/第11章 测试代码.md'),

    (134435329, 'python/automate-boring-stuff/第2章 控制流.md'),
    (134435360, 'python/automate-boring-stuff/第3章 函数.md'),
    (134435399, 'python/automate-boring-stuff/第4章 列表.md'),
    (134435418, 'python/automate-boring-stuff/第5章 字典和结构化数据.md'),
    (134435444, 'python/automate-boring-stuff/第7章 模式匹配与正则表达式.md'),
    (134435520, 'python/automate-boring-stuff/第6章 字符串操作.md'),
    (134435550, 'python/automate-boring-stuff/第9章 读写文件.md'),
    (134435569, 'python/automate-boring-stuff/第10章 组织文件.md'),
    (134435587, 'python/automate-boring-stuff/第11章 调试.md'),

    (134656716, 'python/python-crawler/第1章 爬虫基础.md'),
    (134735298, 'python/python-crawler/第2章 基本库的使用.md'),
    (134735339, 'python/python-crawler/第3章 网页数据的解析提取.md'),
    (134735396, 'python/python-crawler/第5章 Ajax数据爬取.md'),
    (134735439, 'python/python-crawler/第6章 异步爬虫.md'),
    (134735482, 'python/python-crawler/第7章 JavaScript动态渲染页面爬取.md'),

    (142996341, 'django/第1节 入门.md'),

    (122759188, 'c-language/C Primer Plus 第3章.md'),
    (122759195, 'c-language/C Primer Plus 第4章.md'),
    (122759206, 'c-language/C Primer Plus 第5章.md'),
    (122759210, 'c-language/C Primer Plus 第6章.md'),
    (122778227, 'c-language/C Primer Plus 第7章.md'),
    (122797793, 'c-language/C Primer Plus 第8章.md'),
    (122815200, 'c-language/C Primer Plus 第9章.md'),
    (122830224, 'c-language/C Primer Plus 第10章.md'),
    (122868054, 'c-language/C Primer Plus 第11章.md'),
    (122868074, 'c-language/C Primer Plus 第12章.md'),
    (122888045, 'c-language/C Primer Plus 第13章.md'),
    (122900038, 'c-language/C Primer Plus 第14章.md'),
    (122906832, 'c-language/C Primer Plus 第15章.md'),

    (122569284, 'data-structures/数据结构 第1章.md'),
    (122591886, 'data-structures/数据结构 第2章（线性表）.md'),
    (122631353, 'data-structures/数据结构 第3章（栈和队列）.md'),
    (122651983, 'data-structures/数据结构 第4章.md'),
    (122710182, 'data-structures/数据结构 第5章.md'),
    (122738338, 'data-structures/数据结构 第6章（图）.md'),
    (122933664, 'data-structures/数据结构 第7章（查找）.md'),
    (122972880, 'data-structures/数据结构 第8章（排序）.md'),

    (122993711, 'java/java-basics/Java基础（狂神） 1. 预科.md'),
    (122994119, 'java/java-basics/Java基础（狂神） 2. 入门.md'),
    (122994125, 'java/java-basics/Java基础（狂神） 3. 基础.md'),
    (122994130, 'java/java-basics/Java基础（狂神） 4. 流程控制.md'),
    (122994140, 'java/java-basics/Java基础（狂神） 6. 数组.md'),
    (122994152, 'java/java-basics/Java基础（狂神） 7. 面向对象.md'),
    (123011780, 'java/java-basics/Java基础（狂神） 5. 方法.md'),
    (123011872, 'java/java-basics/Java基础（狂神） 8. 异常.md'),

    (123011801, 'java/java-common-classes/常用类 第1天.md'),
    (123011811, 'java/java-common-classes/常用类 第2天.md'),
    (123011819, 'java/java-common-classes/常用类 第3天.md'),
    (123011830, 'java/java-common-classes/常用类 第4天.md'),
    (123011839, 'java/java-common-classes/常用类 第5天.md'),

    (135255225, 'java/java-collections/集合框架 第2天.md'),
    (135255287, 'java/java-collections/集合框架 第3天.md'),
    (135255305, 'java/java-collections/集合框架 第4天.md'),
    (135255336, 'java/java-collections/集合框架 第1天.md'),

    (123992240, 'reading/understanding-jvm/第1章 走进Java.md'),
    (123992454, 'reading/understanding-jvm/第2章 Java内存区域与内存溢出异常.md'),
    (127203027, 'reading/understanding-jvm/第3章 垃圾收集器与内存分配策略.md'),

    (135052844, 'reading/model-thinking/第1章 做一个多模型思考者.md'),
    (135052871, 'reading/model-thinking/第2章 模型的7大用途.md'),
    (135052877, 'reading/model-thinking/第3章 多模型思维.md'),
    (135052885, 'reading/model-thinking/第4章 对人类行为者建模.md'),
]


def main():
    moved = 0
    skipped = 0

    for article_id, rel_path in MOVES:
        src = os.path.join(BASE, f'{article_id}.md')
        dst = os.path.join(BASE, rel_path)

        if not os.path.exists(src):
            print(f'  ⚠ 跳过 {article_id}.md（源文件不存在）')
            skipped += 1
            continue

        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.move(src, dst)
        print(f'  ✓ {article_id}.md → {rel_path}')
        moved += 1

    print(f'\n完成！移动: {moved}，跳过: {skipped}')


if __name__ == '__main__':
    main()
