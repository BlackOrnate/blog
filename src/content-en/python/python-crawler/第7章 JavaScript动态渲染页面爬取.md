#### Catalog

- [1. Using Selenium](#1_Selenium_2)
- [1.1 Preparation](#11__29)
  - [Installing selenium](#selenium_31)
    - [Install WebDriver](#WebDriver_39)
    - [WebDriver configuration](#WebDriver_46)
  - [1.2 Basic Usage](#12__52)
  - [1.3 Initializing the browser object](#13__82)
  - [1.4 Accessing a page](#14__106)
  - [1.5 Finding nodes](#15__122)
  - [Single node](#_124)
    - [Multiple nodes](#_147)
  - [1.6 Node interactions](#16__167)
  - [1.7 Action Chaining](#17__195)
  - [1.8 Running JavaScript](#18_JavaScript_219)
  - [1.9 Getting node information](#19__232)
  - [Get Attributes](#_234)
    - [Get Text Value](#_251)
    - [Get ID, position, tag name and size](#ID_267)
  - [1.10 Switch Frame](#110_Frame_286)
  - [1.11 Delayed wait](#111__313)
  - [Implicit Wait](#_323)
    - [Explicit Wait](#_342)
  - [1.12 Forward and Backward](#112__391)
  - [1.13 Cookies](#113_Cookie_412)
  - [1.14 Tab management](#114__435)
  - [1.15 Exception handling](#115__460)
  - [1.16 Anti-masking](#116__497)
  - [1.17 Headless mode](#117__554)
- [2. Use of Splash](#2_Splash_575)

## 1. Use of Selenium

- Very often Ajax requests will use encrypted parameters

  - token
  - sign
  - ...
- Example: [Scrape | Movie](https://spa2.scrape.center/)

  - Ajax interface containing token data
- Two ways to simulate an Ajax request

  - Digging deeper into the logic
    - Find out exactly how the token parameter is constructed.
    - And then reproduce it in python code.
    - Constructing an Ajax request
  - Simulate the browser directly (using Selenium).
    - Bypass the above process.
    - Bypassing the above process. Crawling down the presented data.
- Selenium.

  - Automated testing tool
  - Can drive the browser to do specific things
    - Click
    - dropdown
    ---
  - Get the source code of the page the browser is currently rendering

### 1.1 Preparation

#### Install selenium

```
pip install selenium
```

#### Install WebDriver

- Edge for example
- Download: [Microsoft Edge WebDriver - Microsoft Edge Developer](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)

#### WebDriver Configuration

- Place the WebDriver's .exe file in the root directory of Python

### 1.2 Basic Usage

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

### 1.3 Initializing Browser Objects

- Computer Browser
  - Chrome
  - Firefox
  - Edge
  - Safari
  - ...
- Mobile Browser
  - Android
  - BlackBerry
  - ...

```python
from selenium import webdriver

browser = webdriver.Chrome()
browser = webdriver.Firefox()
browser = webdriver.Edge()
browser = webdriver.Safari()
```

### 1.4 Accessing the page

- page\_source: accessing the page source

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://www.taobao.com")

print(browser.page_source)
browser.close()
```

### 1.5 Finding nodes

#### Single node

- Get [Taobao.com - 淘! I Like (tao.com)](https://www.taobao.com/) search box
- Observe the source code to analyze the fetch

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

#### multiple nodes

- Get [Taobao.com - Taobao! I like (tao.com)](https://www.taobao.com/) all entries in the left navigation bar

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://www.taobao.com")

lis = browser.find_elements(By.CSS_SELECTOR, ".service-bd li")

print(lis)

browser.close()
```

### 1.6 Node Interaction

- send\_keys: input text
- clear: clear text
- click: click a button

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

### 1.7 Action Chains

- Drag and drop nodes

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

### 1.8 Running JavaScript

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://www.zhihu.com/explore")
browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
browser.execute_script("alert(\"To Bottom\")")
```

### 1.9 Getting node information

#### Get attributes

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://spa2.scrape.center/")

logo = browser.find_element(By.CLASS_NAME, "logo-image")

print(logo)
print(logo.get_attribute("src"))
```

#### Get text value

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://spa2.scrape.center/")

input = browser.find_element(By.CLASS_NAME, "logo-title")

print(input.text)
```

#### Get ID, position, label name and size

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

### 1.10 Switching Frames

- When selenium opens a web page, it operates in the parent frame by default.
- If there is a child frame (iframe) on the page, you need to switch frames using the switch\_to.frame method.

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

### 1.11 Delayed waiting

- selenium's get method does not finish executing until the page frame is loaded.
- If you fetch the source code of a web page when the get method finishes executing, the result may not be a fully loaded page for the browser
  - Additional Ajax Requests
  - JavaScript rendering
- Set the browser to delay waiting for a certain amount of time to ensure that the node is loaded.

#### Implicit wait

- If selenium does not find a node in the DOM, it will continue to wait and throw a node not found exception after the set time has elapsed.
- If selenium does not find a node in the DOM, it will continue to wait for a certain amount of time before searching the DOM.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.implicitly_wait(10)
browser.get("https://spa2.scrape.center/")

input = browser.find_element(By.CLASS_NAME, "logo-image")
print(input)
```

#### Explicit wait

- Specify the node to be looked up and the maximum wait time.
- If the node is loaded within the specified time, the node is returned.
- If the node is not loaded within the specified time, a timeout exception is thrown.

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

- Waiting conditions
  - For details, see the
    - Official Documentation
    - EC package files

| Waiting Conditions | Meaning | --- | --- | Waiting Conditions | Meaning | Waiting Conditions | Meaning
| --- | --- | title\_is | title_is
| title\_is | title is something |
| title\_contains | title contains something |
| presence\_of\_element\_located | node presence, parameter is the node's locator tuple e.g. (By.ID, "p") |
| visibility\_of\_element\_located | The node is visible, the argument is the node's locator tuple |
| visibility\_of | Visible, arguments are node objects |
| presence\_of\_all\_elements\_located | All nodes are present |
| text\_to\_be\_present\_in\_element | Text value of a node contains some text |
| text\_to\_be\_present\_in\_element\_value | A node value contains some text |
| frame\_to\_be\_available\_and\_switch\_to\_it | load and switch |
| invisibility\_of\_element\_located | node not visible |
| element\_to\_be\_clickable | button clickable |
| element\_to\be\_clickable | button clickable | staleness\_of | Determines if a node is still in the DOM Knows if the page has been refreshed |
| element\_to\_be\_selected | Node selectable, parameterized by node object |
| element\_located\\_to\_be\_selected | Node selectable, parameter is the node's localization tuple |
| element\_selection\_state\_to\_be | Parameters are node objects and states Equal returns True, otherwise False |
| element\_located\_selection\_state\_to\_be | Parameters are localized tuples and state Return True if equal, otherwise False |
| alert\_is\_present | Whether or not an alert box appears |

### 1.12 Going forward and backward

- forward(): forward
- back(): backward

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

### 1.13 Cookies

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

### 1.14 Tab management

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

### 1.15 Exception handling

- Node not found exception

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

browser = webdriver.Edge()
browser.get("https://www.baidu.com")
browser.find_element(By.ID, "hello")
```

- Handling exceptions

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

### 1.16 Anti-masking

- Many websites will detect selenium to prevent some crawlers from crawling maliciously.
- Detection principle
  - Detect whether the window.navigator object in the current browser window contains the webdriver property.
    - In normal use of the browser, this property should be undefined.
    - Once selenium is used, it will set the webdriver property on the window.navigator object.
  - Many websites use JavaScript statements to determine if the webdriver property exists.
    - If it does, it blocks it.
- Example site: [Scrape | Movie](https://antispider1.scrape.center/)
- Visit the example site

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://antispider1.scrape.center/")
```

- Use the JavaScipt statement directly to set the webdriver property to null.

```python
from selenium import webdriver

browser = webdriver.Edge()
browser.get("https://antispider1.scrape.center/")
browser.execute_script("Object.defineProperty(navigator, \"webdriver\", {get: () => undefined})")
```

- does null the webdriver attribute.
  - However, the execute\_script method calls the JavaScript statement after the page is loaded, and the webdriver property is already checked before the page is rendered.
- Use CDP (Chrome Devtools Protocol) to solve the problem.
  - It is possible to execute JavaScript statements on each page load, leaving the webdriver property empty.
- The method to execute CDP is Page.addScriptToEvaluateOnNewDocument.
- Edge Devtools Protocol is based on CDP, so the way to use CDP is also applicable to Edge Devtools Protocol.

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

### 1.17 Headless mode

- Makes the site run without popups
- Reduces loading of some resources
- Use the EdgeOptions object to enable headless mode for the Edge browser.

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

## 2. Use of Splash