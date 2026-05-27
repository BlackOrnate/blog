## 1. Storage Classes

- C provides several different models, or **storage classes**, for storing data in memory
- From a hardware perspective, each stored value occupies a certain amount of physical memory; in C, such a block of memory is referred to as an **object**

  - An object can store one or more values
  - An object may not store any actual values, but it must have a corresponding size when storing appropriate values
- From a software perspective, a program needs a way to access objects

  ```
  int i = 1;
  ```

  - This declaration defines an **identifier** named i
    - An identifier is a name; in this case, it can be used to **designate** the contents of a specific object
    - Identifiers follow variable naming conventions
    - An identifier is the way software (a C program) **designates** an object in hardware memory
    - This declaration also provides the value stored in the object:

  ```
  int i = 1;
  int* a = &i;
  ```

  - `a` is an identifier that **designates** an object at a storage address
  - The expression `\*a` is not an identifier because it is not a name
    - It does, however, designate an object
    - It refers to the same object as i
      - i is both an identifier and an lvalue
      - \*a is both an expression and an lvalue
- If an lvalue can be used to modify the value in an object, that lvalue is a **modifiable lvalue**

  ```
  char* c = "abc";
  ```

  - Since c can be set to point to a different string, the identifier c is a modifiable lvalue
  - `*c` refers to the data object storing the character ‘a’, so `*c` is an lvalue but not a modifiable lvalue
- A string literal itself refers to the object storing the string, so it is an lvalue but not a modifiable lvalue
- Objects can be described in terms of **storage duration**; storage duration refers to how long an object remains in memory
- Identifiers are used to access objects. Identifiers can be described in terms of **scope** and **linkage**; an identifier’s scope and linkage indicate which parts of the program can use it
- Different storage classes have different storage durations, scopes, and linkages

### 1.1 Scope

- Describes the areas within a program where an identifier is accessible
- The scope of a C variable can be block scope, function scope, function prototype scope, or file scope
- A **block** is a region of code enclosed by a pair of curly braces
- Variables defined within a block have **block scope**; the visibility of a block-scoped variable extends from its definition to the end of the block containing that definition
- Although formal function parameters are declared before the opening curly brace of the function, they also have block scope and belong to the block that is the function body

```c
void abc() {
    printf("abc\n"); // 块作用域
}
```

  - **Function scope** is used only for labels in goto statements
- Even if a label first appears in an inner block of a function, its scope extends to the entire function
- **Function prototype scope** is used for formal parameter names (variable names) in function prototypes
- The scope extends from the definition of the formal parameter to the end of the prototype declaration
- When processing formal parameters in function prototypes, the compiler is only concerned with their types; the parameter names are usually irrelevant

```
void abc(int i) { // 函数原型作用域
}
```

  - **File scope**
- Visible from the point of definition to the end of the file in which the definition appears
- File-scope variables are also called **global variables**

```c
#include <stdin.h>
int i = 1; // 文件作用域
int main() {
    
}
```

  ### 1.2 Linking

- C variables have three linking attributes: external, internal, or unlinked
- Unlinked variables: variables with block scope, function scope, or function prototype scope

  - These variables are private to the block, function, or prototype in which they are defined
- External-linked or internal-linked: Variables with file scope

  - External-linked variables can be used in multi-file programs

    ```
    int i = 1;
    ```

  - Internal-linked variables can only be used within a single translation unit

    ```
    static int i = 1;
    ```

  ### 1.3 Lifetime

- Lifetime describes the duration of existence of objects accessed through these identifiers
- C objects have four types of storage duration: static, thread, automatic, and dynamically allocated
- Static storage duration: The object exists throughout the program’s execution

  - File-scope variables have static storage duration
- Thread storage duration: Program execution can be divided into multiple threads; the object exists from the time of declaration until the thread ends
- Automatic storage class: Memory is allocated for these variables when the program enters the block where they are defined; when the program exits the block, the memory allocated for the variables is released

  - Block-scoped variables typically have automatic storage class
  - The memory occupied by automatic variables is treated as a reusable workspace or temporary storage area
