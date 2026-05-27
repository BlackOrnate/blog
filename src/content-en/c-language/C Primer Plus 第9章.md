#### Catalog

- [1. Introduction to Functions](#1__2)
- [1.1 Creating and Using Simple Functions](#11__11)
  - [1.2 Analyzing Programs](#12__41)
  - [1.3 Function Arguments](#13__51)
  - [1.4 Defining Functions with Formal Arguments](#14__69)
  - [1.5 Calling functions with real arguments](#15__87)
  - [1.6 The black box perspective](#16__97)
  - [1.7 Using return to return values from functions](#17__return__104)
  - [1.8 Function types](#18__130)
  - [1.9 All C functions are equal](#19_C_137)
- [2. ANSI C function prototypes](#2_ANSI_C__146)
- [Different from original book, write your own](#_148)
- [3. Recursion](#3__164)
- [3.1 Tail recursion](#31__170)
  - [3.2 Advantages and disadvantages of recursion](#32__220)
- [4. Compiling programs with multiple source files](#4__229)
- [4.1 UNIX](#41_UNIX_235)
  - [4.2 Linux](#42_Linux_251)
  - [4.3 DOS command-line compiler](#43_DOS__267)
  - [4.4 Windows and Apple IDE compilers](#44_Windows__IDE__275)
  - [4.5 Using header files](#45__284)
- [5. Finding addresses: the & operator](#5__317)
- [6. Changing variables in the caller function](#6__329)
- [7. Introduction to pointers](#7__349)
- [7.1 Indirect operators: \*](#71__355)
  - [7.2 Declaring pointers](#72__367)
  - [7.3 Using Pointers to Communicate Between Functions](#73__387)

## 1. Introduction to Functions

- A function is a separate unit of program code that accomplishes a specific task.
- Reasons for using functions
  - Functions save time in writing repetitive code.
  - Functions make the program more modular, thus improving the readability of the program code, more convenient for later modification, improvement

### 1.1 Creating and Using Simple Functions

```c
#include <stdio.h>
// 函数原型
void ABC();
int main() {
    ABC();	// 函数调用
}
// 函数定义
void ABC() {
    printf("ABC\n");
}

// 等价于

#include <stdio.h>
// 函数原型
void ABC(void);
int main(void) {
    ABC();	// 函数调用
}
// 函数定义
void ABC(void) {
    printf("ABC\n");
}
```

### 1.2 Analyzing the program

- **function prototype**: tells the compiler the type of the function.
- **function call**: use the function here.
- ** function definition (function definition) **: specify the function to perform the operation

- function in the definition of the variable is a ** local variable (local variable) **, the variable belongs only to the function; can be used elsewhere in the program with the same name variable, will not cause name conflicts, is the same name of different variables

### 1.3 Function parameters

```c
#include <stdio.h>

void ABC(int);

int main() {
    ABC(1);
}

void ABC(int i) {
    printf("%d\n", i);
}
```

### 1.4 Defining functions with formal parameters

- Arguments declared at function definition time are called **formal arguments**.
- Formal arguments are also local variables that are private to the function.
- The body of the argument enclosed in parentheses is called the argument list.

```
void a(int i, char c)

// 等效于

void a(i, c)
int i;
char c;
```

### 1.5 Calling Functions with Real Arguments

- In a function form, the **actual argument** provides the value of the formal argument.
- A formal argument is a variable in a **called function**.
- The actual argument is a specific value assigned to the called function by the **calling function**.
- The actual parameter is a specific value that is assigned to the variable that is the formal parameter.
- Because the value used by the called function is copied from the calling function, whatever the called function does with the copied data will not affect the original data in the calling function.

### 1.6 The Black Box Perspective

- At the heart of black-box methods: function-private local variables.
- What happens in the black box is invisible to the calling function.

### 1.7 Using return to return values from functions

- The program that is used to test a function is sometimes referred to as a **driver** that calls a function.

```c
#include <stdio.h>

float ABC(int, int);

int main() {

    printf("%f\n", ABC('A', 'a'));
    // 65.000000
    printf("%f\n", ABC(1.11, 1.23));
    // 1.000000

}

float ABC(int i, int j) {
    return (i < j) ? i : j;
    printf("ABC");
}
```

### 1.8 Function types

- When declaring a function, the type of the function must be declared.
- The type of a function with a return value should be the same as the type of its return value, while a function without a return value should be declared as void.

### 1.9 All C functions are equal.

- Every function can call or be called by other functions.
- The main() function is special:
  - When the main() function is placed with other functions in the program, the first statement in the main() function is executed.
  - The main() function can also be called recursively by itself or by other functions.

## ANSI C Function Prototypes

### Unlike the original book, write your own

- The number of arguments in the argument list of a function call is only related to the function prototype.
- The function definition has nothing to do with the function prototype, the parameter types can be different, the number of parameters can be different, only the type of return value must be the same
- function call, only according to the prototype of the function type and number of parameters, to the function definition of the parameter transfer
  - According to the type and number of parameters of the function prototype, get the parameters when the function is called.
    - Called in accordance with the order from left to right to get the parameters
    - The data types of the parameters are converted one by one according to the data types in the function prototype.
  - The converted parameters are then passed into the function definition.
  - The function definition handles the incoming arguments.
    - Function definition handles incoming parameters Number of incoming parameters > number of required parameters: does not affect function use
    - Number of incoming parameters = number of required parameters: does not affect the function.
    - Number of incoming arguments < number of arguments required: the function uses other values from the **stack** to complete the missing data.

## 3. Recursion

- C allows a function to call itself, a process called **recursion**.

### 3.1 Tail recursion

- The simplest form of recursion is to place the recursion call at the end of the function. This form of recursion is called **tail recursion**.

```c
#include <stdio.h>

int value = 1;
int ABC(int);

int main() {

	int i = 0;

	printf("i = %d, value = %d\n", i, ABC(i));

}

int ABC(int i) {
	if (i >= 1)
	{
		value *= i;
		return ABC(i - 1);
	}
	else
	{
		return value;
	} 
}

// 优化

#include <stdio.h>

int ABC(int);

int main() {

	int i = 3;
	printf("i = %d, value = %d\n", i, ABC(i));

}

int ABC(int i) {
	return (i >= 1) ? i * ABC(i - 1) : 1;
}
```

### 3.2 Advantages and disadvantages of recursion

- Pros: recursion provides the simplest solution to some programming problems
- Disadvantages:
  - Some recursive algorithms can quickly consume a computer's memory resources.
  - Recursion is not easy to read and maintain

## 4. Compiling programs with multiple source code files

- The easiest way to use multiple functions is to put them all in the same file, and then compile the file as if it were a single function.

### 4.1 UNIX

```
cc file1.c file2.c
```

- This command compiles two files and generates an executable file named a.out and two target files named file1.o and file2.o, respectively

```
cc file1.c file2.o
```

- If file1.c has been changed and file2.c remains unchanged, you can use this command to compile the first file and merge it with the object code of the second file.

### 4.2 Linux

```
gcc file1.c file2.c
```

- This command compiles two files and generates an executable file named a.out and two target files named file1.o and file2.o respectively.

file1.o and file2.o.

- If file1.c has been changed and file2.c remains unchanged, you can use this command to compile the first file and merge it with the object code of the second file.

### 4.3 DOS Command Line Compiler

- Most DOS command-line compilers work similarly to the UNIX cc command.
- One difference is that object files have an .obj extension, not an .o extension.
- Some compilers produce intermediate files of assembly language or other specialized code instead of object code files.

### 4.4 Windows and Apple IDE compilers

- The compilers in the IDEs used on Windows and Macintosh systems are **project oriented** and have the following compiler features
- A **project** describes the resources used by a particular program.
- Resources include source code files

### 4.5 Using header files

- Test.c

```c
#include <stdio.h>
#include "Head.h"

int main() {
	int i = 3;
	printf("i = %d, value = %d\n", i, ABC(i));
}
```

- Achieve.c

```c
#include <stdio.h>
#include "Head.h"

int ABC(int i) {
	return (i >= 1) ? i * ABC(i - 1) : 1;
}
```

- Head.h

```
int ABC(int i);
```

## 5. Finding an address: the & operator

- **Pointer** is one of the most important concepts in C. It is used to store the address of a variable.
- The monadic & operator gives the address where the variable is stored

```c
int i = 1;
printf("i = %d, &i = %#x = %p\n", i, &i);
```

## 6. Changing Variables in a Calling Function

- Swap the values of two variables

```c
int a = 1;
int b = 2;
int i = 0;

printf("a = %d, b = %d\n", a, b);
i = b;
b = a;
a = i;
printf("a = %d, b = %d\n", a, b);
```

- If you want to exchange the values of two variables in the main call function through a function, you need to use the pointer

## 7. Introduction to Pointers

- A pointer is a variable (or data object) whose value is a memory address.

## 7.1 Indirect operators: \*

- The **indirection operator** can be used to obtain a value stored at an address; this operator is sometimes called the **dereferencing operator**.

```
i = &a;
j = *i;
// 等效于
j = a;
```

### 7.2 Declaring Pointers

- When declaring a pointer variable, you must specify the type of the variable to which the pointer refers.

  - Because different types of variables occupy different amounts of memory space, some pointer operations require knowledge of the size of the object being operated on.
  - In addition, the program must know the type of data stored at the specified address.

  ```
  int * a;			// a 是指向 int 类型变量的指针，*a 是 int 类型
  char * b;
  float * c, * d;
  ```
- The space between the pointer name and the \* is optional.

  - Programmers use spaces in declarations
  - Omit spaces when dereferencing variables

### 7.3 Using Pointers to Communicate Between Functions

```c
#include <stdio.h>

void change(int *, int *);

int main() {
	int a = 1;
	int b = 2;
	
	printf("a = %d, b = %d\n", a, b);
	change(&a, &b);
	printf("a = %d, b = %d\n", a, b);

}

void change(int * a, int * b) {
	int i;
	i = *b;
	*b = *a;
	*a = i;
}
```