#### 目录

- [1. 条件测试](#1__2)
- - [1.1 检查是否相等](#11__4)
  - [1.2 检查是否不等](#12__13)
  - [1.3 数值比较](#13__22)
  - [1.4 检查多个条件](#14__31)
  - - [1.4.1 使用and检查](#141_and_33)
    - [1.4.2 使用or检查](#142_or_43)
  - [1.5 检查特定值是否包含在列表中](#15__53)
  - [1.6 检查特定值是否不包含在列表中](#16__62)
  - [1.7 布尔表达式](#17__71)
- [2. if语句](#2_if_80)
- - [2.1 简单的if语句](#21_if_82)
  - [2.2 if-else语句](#22_ifelse_92)
  - [2.3 if-elif-else结构](#23_ifelifelse_104)
  - [2.4 使用多个elif代码块](#24_elif_118)
  - [2.5 省略else代码块](#25_else_134)

## 1. 条件测试

### 1.1 检查是否相等

```python
a = 1
print(a == 1)
```

### 1.2 检查是否不等

```python
a = 1
print(a != 1)
```

### 1.3 数值比较

```python
a = 1
print(a < 1)
```

### 1.4 检查多个条件

#### 1.4.1 使用and检查

```python
a = 1
b = 2
print(a == 1 and b == 2)
```

#### 1.4.2 使用or检查

```python
a = 1
b = 2
print(a == 1 or b != 2)
```

### 1.5 检查特定值是否包含在列表中

```python
values = [1, 2, 3]
print("2" in values)
```

### 1.6 检查特定值是否不包含在列表中

```python
values = [1, 2, 3]
print("2" not in values)
```

### 1.7 布尔表达式

```python
a = True
b = False
```

## 2. if语句

### 2.1 简单的if语句

```python
a = 1
if a == 1:
    print("a = 1")
```

### 2.2 if-else语句

```python
a = 1
if a == 1:
    print("a = 1")
else:
    print("False")
```

### 2.3 if-elif-else结构

```python
a = 2
if a == 1:
    print("a = 1")
elif a == 2:
    print("a = 2")
else:
    print("False")
```

### 2.4 使用多个elif代码块

```python
a = 2
if a == 1:
    print("a = 1")
elif a == 2:
    print("a = 2")
elif a == 3:
    print("a = 3")
else:
    print("False")
```

### 2.5 省略else代码块

```python
a = 2
if a == 1:
    print("a = 1")
elif a == 2:
    print("a = 2")
```