- 5 Storage Classes

| Storage Class | Storage Duration | Scope | Linkage | Declaration |
| --- | --- | --- | --- | --- |
| Automatic | Automatic | Block | None | Within block |
| Register | Automatic | Block | None | Within block, using the keyword register |
| Static External | Static | File | External | Outside all functions |
| Static Internal | Static | File | Internal | Outside all functions, using the keyword static |
| Static Unlinked | Static | Block | None | Within the block, using the keyword static |

### 1.4 Automatic Variables

- Variables belonging to the automatic storage class have automatic storage duration, block scope, and no linkage
- Any variable declared at the beginning of a block or function belongs to the automatic storage class
- The keyword `auto` can be used to denote automatic variables

  - The keyword `auto` is a **storage-class specifier**
- If a variable declared in an inner block has the same name as a variable in an outer block

  - The inner block **hides** the definition in the outer block
  - However, once the inner block is exited, the outer block variable’s scope reverts to its original scope

#### 1.4.1 Blocks Without Curly Braces

```c
for (int i = 1; i < 3; i++)
    printf("i = %d\n", i);
```

  #### 1.4.2 Initialization of Automatic Variables

- Automatic variables are not initialized unless explicitly initialized
- Automatic variables can be initialized with a **non-constant expression**, provided the variable has been defined earlier

```
int a = 1;
int b = 2 * a;
```

  ### 1.5 Register Variables

- Compared to ordinary variables, registers are accessed and processed more quickly
- Since register variables are stored in registers rather than memory, their addresses cannot be obtained
- Register variables also have block scope, no linkage, and automatic storage class
- Register variables are declared using the storage class specifier `register`

```
register int i;
```

  - The compiler must evaluate your request based on the number of available registers or the fastest available memory
  - Or it may simply ignore your request
    - In this case, the register becomes a regular automatic variable
    - However, you still cannot use the address operator on such variables

### 1.6 Block-Scoped Static Variables

- **Static variables** remain fixed in memory
- Like automatic variables, they have the same scope, but they do not disappear when the program exits the function in which they are defined
- These variables have block scope, no linkage, and static storage duration

```c
#include <stdio.h>

void abc();

void main() {
    for (int i = 0; i < 3; i++) {
        abc();
    }
    // a++ = 1, b++ = 1
    // a++ = 1, b++ = 2
    // a++ = 1, b++ = 3
}

void abc() {
    int a = 1;
    static int b = 1;
    printf("a++ = %d, b++ = %d\n", a++, b++);
}
```

  ### 1.7 Externally Linked Static Variables

- Externally linked static variables have file scope, external linkage, and static storage duration

  - This category is sometimes referred to as the **external storage class**
  - Variables belonging to this class are called **external variables**
  - An external variable is created by placing the variable’s **defining declaration** outside all functions
- To indicate that a function uses an external variable, it can be redeclared within the function using the keyword `extern`
- If an external variable used by a source file is defined in another source file, the variable must be declared with `extern` in that file

```c
int a;
extern int b; // b 定义在另一个文件，必须这样声明

int main() {
    extern int a; // 可选声明
}
```

  #### 1.7.1 Initializing External Variables

- External variables are similar to automatic variables in that they can be explicitly initialized
- Unlike automatic variables, if external variables are not initialized, they are automatically initialized to 0
- File-scope variables can only be initialized using constant expressions

```
int a = 1;
int b = 2 * a; // 错误，a 是变量
```

  #### 1.7.2 Using External Variables

```c
#include <stdio.h>

int i = 0;
void abc();

int main() {
    while (i != -1) {
        abc();
    }
}

void abc() {
    printf("Enter : ");
    scanf("%d", &i);
}
```

  #### 1.7.3 Definitions and Declarations

```c
int i = 1;

int main() {
    extern int i;
}
```

  - The first declaration is called a **defining declaration**
  - It reserves storage space for the variable and constitutes the variable’s definition
