"""
CSDN 文章批量导出脚本
=====================
将 76 篇 CSDN 文章导出为 Markdown 文件，保存到 src/content/ 目录。

使用方法：
1. 安装依赖：pip install requests beautifulsoup4 markdownify
2. 获取 Cookie（在浏览器中登录 CSDN，然后：
   F12 → Application / 应用 → Cookies → https://blog.csdn.net
   复制 Cookie 字符串）
3. 将 Cookie 填入下方 COOKIE 变量
4. 运行：python scripts/scrape_csdn.py
"""

import os
import time
import re
import json
from bs4 import BeautifulSoup

try:
    from curl_cffi import requests  # 伪装 Chrome TLS 指纹，绕过 Cloudflare
except ImportError:
    print("请先安装依赖：pip install curl_cffi beautifulsoup4 markdownify")
    raise

try:
    from markdownify import markdownify as md
except ImportError:
    print("请先安装依赖：pip install curl_cffi beautifulsoup4 markdownify")
    raise

# ─── 配置 ─────────────────────────────────────────────────────────────────────

# 粘贴你的 CSDN Cookie 字符串（浏览器 F12 → Application → Cookies → blog.csdn.net）
COOKIE = "uuid_tt_dd=10_4122607270-1770485469859-803062; fid=20_40447429171-1770485471699-691635; UserName=BlackOrnate; UserInfo=29f9b9b6012b4892b9b60a583d6af4b0; UserToken=29f9b9b6012b4892b9b60a583d6af4b0; UserNick=His+Last+Bow; AU=E10; UN=BlackOrnate; BT=1775588890510; p_uid=U010000; csdn_newcert_BlackOrnate=1; __gads=ID=6308f268e4dfd4b0:T=1746156566:RT=1776389612:S=ALNI_Ma0Y3hQfkbbRqlIFezswRrhs12JpA; __gpi=UID=00001016953aa0ad:T=1746156566:RT=1776389612:S=ALNI_MbWaX_VIPqIn4C0sIoxJcdxmJlXgw; __eoi=ID=104b5ff4df12e81c:T=1770502789:RT=1776389612:S=AA-AfjZ-SSb5hWqXvPjfanRQ-bgR; FCCDCF=%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B32%2C%22%5B%5C%2219a72e15-b2d4-40c1-bedd-febaf6a3770f%5C%22%2C%5B1770485479%2C631000000%5D%5D%22%5D%5D%5D; FCNEC=%5B%5B%22AKsRol9PtYTZKyMQWS3WBF_-1tm6796S51Cm_3HcTc7LuhZgjNjgmfSM6RWUA11tyUPmfsIzfottXUck2G5oqZDA2l7dpmB49ASX5oHYTY7uijCpkvroaNZbCNnjy1edU_4PjaRDKJnIaFjRRPliHYPRyyeBmXtUvQ%3D%3D%22%5D%5D; dc_session_id=10_1779747429023.204220; c_segment=6; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1778992030,1779747433; HMACCOUNT=428750EE527A9FBC; dc_sid=4423f258cb93da2cb2f01d8d573be2c8; https_waf_cookie=e878e289-f66a-456abaee228f2f2a07077664992762716f6b; bc_bot_session=1779747436ca13409c70b6d3f3; bc_bot_token=1001779747436ca13409c70b6d3f39e7b2c; bc_bot_rules=-; bc_bot_score=100; bc_bot_fp=dee3dc303cdece5c18801f1a7f24ee6c; _clck=1sbzrb7%5E2%5Eg6c%5E0%5E2229; c_pref=default; c_first_ref=default; creative_btn_mp=3; c_first_page=https%3A//blog.csdn.net/BlackOrnate/article/list/1; c_dsid=11_1779747932424.912869; c_ref=https%3A//blog.csdn.net/BlackOrnate/article/list/1; log_Id_click=9; waf_captcha_marker=a5f9612880f50b3f44c842125bdccf530e4a88971666603e7af561335a6a396e; c_page_id=default; log_Id_pv=9; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1779749745; _clsk=1oeqyfb%5E1779749744777%5E10%5E1%5Ep.clarity.ms%2Fcollect; log_Id_view=332; dc_tos=tfm7tb"

# 输出目录（相对于本脚本的 ../ 即项目根目录）
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content")

# 请求间隔（秒），避免请求太快被封
REQUEST_DELAY = 1.5

# ─── 文章列表 ─────────────────────────────────────────────────────────────────

