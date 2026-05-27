#### 目录

- [1. 建立结构声明](#1__2)
- [2. 定义结构变量](#2__27)
- - [3.1 初始化结构](#31__95)
  - [3.2 访问结构成员](#32__115)
  - [3.3 结构的初始化器](#33__139)
- [4. 结构数组](#4__157)
- - [4.1 声明结构数组](#41__159)
  - [4.2 标识结构数组的成员](#42__169)
- [5. 嵌套结构](#5__180)
- [6. 指向结构的指针](#6__197)
- - [6.1 声明和初始化结构指针](#61__206)
  - [6.2 使用指针访问成员](#62__220)
- [7. 向函数传递结构的信息](#7__238)
- - [7.1 传递结构成员](#71__240)
  - [7.2 传递结构的地址](#72__270)
  - [7.3 传递结构](#73__300)
  - [7.4 其他结构特性](#74__330)
  - [7.5 结构和结构指针的选择](#75__340)
  - [7.6 结构中的字符数组和字符指针](#76__369)
  - [7.7 结构、指针和 malloc()](#77__malloc_387)
  - [7.8 复合字面量和结构（C99）](#78_C99_416)
  - [7.9 伸缩型数组成员（C99）](#79_C99_429)
  - [7.10 匿名结构（C11）](#710_C11_456)
- [8. 链式结构](#8__471)
- [9. 联合简介](#9__484)
- - [9.1 使用联合](#91__501)
  - [9.2 匿名联合（C11）](#92_C11_512)
- [10. 枚举类型](#10__527)
- - [10.1 enum 常量](#101_enum__546)
  - [10.2 默认值](#102__555)
  - [10.3 赋值](#103__561)
  - [10.4 共享名称空间](#104__572)
- [11. typedef 简介](#11_typedef__583)
- [12. 其他复杂的声明](#12__600)

## 1. 建立结构声明

- **结构声明（structure declaration）** 描述了一个结构的组织布局
  - 结构中的每个部分都称为**成员（member）**或**字段（field）**

```
struct animal {
    char name[50];
    int age;
    char sex;
};

struct animal dog;
struct animal cat;
```

- 结构声明有时被称为模板，因为其勾勒出结构是如何存储数据的
- 如果把结构声明置于一个函数的内部，它的标记就只限于该函数内部使用
- 如果把结构声明置于一个函数的外部，该声明之后的所有函数都能使用它的标记

## 2. 定义结构变量

- **结构**有两层含义

  - 结构布局：告诉编译器如何表示数据，但是它并未让编译器为数据**分配**空间
  - 创建一个**结构变量**

    ```
    struct animal {
        char name[50];
        int age;
        char sex;
    };

    struct animal dog;
    ```

    - 编译器创建一个结构变量 dog
    - 编译器使用 animal 模板为为该变量分配空间

      - 一个内含 50 个元素的 char 数组
      - 一个 int 类型的变量
      - 一个 char 类型的变量
    - 这些存储空间都与一个名称 dog 结合在一起
    - 可以定义两个 struct animal 类型的变量，或者是指向 struct animal 类型结构的指针

      ```
      struct animal dog;
      struct animal cat;
      struct animal *a;
      ```

      - 指针 a 可以指向 dog 、cat 或任何其他 animal 类型的结构变量
    - 从本质看，animal 结构声明创建了一个名为 struct animal 的新类型

```
struct animal dog;
```

- 是以下声明的简化

```
struct animal {
    char name[50];
    int age;
    char sex;
} dog;
```

```c
struct { // 无结构标记
    char name[50];
    int age;
    char sex;
} dog;
```

### 3.1 初始化结构

```
struct animal {
    char name[50];
    int age;
    char sex;
};

struct animal dog = {
    "abc",
    1,
    'M'
};
```

- 如果初始化一个静态存储期的结构，初始化列表中的值必须是常量表达式

### 3.2 访问结构成员

```c
#include <stdio.h>

struct animal {
    char name[50];
    int age;
    char sex;
};

int main() {
    struct animal dog = {
        "abc",
        1,
        'M'
    };

    printf("name = %s, age = %d, sex = %c\n", dog.name, dog.age, dog.sex);
}
```

### 3.3 结构的初始化器

- C90 和 C11 为结构提供了**指定初始化器（designated initializer）**

```
struct animal dog = {
    .age = 1,
    .name = "abc",
    2,
    .sex = 'M'
};
```

- 点运算符 + 成员名的方法不需要考虑结构体中的成员顺序
- name 下一个为 age，所以 age 从原本的 1 修改成 2

## 4. 结构数组

### 4.1 声明结构数组

```
struct animal zoo[10];
```

- 数组中的每个元素都是一个 animal 类型的结构

### 4.2 标识结构数组的成员

```
zoo;					// animal 结构的数组
zoo[0]					// animal 结构的元素
zoo[0].name = "abc";	// char 数组
zoo[0].name[1] = 'b';	// char
```

## 5. 嵌套结构

```
struct name {
    char first[10];
    char last[10];
};

struct animal {
    struct name dog;
    int age;
    char sex;
};
```

## 6. 指向结构的指针

- 指向结构的指针通常比结构本身更容易操控
- 可以传递指向结构的指针给函数
- 传递指针更有效率
- 表示数据的结构中包含指向其他结构的指针

### 6.1 声明和初始化结构指针

```c
struct animal* p;

p = &dog;

printf("%#x\n", p);
```

- 结构变量名并不是结构变量的地址

### 6.2 使用指针访问成员

- 访问成员的 2 种方法

  - 第 1 种方法：使用 -> 运算符

    ```c
    printf("%s\n", p->name);
    ```
  - 第 2 种方法：解引用

    ```c
    printf("%s\n", (*p).name);
    ```

## 7. 向函数传递结构的信息

### 7.1 传递结构成员

```c
#include <stdio.h>

struct animal {
    char name[50];
    int age;
    char sex;
};

void sout(char);

int main() {
    struct animal dog = {
        .name = "abc",
        .age = 1,
        .sex = 'M'
    };

    sout(dog.name);
}

void sout(char str[50]) {
    printf("%s\n", str);
}
```

### 7.2 传递结构的地址

```c
#include <stdio.h>

void sout(struct animal *);

struct animal {
    char name[50];
    int age;
    char sex;
};

int main() {
    struct animal dog = {
        .name = "abc",
        .age = 1,
        .sex = 'M'
    };

    sout(&dog);
}

void sout(struct animal *p) {
    printf("%s\n", p->name);
}
```

### 7.3 传递结构

```c
#include <stdio.h>

void sout(struct animal);

struct animal {
    char name[50];
    int age;
    char sex;
};

int main() {
    struct animal dog = {
        .name = "abc",
        .age = 1,
        .sex = 'M'
    };

    sout(dog);
}

void sout(struct animal a) {
    printf("%s\n", a.name);
}
```

### 7.4 其他结构特性

- 把一个结构赋值给另一个结构

  ```
  dog = cat;
  ```

### 7.5 结构和结构指针的选择

- 指针：

  - 优点：

    - C 语言一直都可以使用的方法
    - 执行更快，只需要传递一个地址
  - 缺点：

    - 无法保护数据
- 结构：

  - 优点：
    - 函数处理的是原始数据的副本，保护了原始数据
    - 代码风格清楚
  - 缺点
    - 较老版本不能使用
    - 传递结构浪费时间和存储空间
- 追求效率使用结构指针作为函数参数，使用 const 防止意外修改
- 按值传递结构是处理小型结构的最常用方法

### 7.6 结构中的字符数组和字符指针

```c
struct name {
    char *first;
    char *last;
};

struct name n = {
    "abc",
    "ABC"
};

printf("%s, %s\n", n.first, n.last);
```

### 7.7 结构、指针和 malloc()

- 使用 malloc() 分配内存并使用指针存储该地址，为字符串分配合适的空间

```c
struct name {
    char* first;
    char* last;
};

char first[5];
char last[5];

fgets(first, 5, stdin);
fgets(last, 5, stdin);

struct name n;

n.first = (char*)malloc(strlen(first) + 1);
n.last = (char*)malloc(strlen(last) + 1);

strcpy(n.first, first);
strcpy(n.last, last);

printf("%s%s\n", n.first, n.last);
```

### 7.8 复合字面量和结构（C99）

```
struct animal dog;
dog = (struct animal) {
    .name = "abc",
    .age = 1,
    .sex = 'M'
};
```

### 7.9 伸缩型数组成员（C99）

- 利用 **伸缩型数组成员（flexible array member）** 声明的结构，最后一个数组成员的特性
  - 该数组不会立即存在
  - 使用这个伸缩型数组成员可以编写合适的代码
- 声明伸缩型数组成员的规则
  - 必须是结构的最后一个成员
  - 结构中必须至少有一个成员
  - 伸缩型数组的声明类似于普通数组

```
struct animal {
    int age;
    char sex;
    char name[]; // 伸缩型数组成员
};
```

- 需要声明一个 struct animal 类型的**指针**，然后用 malloc() 来分配足够的空间，以存储 struct animal 类型结构的常规内容和伸缩型数组成员所需的额外空间

```c
struct animal *p;
p = malloc(sizeof(struct animal) + 5 * sizeof(char));
```

### 7.10 匿名结构（C11）

```c
struct animal {
    struct {
        char first[10];
    	char last[10];
    };
    int age;
    char sex;
};
```

## 8. 链式结构

- 数据结构：
  - 二叉树
  - 堆
  - 哈希表
  - 图表
- 这些数据结构都由 **链式结构（linked structure）** 组成
- 每个结构都包含一两个数据项和一两个指向其他同类型结构的指针
- 这些指针把一个结构和另一个结构链接起来，并提供一种路径能遍历整个彼此链接的结构

## 9. 联合简介

- **联合（union）** 是一种数据类型，它能在同一个内存空间中存储不同的数据类型（不是同时存储）

```
union animal {
    char name[10];
    int age;
    char sex;
}
```

- 声明的联合只能存储 name, age, sex 中的一个值
- 编译器分配足够的空间以便能够存储联合声明中占用最大字节的类型

### 9.1 使用联合

```
union animal dog;
dog.name = "abc";	// 将 "abc" 存储
dog.age = 1;		// 删除 "abc" ，将 1 存储
dog.sex = 'M';		// 删除 1 ，将 'M' 存储
```

### 9.2 匿名联合（C11）

```
union animal {
    union {
        char first[10];
    	char last[10];
    };
    int age;
    char sex;
};
```

## 10. 枚举类型

- **枚举类型（enumerated type）** 用来表示整型常量
- 使用给 enum 声明（enum 常量是 int 类型）
- 提高代码可读性

```
enum letter {a, b, c};
enum letter abc;
```

- 第 1 个声明创建了 letter 作为标记名，允许把 enum letter 作为类型名使用
  - 花括号内枚举了 letter 变量可能有的值
- 第 2 个声明使 abc 作为该类型的变量
  - abc 可能的值使a、b、c
  - 这些符号常量被称为**枚举符（enumerator）**

### 10.1 enum 常量

```c
printf("a = %d,b = %d\n", a, b);
// a = 0,b = 1
```

### 10.2 默认值

- 默认情况下，枚举列表中的常量都被赋予0、1、2等

### 10.3 赋值

```c
enum number { a, b = 10, c = 100 };

printf("a = %d,b = %d, c = %d\n", a, b, c);
// a = 0,b = 10, c = 100
```

### 10.4 共享名称空间

- **名称空间（namespace）** 用于标识程序中的各个部分，即通过名称来识别
- 作用域是名称空间的一部分
  - 两个不同作用域的同名变量不冲突
  - 两个相同作用域的同名变量冲突
- 在特定作用域中的结构标记、联合标记和枚举标记都共享相同的名称空间，该名称空间与普通变量使用的空间不同
- 在相同作用域中变量和标记的名称可以相同，不会引起冲突，但是不能在相同作用域中声明两个同名标签或同名变量

## 11. typedef 简介

- 使用 typedef 可以为某一类型自定义名称
- 与 #define 类似，但是二者有 3 处不同
  - typedef 创建的符号名只受限于类型，不能用于值
  - typedef 由编译器解释，不是预处理器
  - 在受限范围内，typedef 比 #define 更灵活

```c
typedef unsigned char BYTE;
// 用 BYTE 表示 1 字节的数据类型
```

- 提高程序的可移植性

## 12. 其他复杂的声明

- 声明时可使用的符号

| 符号 | 含义 |
| --- | --- |
| \* | 表示一个指针 |
| () | 表示一个函数 |
| [] | 表示一个数组 |

- \*、()、[]的优先级的规则

  - 第 1 条

    - 数组名后面的 [] 和函数名后面的 () 具有相同的优先级
    - 它们比 \* （解引用）的优先级高

    ```
    int * i[10];
    // 包含指针的数组
    ```
  - 第 2 条

    - [] 和 () 的优先级相同，都是从左往右结合

    ```
    int (* i)[10];
    // 指向数组的指针
    ```
  - 第 3 条

    - [] 和 () 都是从左往右结合

    ```
    int i[10][20];
    // i 是由 10 个内含 20 个 int 类型值的数组组成的二维数组

    int * i[10][20];
    // i 是由 10 个内含 20 个 int 指针类型值的数组组成的二维数组，预留 200 个指针的存储空间

    int (* i)[10][20];
    // i 是由 10 个内含 20 个 int 类型值的数组组成的二维数组的指针，预留 200 个 int l的存储空间
    ```