- The second declaration is called a **referencing declaration**
  - It only tells the compiler to use the previously created variable, so it is not a definition
- `extern` indicates that the declaration is not a definition, because it instructs the compiler to look elsewhere for its definition

### 1.8 Internally Linked Static Variables

- Static variables with internal linkage have static storage duration, file scope, and internal linkage
- Variables defined outside all functions using the storage class specifier `static` have this storage class: `

```c
static int i = 1;
int main() {
    extern int i;
}
```

  ` - Previously known as **external static variables**, they are now called **static variables with internal linkage**

### 1.9 Multi-file

- C achieves variable sharing by making a declarative declaration in one file and a referential declaration in another
- Except for declarative declarations, all other declarations must use the `extern` keyword

### 1.10 Storage Class Specifiers

- The C language has 6 keywords that serve as storage class specifiers
  - auto
  - register
  - static
  - extern
  - \_Thread\_local
  - typedef

### 1.11 Storage Class and Functions

- C99 introduced inline functions
- External functions can be accessed by functions in other files, but static functions are only available within the file where they are defined

```
int abc() {
    
}

static int def() { // 其他文件不能调用
    
}

extern int ghi() {
    
}
```

  ## 2. Random Number Functions and Static Variables

- The `rand()` function generates random numbers

## 3. Rolling a Die

## 4. Allocating Memory: malloc() and free()

- The malloc() function allocates additional memory during program execution
  - Takes one argument: the number of bytes of memory required
  - The malloc() function locates a suitable block of memory; this memory is anonymous
  - However, it does return the address of the first byte of the dynamically allocated memory block
  - The return type of the `malloc()` function is typically defined as a pointer to `char`
  - The `malloc()` function can be used to return pointers to arrays, pointers to structures, etc.; typically, the function’s return value is cast to the appropriate type
  - If the `malloc()` function fails to allocate memory, it returns a null pointer `

```
int* i;
i = (int*) malloc (30 * sizeof(int));
```

  ` - Three methods for creating arrays
  - When declaring an array, use a constant expression to specify the array’s dimensions and access its elements via the array name
  - When declaring a variable-length array, use a variable expression to specify the array’s dimensions and access its elements via the array name
  - Declare a pointer, call `malloc()`, assign its return value to the pointer, and use the pointer to access the array’s elements
- The second and third methods can create **dynamic arrays**, allowing the array size and memory allocation to be determined at runtime

```
int a[n];
int* i;
i = (int*) malloc (n * sizeof(int));
```

  - Typically, malloc() must be used in conjunction with free()
- The argument to the free() function is the address returned by malloc() previously; this function releases the memory allocated by malloc()
- The lifetime of dynamically allocated memory spans from the call to `malloc()` that allocates the memory to the call to `free()` that releases it
- The argument to `free()` is a pointer
  - The pointer variable used by `free()` can be different from the one used by `malloc()`, but both pointers must point to the same address

```c
int* i;
i = (int*) malloc (30 * sizeof(int));
free(i);
```

  ### 4.1 The Importance of `free()`

- The amount of static memory is fixed at compile time and does not change during program execution
- The amount of memory used by automatic variables automatically increases or decreases during program execution
- However, the amount of dynamically allocated memory will only increase unless it is released using `free()`
- If dynamic allocation continues after all memory has been exhausted, the resulting problem is called a **memory leak**
  - Calling `free()` after memory is no longer needed prevents this problem

### 4.2 The `calloc()` Function

- Similar to `malloc()`
- It sets all bits in the block to 0
- The `free()` function can also be used to free memory allocated by `calloc()`

```c
int* i;
i = (int*) calloc (30, sizeof(int));
free(i);
```

  ### 4.3 Dynamic Memory Allocation and Variable-Length Arrays

