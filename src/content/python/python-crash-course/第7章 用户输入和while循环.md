#### 目录

- [1. 函数input()的工作原理](#1_input_2)
- - [1.1 使用int()获取数值输入](#11_int_11)
- [2. while循环简介](#2_while_22)
- - [2.1 使用while循环](#21_while_24)
  - [2.2 使用break退出循环](#22_break_35)
  - [2.3 使用continue](#23_continue_48)
- [3. 使用while循环处理列表和字典](#3_while_61)
- - [3.1 在列表之间移动元素](#31__63)
  - [3.2 删除为特定值的所有列表元素](#32__78)

## 1. 函数input()的工作原理

```python
message = input("Input: ")
print(message)
```

### 1.1 使用int()获取数值输入

- 将输入的数字型字符串转化为数字

```python
num = int(input("Input num: "))
print(num > 1)
```

## 2. while循环简介

### 2.1 使用while循环

```python
a = 1
while a < 5:
    a += 1
    print(a)
```

### 2.2 使用break退出循环

```python
a = 1
while a < 5:
    a += 1
    if a == 3:
        break
    print(a)
```

### 2.3 使用continue

```python
a = 1
while a < 5:
    a += 1
    if a == 3:
        continue
    print(a)
```

## 3. 使用while循环处理列表和字典

### 3.1 在列表之间移动元素

```python
A = [1, 2, 3]
B = []

while A:
    B.append(A.pop())

print("A:" + str(A))
print("B:" + str(B))
```

### 3.2 删除为特定值的所有列表元素

```python
A = [1, 2, 3, 1, 1]
while 1 in A:
    A.remove(1)
print(A)
```