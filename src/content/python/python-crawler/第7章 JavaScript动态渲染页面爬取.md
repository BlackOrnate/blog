#### 目录

- [1. Selenium的使用](#1_Selenium_2)
- - [1.1 准备工作](#11__29)
  - - [安装selenium](#selenium_31)
    - [安装WebDriver](#WebDriver_39)
    - [WebDriver配置](#WebDriver_46)
  - [1.2 基本用法](#12__52)
  - [1.3 初始化浏览器对象](#13__82)
  - [1.4 访问页面](#14__106)
  - [1.5 查找节点](#15__122)
  - - [单个节点](#_124)
    - [多个节点](#_147)
  - [1.6 节点交互](#16__167)
  - [1.7 动作链](#17__195)
  - [1.8 运行JavaScript](#18_JavaScript_219)
  - [1.9 获取节点信息](#19__232)
  - - [获取属性](#_234)
    - [获取文本值](#_251)
    - [获取ID、位置、标签名和大小](#ID_267)
  - [1.10 切换Frame](#110_Frame_286)
  - [1.11 延时等待](#111__313)
  - - [隐式等待](#_323)
    - [显式等待](#_342)
  - [1.12 前进和后退](#112__391)
  - [1.13 Cookie](#113_Cookie_412)
  - [1.14 选项卡管理](#114__435)
  - [1.15 异常处理](#115__460)
  - [1.16 反屏蔽](#116__497)
  - [1.17 无头模式](#117__554)
- [2. Splash的使用](#2_Splash_575)

## 1. Selenium的使用

- 很大情况下Ajax请求会使用加密参数

  - token
  - sign
  - …
- 示例：[Scrape | Movie](https://spa2.scrape.center/)

  - Ajax接口包含token数据
- 模拟Ajax请求的两种方式

  - 深挖逻辑
    - 把token参数的构造逻辑完全找出
    - 再用python代码复现
    - 构造Ajax请求
  - 直接模拟浏览器的运行（使用Selenium）
    - 绕过上方过程
    - 将呈现的数据直接爬取下来
- Selenium

  - 自动化测试工具
  - 可以驱动浏览器完成特定的操作
    - 点击
    - 下拉
    - ···
  - 获取浏览器当前呈现的页面源代码

### 1.1 准备工作

#### 安装selenium

```
pip install selenium
```

#### 安装WebDriver

- Edge为例
- 下载地址：[Microsoft Edge WebDriver - Microsoft Edge Developer](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)

#### WebDriver配置

- 将WebDriver的.exe文件放入Python的根目录下

### 1.2 基本用法

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

browser = webdriver.Edge()

try:
    browser.get('https://baidu.com')
    
    input = browser.find_element(By.ID, 'kw')
    input.send_keys('Python')
    input.send_keys(Keys.ENTER)

    wait = WebDriverWait(browser, 10)
    wait.until(EC.presence_of_element_located((By.ID, "content_left")))

    print(browser.current_url)
    print(browser.get_cookies())
    print(browser.page_source)
finally:
    browser.close()
```

### 1.3 初始化浏览器对象

- 电脑端浏览器
  - Chrome
  - Firefox
  - Edge
  - Safari
  - …
- 手机端浏览器
  - Android
  - BlackBerry
  - …

```python
from selenium import webdriver

browser = webdriver.Chrome()
browser = webdriver.Firefox()
browser = webdriver.Edge()
browser = webdriver.Safari()
```

### 1.4 访问页面

- page\_source：获取网页源码

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://www.taobao.com")

print(browser.page_source)
browser.close()
```

### 1.5 查找节点

#### 单个节点

- 获取[淘宝网 - 淘！我喜欢 (taobao.com)](https://www.taobao.com/)的搜索框
- 观察源码分析获取

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://www.taobao.com")

input_first = browser.find_element(By.ID, "q")
input_second = browser.find_element(By.CSS_SELECTOR, "#q")
input_third = browser.find_element(By.XPATH, "//*[@id=\"q\"]")

print(input_first, input_second, input_third)

browser.close()
```

#### 多个节点

- 获取[淘宝网 - 淘！我喜欢 (taobao.com)](https://www.taobao.com/)左侧导航条的所有条目

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://www.taobao.com")

lis = browser.find_elements(By.CSS_SELECTOR, ".service-bd li")

print(lis)

browser.close()
```

### 1.6 节点交互

- send\_keys：输入文字
- clear：清空文字
- click：点击按钮

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

browser = webdriver.Edge()
browser.get('https://taobao.com')

input = browser.find_element(By.ID, 'q')
input.send_keys('iPhone')

time.sleep(1)

input.clear()
input.send_keys("iPad")

button = browser.find_element(By.CLASS_NAME, "btn-search")
button.click()
```

### 1.7 动作链

- 拖拽节点

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

browser = webdriver.Edge()
browser.get("https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable")

browser.switch_to.frame("iframeResult")

source = browser.find_element(By.CSS_SELECTOR, "#draggable")
target = browser.find_element(By.CSS_SELECTOR, "#droppable")

actions = ActionChains(browser)
actions.drag_and_drop(source, target)
actions.perform()
```

### 1.8 运行JavaScript

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://www.zhihu.com/explore")
browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
browser.execute_script("alert(\"To Bottom\")")
```

### 1.9 获取节点信息

#### 获取属性

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://spa2.scrape.center/")

logo = browser.find_element(By.CLASS_NAME, "logo-image")

print(logo)
print(logo.get_attribute("src"))
```

#### 获取文本值

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://spa2.scrape.center/")

input = browser.find_element(By.CLASS_NAME, "logo-title")

print(input.text)
```

#### 获取ID、位置、标签名和大小

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://spa2.scrape.center/")

input = browser.find_element(By.CLASS_NAME, "logo-title")

print(input.id)
print(input.location)
print(input.tag_name)
print(input.size)
```

### 1.10 切换Frame

- selenium打开网页后默认在父Frame中操作
- 如果此时页面中有子Frame（iframe）需要使用switch\_to.frame方法切换Frame

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

browser = webdriver.Edge()
browser.get("https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable")

browser.switch_to.frame("iframeResult")
try:
    logo = browser.find_element(By.CLASS_NAME, "logo")
except NoSuchElementException:
    print("NO LOGO")

browser.switch_to.parent_frame()
logo = browser.find_element(By.CLASS_NAME, "logo")

print(logo)
```

### 1.11 延时等待

- selenium的get方法在网页框架加载结束后才会结束执行
- 如果在get方法执行完毕时获取网页源代码，其结果可能不是浏览器完全加载完成的页面
  - 额外的Ajax请求
  - JavaScript渲染
- 设置浏览器延时等待一定的时间，确保节点已经加载出来

#### 隐式等待

- 如果selenium没有在DOM中找到节点，将继续等待，在超出设定时间后，抛出找不到节点的异常
- 在查找节点而节点没有立即出现时，隐式等待会先等待一段时间再查找DOM

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.implicitly_wait(10)
browser.get("https://spa2.scrape.center/")

input = browser.find_element(By.CLASS_NAME, "logo-image")
print(input)
```

#### 显式等待

- 指定要查找的节点和最长等待时间
- 如果在规定时间内加载出了要查找的节点，就返回这个节点
- 如果找到了规定时间依然没有加载出来，就抛出超时异常

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

browser = webdriver.Edge()
browser.get("https://www.taobao.com/")

wait = WebDriverWait(browser, 10)
input = wait.until(EC.presence_of_element_located((By.ID, "q")))
button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn-search")))

print(input, button)
```

- 等待条件
  - 详情见
    - 官方说明文档
    - EC包文件

| 等待条件 | 含义 |
| --- | --- |
| title\_is | 标题是某内容 |
| title\_contains | 标题包含某内容 |
| presence\_of\_element\_located | 节点出现，参数为节点的定位元组 如(By.ID, “p”) |
| visibility\_of\_element\_located | 节点可见，参数为节点的定位元组 |
| visibility\_of | 可见，参数为节点对象 |
| presence\_of\_all\_elements\_located | 所有节点都出现 |
| text\_to\_be\_present\_in\_element | 某个节点的文本值中包含某文字 |
| text\_to\_be\_present\_in\_element\_value | 某个节点值中包含某文字 |
| frame\_to\_be\_available\_and\_switch\_to\_it | 加载并切换 |
| invisibility\_of\_element\_located | 节点不可见 |
| element\_to\_be\_clickable | 按钮可点击 |
| staleness\_of | 判断一个节点是否仍在DOM中 可知页面是否已经刷新 |
| element\_to\_be\_selected | 节点可选择，参数为节点对象 |
| element\_located\_to\_be\_selected | 节点可选择，参数为节点的定位元组 |
| element\_selection\_state\_to\_be | 参数为节点对象及状态 相等返回True，否则返回False |
| element\_located\_selection\_state\_to\_be | 参数为定位元组及状态 相等返回True，否则返回False |
| alert\_is\_present | 是否出现警告提示框 |

### 1.12 前进和后退

- forward()：前进
- back()：后退

```python
from selenium import webdriver
import time

browser = webdriver.Edge()
browser.get("https://www.baidu.com/")
browser.get("https://www.taobao.com/")
browser.get("https://www.python.org/")
browser.back()
time.sleep(10)
browser.forward()
browser.close()
```

### 1.13 Cookie

```python
from selenium import webdriver
import time

browser = webdriver.Edge()
browser.get("https://www.zhihu.com/explore")

print(browser.get_cookies())

browser.add_cookie({"name": "name", "domain": "www.zhihu.com", "value": "ABC"})
print(browser.get_cookies())

# 如果不sleep可能因为有部分cookie还未加载，导致清空cookies是有cookie残留
time.sleep(5)

browser.delete_all_cookies()
print(browser.get_cookies())
```

### 1.14 选项卡管理

```python
from selenium import webdriver
import time

browser = webdriver.Edge()
browser.get("https://www.baidu.com")

# 开启一个新的选项卡
browser.execute_script("window.open()")

print(browser.window_handles)

browser.switch_to.window(browser.window_handles[1])
browser.get("https://www.taobao.com")

time.sleep(1)

browser.switch_to.window(browser.window_handles[0])
browser.get("https://python.org")
```

### 1.15 异常处理

- 节点未找到的异常

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://www.baidu.com")
browser.find_element(By.ID, "hello")
```

- 处理异常

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException ,NoSuchElementException

browser = webdriver.Edge()

try:
    browser.get("https://www.baidu.com")
except TimeoutException:
    print("Time Out")

try:
    browser.find_element(By.ID, "hello")
except NoSuchElementException:
    print("No Element")
finally:
    browser.close()
```

### 1.16 反屏蔽

- 很多网站会对selenium进行检测，防止一些爬虫的恶意爬取
- 检测原理
  - 检测当前浏览器窗口下的window.navigator对象中是否包含webdriver属性
    - 在正常使用浏览器时，这个属性应该是undefined
    - 一旦使用了selenium，它就会给window.navigator对象设置webdriver属性
  - 很多网站通过JavaScript语句判断是否存在webdriver属性
    - 如果存在就直接屏蔽
- 示例网站：[Scrape | Movie](https://antispider1.scrape.center/)
- 访问示例网站

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://antispider1.scrape.center/")
```

- 直接使用JavaScipt语句把webdriver属性置空

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://antispider1.scrape.center/")
browser.execute_script("Object.defineProperty(navigator, \"webdriver\", {get: () => undefined})")
```

- 确实将webdriver属性置空
  - 但是execute\_script方法是在页面加载之后才调用JavaScript语句的，此时网页早在页面渲染之前就已经检测webdriver属性了
- 使用CDP（Chrome Devtools Protocol，Chrome开发工具协议）解决
  - 可以实现在每个页面加载的时候执行JavaScript语句，将webdriver属性置空
- 执行CDP的方法为Page.addScriptToEvaluateOnNewDocument
- Edge Devtools Protocol是基于CDP的所以CDP使用方式在Edge Devtools Protocol上同样适用

```python
from selenium import webdriver
from selenium.webdriver import EdgeOptions

option = EdgeOptions()

# 隐藏提示条
option.add_experimental_option("excludeSwitches", ["enable-automation"])

# 隐藏自动化扩展信息
option.add_experimental_option("useAutomationExtension", False)

browser = webdriver.Edge(options=option)
browser.execute_cdp_cmd(
    "Page.addScriptToEvaluateOnNewDocument", {
        "source": "Object.defineProperty(navigator, \"webdriver\", {get: () => undefined})"})
browser.get("https://antispider1.scrape.center/")
```

### 1.17 无头模式

- 使网站运行时不会弹出窗口
- 减少一些资源的加载
- 使用EdgeOptions对象开启Edge浏览器的无头模式

```python
from selenium import webdriver
from selenium.webdriver import EdgeOptions

option = EdgeOptions()
option.add_argument("--headless")

browser = webdriver.Edge(options=option)
browser.set_window_size(1500, 800)
browser.get("https://www.baidu.com")
browser.get_screenshot_as_file("preview.png")
```

## 2. Splash的使用