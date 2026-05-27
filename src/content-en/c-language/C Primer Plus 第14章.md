#### Table of Contents

- [1. Creating Structure Declarations](#1__2)
- [2. Defining Structure Variables](#2__27)
- - [3.1 Initializing Structures](#31__95)
  - [3.2 Accessing Structure Members](#32__115)
  - [3.3 Structure Initializers](#33__139)
- [4. Structure Arrays](#4__157)
- - [4.1 Declaring Structure Arrays](#41__159)
  - [4.2 Identifying Members of Structure Arrays](#42__169)
- [5. Nested Structures](#5__180)
- [6. Pointers to Structures](#6__197)
- - [6.1 Declaring and Initializing Structure Pointers](#61__206)
  - [6.2 Accessing Members Using Pointers](#62__220)
- [7. Passing Structure Information to Functions](#7__238)
- - [7.1 Passing Structure Members](#71__240)
  - [7.2 Passing Structure Addresses](#72__270)
  - [7.3 Passing Structures](#73__300)
  - [7.4 Other Structure Features](#74__330)
  - [7.5 Choosing Between Structures and Structure Pointers](#75__340)
  - [7.6 Character Arrays and Character Pointers in Structures](#76__369)
  - [7.7 Structures, Pointers, and malloc()](#77__malloc_387)
  - [7.8 Compound Literals and Structures (C99)](#78_C99_416)
  - [7.9 Variable-sized Array Members (C99)](#79_C99_429)
  - [7.10 Anonymous Structures (C11)](#710_C11_456)
- [8. Linked Structures](#8__471)
- [9. Introduction to Unions](#9__484)
- - [9.1 Using Unions](#91__501)
  - [9.2 Anonymous Unions (C11)](#92_C11_512)
- [10. Enum Types](#10__527)
- - [10.1 enum Constants](#101_enum__546)
  - [10.2 Default Values](#102__555)
  - [10.3 Assignment](#103__561)
  - [10.4 Shared Namespace](#104__572)
- [11. Introduction to typedef](#11_typedef__583)
- [12. Other Complex Declarations](#12__600)

## 1. Creating Structure Declarations

- **A structure declaration** describes the organizational layout of a structure
  - Each part of a structure is called a **member** or **field**

```
struct animal {
    char name[50];
    int age;
    char sex;
};

struct animal dog;
struct animal cat;
```

- Structure declarations are sometimes called templates because they outline how the structure stores data
- If a structure declaration is placed inside a function, its members are restricted to use within that function
- If a structure declaration is placed outside a function, all functions following that declaration can use its members

## 2. Defining Structure Variables

- **Structure** has two meanings

  - Structure layout: Tells the compiler how to represent data, but it does not cause the compiler to **allocate** space for the data
  - Creating a **structure variable**

    ```
    struct animal {
        char name[50];
        int age;
        char sex;
    };

    struct animal dog;
    ```

- The compiler creates a structure variable named `dog`
    - The compiler uses the `animal` template to allocate space for this variable

      - A `char` array containing 50 elements
      - An `int` variable
      - A `char` variable
    - All of this storage space is associated with the name `dog`
    - You can define two variables of type `struct animal`, or pointers to structures of type `struct animal`

      ```
      struct animal dog;
      struct animal cat;
      struct animal *a;
      ```

- The pointer `a` can point to `dog`, `cat`, or any other structure variable of type `animal`
    - Essentially, the `animal` structure declaration creates a new type named `struct animal`

```
struct animal dog;
```

- It is a simplification of the following declaration

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

### 3.1 Initializing Structures

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

- When initializing a statically stored structure, the values in the initialization list must be constant expressions

### 3.2 Accessing Structure Members

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

### 3.3 Structure Initializers

- C90 and C11 provide **designated initializers** for structures

```
struct animal dog = {
    .age = 1,
    .name = "abc",
    2,
    .sex = 'M'
};
```

- The dot notation (dot operator) followed by a member name does not require consideration of the order of members within the structure
- Since the next element after `name` is `age`, `age` is updated from 1 to 2

## 4. Arrays of Structures

### 4.1 Declaring an Array of Structures

```
struct animal zoo[10];
```

- Each element in the array is a structure of type `animal`

### 4.2 Accessing Members of an Array of Structures

```
zoo;					// animal 结构的数组
zoo[0]					// animal 结构的元素
zoo[0].name = "abc";	// char 数组
zoo[0].name[1] = 'b';	// char
```

## 5. Nested Structures

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

## 6. Pointers to Structures

- Pointers to structures are generally easier to manipulate than the structures themselves
- Pointers to structures can be passed to functions
- Passing pointers is more efficient
- Structures that represent data may contain pointers to other structures

### 6.1 Declaring and Initializing Structure Pointers

```c
struct animal* p;

p = &dog;

printf("%#x\n", p);
```

- The name of a structure variable is not the same as its address

### 6.2 Accessing Members Using Pointers

- Two methods for accessing members

  - Method 1: Using the -&gt; operator

    ```c
    printf("%s\n", p->name);
    ```

- Method 2: Dereferencing

    ```c
    printf("%s\n", (*p).name);
    ```

## 7. Passing Structure Information to Functions

### 7.1 Passing Structure Members

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

### 7.2 Passing the Address of a Structure

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

### 7.3 Passing a Structure

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

### 7.4 Other Structure Features

- Assigning a Structure to Another Structure

  ```
  dog = cat;
  ```

### 7.5 Choosing Between Structures and Structure Pointers

- Pointers:

  - Advantages:

    - A method that has always been available in C
    - Faster execution, as only an address needs to be passed
  - Disadvantages:

    - Cannot protect data
- Structures:

  - Advantages:
    - Functions operate on copies of the original data, protecting the original data
    - Clear code style
  - Disadvantages
    - Cannot be used with older versions
    - Passing structures wastes time and memory
- For efficiency, use structure pointers as function parameters and use `const` to prevent accidental modification
- Passing structures by value is the most common method for handling small structures

### 7.6 Character Arrays and Character Pointers in Structures

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

### 7.7 Structures, Pointers, and malloc()

- Use malloc() to allocate memory and store the address in a pointer to allocate appropriate space for strings

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

### 7.8 Compound Literals and Structures (C99)

```
struct animal dog;
dog = (struct animal) {
    .name = "abc",
    .age = 1,
    .sex = 'M'
};
```

### 7.9 Flexible Array Members (C99)

- Structures declared using **flexible array members**: characteristics of the last array member
  - This array does not exist immediately
  - You can write appropriate code using this flexible array member
- Rules for declaring flexible array members
  - It must be the last member of the structure
  - The structure must have at least one member
  - Declaring a flexible array is similar to declaring a regular array

```
struct animal {
    int age;
    char sex;
    char name[]; // 伸缩型数组成员
};
```

- You need to declare a **pointer** of type `struct animal`, then use `malloc()` to allocate enough space to store the regular contents of the `struct animal` and the extra space required for the flexible array member

```c
struct animal *p;
p = malloc(sizeof(struct animal) + 5 * sizeof(char));
```

### 7.10 Anonymous Structures (C11)

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

## 8. Linked Structures

- Data Structures:
  - Binary trees
  - Heaps
  - Hash tables
  - Graphs
- These data structures are all composed of **linked structures**
- Each structure contains one or two data items and one or two pointers to other structures of the same type
- These pointers link one structure to another and provide a path to traverse the entire linked structure

## 9. Introduction to Unions

- **A union** is a data type that can store different data types within the same memory space (not simultaneously)

```
union animal {
    char name[10];
    int age;
    char sex;
}
```

- A declared union can store only one of the values from name, age, or sex
- The compiler allocates enough space to store the type that occupies the most bytes in the union declaration

### 9.1 Using Unions

```
union animal dog;
dog.name = "abc";	// 将 "abc" 存储
dog.age = 1;		// 删除 "abc" ，将 1 存储
dog.sex = 'M';		// 删除 1 ，将 'M' 存储
```

### 9.2 Anonymous Unions (C11)

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

## 10. Enumerated Types

- **Enumerated types** are used to represent integer constants
- Use the `enum` declaration (enum constants are of type `int`)
- Improve code readability

```
enum letter {a, b, c};
enum letter abc;
```

- The first declaration creates `letter` as a label, allowing `enum letter` to be used as a type name
  - The values that the `letter` variable can take are listed within the curly braces
- The second declaration defines `abc` as a variable of this type
  - The possible values for `abc` are `a`, `b`, and `c`
  - These symbolic constants are called **enumerators**

### 10.1 Enum Constants

```c
printf("a = %d,b = %d\n", a, b);
// a = 0,b = 1
```

### 10.2 Default Values

- By default, the constants in the enumeration list are assigned values such as 0, 1, 2, and so on

### 10.3 Assignment

```c
enum number { a, b = 10, c = 100 };

printf("a = %d,b = %d, c = %d\n", a, b, c);
// a = 0,b = 10, c = 100
```

### 10.4 Shared Namespace

- A **namespace** is used to identify different parts of a program, i.e., to distinguish them by name
- Scope is a part of a namespace
  - Variables with the same name in two different scopes do not conflict
  - Variables with the same name in the same scope do conflict
- Structure, union, and enumeration labels within a specific scope share the same namespace, which is distinct from the namespace used by ordinary variables
- Variables and labels can have the same name within the same scope without causing a conflict; however, two labels or variables with the same name cannot be declared within the same scope

## 11. Introduction to typedef

- You can use `typedef` to define a custom name for a type
- It is similar to `#define`, but there are three key differences:
  - Symbols created by `typedef` are restricted to types and cannot be used for values
  - `typedef` is interpreted by the compiler, not the preprocessor
  - Within its scope, `typedef` is more flexible than `#define`

```c
typedef unsigned char BYTE;
// 用 BYTE 表示 1 字节的数据类型
```

- Improves program portability

## 12. Other Complex Declarations

- Symbols that can be used in declarations

| Symbol | Meaning |
| --- | --- |
| \* | Indicates a pointer |
| () | Indicates a function |
| [] | Indicates an array |

- Rules for the precedence of \*, (), and []

  - Rule 1

    - The [] following an array name and the () following a function name have the same precedence
    - They have higher precedence than \* (dereferencing)

    ```
    int * i[10];
    // 包含指针的数组
    ```

- Rule 2

    - [] and () have the same precedence and are both left-to-right associative

    ```
    int (* i)[10];
    // 指向数组的指针
    ```

- Rule 3

    - [] and () are both left-to-right associative

    ```
    int i[10][20];
    // i 是由 10 个内含 20 个 int 类型值的数组组成的二维数组

    int * i[10][20];
    // i 是由 10 个内含 20 个 int 指针类型值的数组组成的二维数组，预留 200 个指针的存储空间

    int (* i)[10][20];
    // i 是由 10 个内含 20 个 int 类型值的数组组成的二维数组的指针，预留 200 个 int l的存储空间
    ```