#### Catalog

- [1. Conditional testing](#1__2)
- [1.1 Check for equality](#11__4)
  - [1.2 Checking for inequality](#12__13)
  - [1.3 Compare values] (#13__22)
  - [1.4 Check for multiple conditions] (#14__31)
  - [1.4.1 Checking with AND](#141_and_33)
    - [1.4.2 Checking with or](#142_or_43)
  - [1.5 Check if a specific value is included in a list](#15__53)
  - [1.6 Checking if a particular value is not included in a list](#16__62)
  - [1.7 Boolean expressions](#17__71)
- [2. if statements](#2_if_80)
- [2.1 Simple if statements](#21_if_82)
  - [2.2 if-else statements](#22_ifelse_92)
  - [2.3 The if-elif-else construct](#23_ifelifelse_104)
  - [2.4 Using multiple elif code blocks](#24_elif_118)
  - [2.5 Omit the else code block](#25_else_134)

## 1. Conditional testing

### 1.1 Checking for equality

```python
a = 1
print(a == 1)
```

### 1.2 Checking for inequality

```python
a = 1
print(a != 1)
```

### 1.3 Comparing values

```python
a = 1
print(a < 1)
```

### 1.4 Checking multiple conditions

#### 1.4.1 Checking with and

```python
a = 1
b = 2
print(a == 1 and b == 2)
```

#### 1.4.2 Checking with or

```python
a = 1
b = 2
print(a == 1 or b != 2)
```

### 1.5 Checking if a specific value is included in a list

```python
values = [1, 2, 3]
print("2" in values)
```

### 1.6 Checking if a specific value is not included in a list

```python
values = [1, 2, 3]
print("2" not in values)
```

### 1.7 Boolean expressions

```python
a = True
b = False
```

## 2. if statements

### 2.1 Simple if Statements

```python
a = 1
if a == 1:
    print("a = 1")
```

### 2.2 if-else statements

```python
a = 1
if a == 1:
    print("a = 1")
else:
    print("False")
```

### 2.3 if-elif-else constructs

```python
a = 2
if a == 1:
    print("a = 1")
elif a == 2:
    print("a = 2")
else:
    print("False")
```

### 2.4 Using multiple elif blocks

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

### 2.5 Omitting the else block

```python
a = 2
if a == 1:
    print("a = 1")
elif a == 2:
    print("a = 2")
```