ARTICLES = [
    # (article_id, title, column_name)
    (136405772, "第2章 线性代数", "深度学习"),
    (135496627, "第1章 引言", "Python机器学习基础教程"),
    (135496744, "第2章 监督学习", "Python机器学习基础教程"),
    (135693550, "第3章 无监督学习与预处理", "Python机器学习基础教程"),
    (135936139, "第4章 数据表示与特征工程", "Python机器学习基础教程"),
    (134311419, "第2章 变量和简单数据类型", "Python编程从入门到实践"),
    (134311604, "第3章 列表简介", "Python编程从入门到实践"),
    (134311636, "第4章 操作列表", "Python编程从入门到实践"),
    (134311717, "第5章 if语句", "Python编程从入门到实践"),
    (134311748, "第6章 字典", "Python编程从入门到实践"),
    (134311768, "第7章 用户输入和while循环", "Python编程从入门到实践"),
    (134311795, "第8章 函数", "Python编程从入门到实践"),
    (134311815, "第9章 类", "Python编程从入门到实践"),
    (134311848, "第10章 文件和异常", "Python编程从入门到实践"),
    (134311880, "第11章 测试代码", "Python编程从入门到实践"),
    (134435329, "第2章 控制流", "Python编程快速上手"),
    (134435360, "第3章 函数", "Python编程快速上手"),
    (134435399, "第4章 列表", "Python编程快速上手"),
    (134435418, "第5章 字典和结构化数据", "Python编程快速上手"),
    (134435444, "第7章 模式匹配与正则表达式", "Python编程快速上手"),
    (134435520, "第6章 字符串操作", "Python编程快速上手"),
    (134435550, "第9章 读写文件", "Python编程快速上手"),
    (134435569, "第10章 组织文件", "Python编程快速上手"),
    (134435587, "第11章 调试", "Python编程快速上手"),
    (134656716, "第1章 爬虫基础", "Python3网络爬虫开发实战"),
    (134735298, "第2章 基本库的使用", "Python3网络爬虫开发实战"),
    (134735339, "第3章 网页数据的解析提取", "Python3网络爬虫开发实战"),
    (134735396, "第5章 Ajax数据爬取", "Python3网络爬虫开发实战"),
    (134735439, "第6章 异步爬虫", "Python3网络爬虫开发实战"),
    (134735482, "第7章 JavaScript动态渲染页面爬取", "Python3网络爬虫开发实战"),
    (142996341, "第1节 入门", "Django"),
    (122759188, "C Primer Plus 第3章", "C语言"),
    (122759195, "C Primer Plus 第4章", "C语言"),
    (122759206, "C Primer Plus 第5章", "C语言"),
    (122759210, "C Primer Plus 第6章", "C语言"),
    (122778227, "C Primer Plus 第7章", "C语言"),
    (122797793, "C Primer Plus 第8章", "C语言"),
    (122815200, "C Primer Plus 第9章", "C语言"),
    (122830224, "C Primer Plus 第10章", "C语言"),
    (122868054, "C Primer Plus 第11章", "C语言"),
    (122868074, "C Primer Plus 第12章", "C语言"),
    (122888045, "C Primer Plus 第13章", "C语言"),
    (122900038, "C Primer Plus 第14章", "C语言"),
    (122906832, "C Primer Plus 第15章", "C语言"),
    (122569284, "数据结构 第1章", "数据结构"),
    (122591886, "数据结构 第2章（线性表）", "数据结构"),
    (122631353, "数据结构 第3章（栈和队列）", "数据结构"),
    (122651983, "数据结构 第4章", "数据结构"),
    (122710182, "数据结构 第5章", "数据结构"),
    (122738338, "数据结构 第6章（图）", "数据结构"),
    (122933664, "数据结构 第7章（查找）", "数据结构"),
    (122972880, "数据结构 第8章（排序）", "数据结构"),
    (122993711, "Java基础（狂神） 1. 预科", "Java基础"),
    (122994119, "Java基础（狂神） 2. 入门", "Java基础"),
    (122994125, "Java基础（狂神） 3. 基础", "Java基础"),
    (122994130, "Java基础（狂神） 4. 流程控制", "Java基础"),
    (122994140, "Java基础（狂神） 6. 数组", "Java基础"),
    (122994152, "Java基础（狂神） 7. 面向对象", "Java基础"),
    (123011780, "Java基础（狂神） 5. 方法", "Java基础"),
    (123011872, "Java基础（狂神） 8. 异常", "Java基础"),
    (123011801, "常用类 第1天", "常用类"),
    (123011811, "常用类 第2天", "常用类"),
    (123011819, "常用类 第3天", "常用类"),
    (123011830, "常用类 第4天", "常用类"),
    (123011839, "常用类 第5天", "常用类"),
    (135255225, "集合框架 第2天", "集合框架"),
    (135255287, "集合框架 第3天", "集合框架"),
    (135255305, "集合框架 第4天", "集合框架"),
    (135255336, "集合框架 第1天", "集合框架"),
    (123992240, "第1章 走进Java", "深入理解Java虚拟机"),
    (123992454, "第2章 Java内存区域与内存溢出异常", "深入理解Java虚拟机"),
    (127203027, "第3章 垃圾收集器与内存分配策略", "深入理解Java虚拟机"),
    (135052844, "第1章 做一个多模型思考者", "模型思维"),
    (135052871, "第2章 模型的7大用途", "模型思维"),
    (135052877, "第3章 多模型思维", "模型思维"),
    (135052885, "第4章 对人类行为者建模", "模型思维"),
]

