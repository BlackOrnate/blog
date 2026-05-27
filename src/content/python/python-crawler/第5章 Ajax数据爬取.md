#### 目录

- [1. 什么是Ajax](#1_Ajax_17)
- - [1.1 实例引入](#11__25)
  - [1.2 基本原理](#12__32)
  - - [发送请求](#_41)
    - [解析内容](#_70)
    - [渲染网页](#_93)
- [2. Ajax分析方法](#2_Ajax_116)
- - [2.1 分析案例](#21__118)
  - [2.2 过滤请求](#22__129)
- [3. Ajax分析与爬取实战](#3_Ajax_135)
- - [3.1 爬取目标](#31__143)
  - [3.2 初步探索](#32__152)
  - [3.3 爬取列表页](#33__169)
  - - [分析](#_171)
    - [实现](#_178)
    - - [基础配置](#_180)
      - [爬取页面内容（获取页面的JSON内容）](#JSON_194)
      - [爬取列表页（爬取指定列表页）](#_214)
    - [合并](#_226)
  - [3.4 爬取详情页](#34__260)
  - - [分析](#_262)
    - [实现](#_269)
    - - [爬取详情页](#_271)
      - [串联调用](#_284)
    - [合并](#_306)
  - [3.5 保存数据（MongoDB）（后期补充）](#35_MongoDB_360)

- 使用requests获取的是原始HTML文档
- 浏览器中的页面是JavaScript处理数据后生成的结果
- 数据的来源
  - 通过Ajax加载
  - 包含在HTML文档中
  - 经过JavaScript和特定算法计算后生成
- Ajax加载数据
  - 方式：异步
    - 原始页面最初不包含某些数据
    - 当原始页面加载成功后，再向服务器请求某个接口获取数据
      - 发送Ajax请求
    - 然后将数据处理并呈现在网页上

## 1. 什么是Ajax

- **Ajax（Asynchronous JavaScript and XML）**：异步的 JavaScript 和 XML
  - 不是一门编程语言
  - 利用 JavaScript 在保证页面不被刷新、页面链接不改变的情况下与服务器交换数据并更新部分网页的技术

### 1.1 实例引入

- 下滑查看更多
- 下滑后加载的动画：Ajax 加载的过程

### 1.2 基本原理

- 从Ajax请求到网页更新的这个过程可以分为3步
  - 发送请求
  - 解析内容
  - 渲染网页

#### 发送请求

- JavaScript对Ajax最底层的实现

```
var xmlhttp;
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// 监听服务器返回响应
xmlhttp.onreadystatechange = function() {
    // 解析响应内容
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
    }
}

// 打开服务器链接
xmlhttp.open("POST", "/ajax/", true);

// 向服务器发送强求
xmlhttp.send();
```

#### 解析内容

```
var xmlhttp;
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
    // 解析响应内容
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
    }
}

xmlhttp.open("POST", "/ajax/", true);
xmlhttp.send();
```

#### 渲染网页

```
var xmlhttp;
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // 更改网页内容
        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
    }
}

xmlhttp.open("POST", "/ajax/", true);
xmlhttp.send();
```

## 2. Ajax分析方法

### 2.1 分析案例

- [微博 (weibo.cn)](https://m.weibo.cn/)
- Ajax 的请求类型：xhr
- 如果 Request Headers 中有一个信息为XMLHttpRequest，则此请求就是 Ajax 请求
  - 以 getIndex 开头的请求
- 可以在 Preview 查看响应的内容
- 也可以在 Response 查看真实返回的数据

### 2.2 过滤请求

- 点击 Network 中的 XHR 选项，显示所有的 Ajax 请求

## 3. Ajax分析与爬取实战

- 爬取 [Scrape | Movie](https://spa1.scrape.center/)
  - 与 2.5（[Scrape | Movie](https://ssr1.scrape.center/)）不同
    - 数据请求是通过 Ajax 实现的
    - 页面内容通过 JavaScript 渲染出来的
    - 只是呈现样式是一样的

### 3.1 爬取目标

- 爬取电影的名称、封面、类别、上映时间、评分、剧情简介等内容
- 分析页面数据的加载逻辑
- 用 requests 实现 Ajax 数据的爬取
- 将每部电影数据分别保存到 MongoDB 数据库

### 3.2 初步探索

```python
import requests

url = "https://spa1.scrape.center/"
html = requests.get(url).text

print(html)
```

- 获取到的 html 资源较少
- 整个页面都是JavaScript渲染得到的，浏览器执行了HTML中引用的JavaScript文件，JavaScript通过调用一些数据加载和页面渲染方法，才最终呈现出浏览器中的显示效果
- 数据一般是通过Ajax加载的，JavaScript在后台调用Ajax数据接口

### 3.3 爬取列表页

#### 分析

- 请求URL的limit恒定为10，offset为已经已经翻过的电影数量（
  (
  当前页数
  −
  1
  )
  ∗
  10
  (当前页数-1)\*10
  (当前页数−1)∗10）
- 根据响应内容可以发现所需数据皆在其中

#### 实现

##### 基础配置

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s')

INDEX_URL = "https://spa1.scrape.center/api/movie/?limit={limit}&offset={offset}"
```

##### 爬取页面内容（获取页面的JSON内容）

```python
import requests

def scrape_api(url):
    logging.info(f"scraping {url}...")
    try:
        response = requests.get(url)

        if response.status_code == 200:
            return response.json()
        logging.error(
            f"Status code: {response.status_code} while scraping {url}")
    except requests.RequestException:
        logging.error(f"Error while scraping {url}", exc_info=True)
```

##### 爬取列表页（爬取指定列表页）

```python
LIMIT = 10

def scrape_index(page):
    url = INDEX_URL.format(limit=LIMIT, offset=LIMIT * (page - 1))
    return scrape_api(url)
```

#### 合并

```python
import logging
import requests

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s')

INDEX_URL = "https://spa1.scrape.center/api/movie/?limit={limit}&offset={offset}"
LIMIT = 10

def scrape_api(url):
    logging.info(f"scraping {url}...")
    try:
        response = requests.get(url)

        if response.status_code == 200:
            return response.json()
        logging.error(
            f"Status code: {response.status_code} while scraping {url}")
    except requests.RequestException:
        logging.error(f"Error while scraping {url}", exc_info=True)

def scrape_index(page):
    url = INDEX_URL.format(limit=LIMIT, offset=LIMIT * (page - 1))
    return scrape_api(url)
```

### 3.4 爬取详情页

#### 分析

- url：最后的一个参数为此电影的id
- 电影的id：Ajax请求返回的数据中含有电影对应的id

#### 实现

##### 爬取详情页

```python
DETAIL_URL = "https://spa1.scrape.center/api/movie/{id}"

def scrape_detail(id):
    url = DETAIL_URL.format(id=id)
    return scrape_api(url)
```

##### 串联调用

```python
TOTAL_PAGE = 10

def main():
    for page in range(1, TOTAL_PAGE + 1):
        index_data = scrape_index(page)

        for item in index_data.get("results"):
            id = item.get("id")
            detail_data = scrape_detail(id)
            logging.info(f"detail data {detail_data}")
            

if __name__ == "__main__":
    main()
```

#### 合并

```python
import logging
import requests

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s')

INDEX_URL = "https://spa1.scrape.center/api/movie/?limit={limit}&offset={offset}"
DETAIL_URL = "https://spa1.scrape.center/api/movie/{id}"
LIMIT = 10
TOTAL_PAGE = 10

def scrape_api(url):
    logging.info(f"scraping {url}...")
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        logging.error(
            f"Status code: {response.status_code} while scraping {url}")
    except requests.RequestException:
        logging.error(f"Error while scraping {url}", exc_info=True)

def scrape_index(page):
    url = INDEX_URL.format(limit=LIMIT, offset=LIMIT * (page - 1))
    return scrape_api(url)

def scrape_detail(id):
    url = DETAIL_URL.format(id=id)
    return scrape_api(url)

def main():
    for page in range(1, TOTAL_PAGE + 1):
        index_data = scrape_index(page)

        for item in index_data.get("results"):
            id = item.get("id")
            detail_data = scrape_detail(id)
            logging.info(f"detail data {detail_data}")

if __name__ == "__main__":
    main()
```

### 3.5 保存数据（MongoDB）（后期补充）