- Similarities and differences between variable-length arrays (VLA) and malloc()

  - Similarities: Both can be used to create arrays whose size is determined at runtime
  - Differences:

    - Variable-length arrays are automatic storage class types; when the program exits the block where the variable-length array is defined, the memory occupied by the array is automatically released, so there is no need to use free()
    - Arrays created with `malloc()` are not restricted to being accessed within a single function

### 4.4 Dynamic Memory Allocation by Storage Class

- Static storage class: The amount of memory used is determined at compile time; data stored in this section remains accessible as long as the program is running

  - Created when the program starts executing and destroyed when the program ends
- Automatic storage class: Disappears when the program exits the block

  - Exists while the program calls functions and when functions end
  - Memory in this section is typically treated as a stack
  - Newly created variables are added to memory in order and then destroyed in reverse order
- Dynamically allocated memory exists when malloc() or related functions are called and is released after free() is called

  - This memory is managed by the programmer
  - Memory blocks can be created in one function and destroyed in another
    - Unused memory blocks are scattered among used memory blocks
    - Using dynamic memory is typically slower than using stack memory

## 5. ANSI C Type Qualifiers

- C90 introduced two new attributes: **constancy** and **volatility**
- These attributes can be declared using the keywords const and volatile, respectively; types created with these keywords are **qualified types**
- C99 introduced a third qualifier: restrict, used to improve compiler optimization
- C11 introduced a fourth qualifier: `_Atomic`
- C11 provides an optional library managed by `stdatomic.h` to support concurrent programming, and `_Atomic` is an optional feature
- C99 added a new property for type qualifiers: **idempotence**

```c
const const int i = 1; // 等效于 const int i = 1;

typedef const int a;
const a b = 8;
```

  ### 5.1 const Type Qualifier

```
const int i;
i = 1; // 报错

const int i = 1;
```

  #### 5.1.1 Using const in pointer and formal parameter declarations

```
const int* i;
// i 指向一个 int 类型的 const 值
// 可以设置该指针指向其他 const 值
```

  

```
int* const i;
// i 是一个 const 指针
// i 必须指向这个地址，但是地址的内容可以改变
```

  

```
const int* const i;
// i 既不能指向别处，它所指向的内容也不能改变
```

  

```
int const* i;
// 与 const int* i; 相同
```

  #### 5.1.2 Using const for global data

- Using global variables exposes data, allowing any part of the program to modify it
- const can prevent this risk
- You can create const variables, const arrays, and const structures
- When sharing `const` data across files, there are two methods to consider:
  - Method 1: Follow the standard rules for external variables: use declarative declarations in one file and referential declarations (using the `extern` keyword) in other files
  - Method 2: Place the `const` variable in a header file and include that header file in other files

### 5.2 The `volatile` Type Qualifier

- Informs the computer (not the program containing the variable) that the value of the variable may be modified
- Typically used for hardware addresses and for sharing data across other programs or concurrently running threads

```
volatile int i; // i 是一个易变的位置
volatile int* i; // i 是一个指向易变位置的指针
```

  

```
volatile int a;
volatile int b;
int i;

a = i;
{
    // 不使用 i 的代码块
}
b = i;
```

  - A smart compiler detects that `i` is used twice without any data modification
- Therefore, the compiler temporarily stores the value of `i` in a register and retrieves it from the register only when `b` needs to use `i`, to save time
- This process is called caching

### 5.3 The `restrict` Type Qualifier

- Allows the compiler to optimize certain parts of the code to better support computations
- It can only be used with pointers, indicating that the pointer is the sole and initial means of accessing the data object

```
int* restrict i = (int*) malloc (10 * sizeof(int));
```

  ### 5.4 The `_Atomic` Type Qualifier (C11)

- C11 provides several optional management methods by including the optional header files stdatomic.h and threads.h
- Atomic types are accessed through various macro functions
- When a thread performs an atomic operation on an atomic type object, other threads cannot access that object

```
int i;
i = 1;

_Atomic int i;
atomic_store(&i, 1);
// 在 i 种存储数据 1 的过程s，其他线程不能访问 i
```