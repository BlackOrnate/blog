#### Catalog

- [1. How the function input() works](#1_input_2)
- [1.1 Using int() to get numeric input](#11_int_11)
- [2. Introduction to while loops](#2_while_22)
- [2.1 Using the while loop](#21_while_24)
  - [2.2 Using break to exit a loop](#22_break_35)
  - [2.3 Using continue](#23_continue_48)
- [3. Working with lists and dictionaries using while loops](#3_while_61)
- [3.1 Moving elements between lists](#31__63)
  - [3.2 Delete all list elements that are a specific value](#32__78)

## 1. How the function input() works

```python
message = input("Input: ")
print(message)
```

### 1.1 Getting numeric input using int()

- Converts the input numeric string to a number

```python
num = int(input("Input num: "))
print(num > 1)
```

## 2. while loop introduction

## 2.1 Using the while loop

```python
a = 1
while a < 5:
    a += 1
    print(a)
```

### 2.2 Exiting a loop with break

```python
a = 1
while a < 5:
    a += 1
    if a == 3:
        break
    print(a)
```

### 2.3 Using continue

```python
a = 1
while a < 5:
    a += 1
    if a == 3:
        continue
    print(a)
```

## 3. Working with lists and dictionaries using while loops

### 3.1 Moving Elements Between Lists

```python
A = [1, 2, 3]
B = []

while A:
    B.append(A.pop())

print("A:" + str(A))
print("B:" + str(B))
```

### 3.2 Deleting all list elements for a given value

```python
A = [1, 2, 3, 1, 1]
while 1 in A:
    A.remove(1)
print(A)
```