# ─── 核心函数 ─────────────────────────────────────────────────────────────────


def get_session():
    # impersonate="chrome120" 让 curl_cffi 使用 Chrome 的 TLS 指纹，绕过 Cloudflare 521
    session = requests.Session(impersonate="chrome120")
    session.headers.update(
        {
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Referer": "https://blog.csdn.net/BlackOrnate",
        }
    )
    if COOKIE and COOKIE != "替换为你的Cookie字符串":
        session.headers["Cookie"] = COOKIE
    return session


def fetch_article(session, article_id):
    url = f"https://blog.csdn.net/BlackOrnate/article/details/{article_id}"
    resp = session.get(url, timeout=30, allow_redirects=True)
    if resp.status_code != 200:
        raise Exception(f"HTTP {resp.status_code}")
    return resp.text


def parse_content(html):
    """Extract article content and convert to Markdown."""
    soup = BeautifulSoup(html, "html.parser")

    # CSDN 文章内容容器（不同版本可能不同，按顺序尝试）
    content_el = (
        soup.find("div", id="content_views")
        or soup.find("div", class_="blog-content-box")
        or soup.find("article")
    )

    if not content_el:
        return None

    # 移除广告/推荐区块
    for tag in content_el.find_all(class_=re.compile(r"recommend|ad-|advert|toc-")):
        tag.decompose()

    # 处理代码块：CSDN 用 <code class="language-xxx"> 包含在 <pre> 里
    # markdownify 会自动处理，但确保语言类被保留
    for pre in content_el.find_all("pre"):
        code = pre.find("code")
        if code:
            lang_class = next(
                (c for c in (code.get("class") or []) if c.startswith("language-")), ""
            )
            if lang_class:
                lang = lang_class.replace("language-", "")
                # 保留语言提示，markdownify 会生成 ```lang
                code["class"] = [f"language-{lang}"]

    # 转换为 Markdown
    markdown = md(
        str(content_el),
        heading_style="ATX",
        bullets="-",
        code_language_callback=lambda el: (
            next(
                (
                    c.replace("language-", "")
                    for c in (el.get("class") or [])
                    if c.startswith("language-")
                ),
                "",
            )
        ),
    )

    # 清理多余空行
    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    markdown = markdown.strip()

    return markdown


def save_markdown(article_id, title, column, content):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    path = os.path.join(OUTPUT_DIR, f"{article_id}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  ✓ 已保存: {path}")


# ─── 主程序 ───────────────────────────────────────────────────────────────────


def main():
    print("=" * 60)
    print("CSDN 文章批量导出")
    print(f"目标目录: {os.path.abspath(OUTPUT_DIR)}")
    print(f"文章总数: {len(ARTICLES)}")
    print("=" * 60)

    if COOKIE == "替换为你的Cookie字符串":
        print("\n⚠️  警告：未设置 Cookie。")
        print("   部分文章可能需要登录才能看到完整内容。")
        print("   建议先设置 Cookie 再运行。\n")
        proceed = input("是否继续（不使用Cookie）？[y/N] ")
        if proceed.lower() != "y":
            print("已退出。请在脚本顶部填入 Cookie 后重试。")
            return

    session = get_session()
    success = 0
    failed = []

    for i, (article_id, title, column) in enumerate(ARTICLES, 1):
        out_path = os.path.join(OUTPUT_DIR, f"{article_id}.md")

        # 跳过已有内容的文件（不是占位符）
        if os.path.exists(out_path):
            with open(out_path, encoding="utf-8") as f:
                existing = f.read()
            if "内容待导入" not in existing and len(existing) > 500:
                print(f"[{i:02d}/{len(ARTICLES)}] 跳过（已有内容）: {title}")
                success += 1
                continue

        print(f"[{i:02d}/{len(ARTICLES)}] 正在下载: {title} ({column})")

        try:
            html = fetch_article(session, article_id)
            content = parse_content(html)

            if not content:
                print(f"  ✗ 无法提取内容，跳过")
                failed.append((article_id, title, "内容提取失败"))
                continue

            save_markdown(article_id, title, column, content)
            success += 1

        except Exception as e:
            print(f"  ✗ 错误: {e}")
            failed.append((article_id, title, str(e)))

        # 礼貌性延迟
        if i < len(ARTICLES):
            time.sleep(REQUEST_DELAY)

    # 结果摘要
    print("\n" + "=" * 60)
    print(f"完成！成功: {success}/{len(ARTICLES)}")
    if failed:
        print(f"失败 ({len(failed)} 篇):")
        for aid, t, reason in failed:
            print(f"  - [{aid}] {t}: {reason}")
    print("\n下一步：运行 npm run build 重新构建博客")


if __name__ == "__main__":
    main()
