#### Table of Contents

- [1. Arrays](#1__2)
- - [1.1 Initializing Arrays](#11__27)
  - - [Declaring Arrays with const](#_const__79)
  - [1.2 Specifying Initializers (C99)](#12_C99_85)
  - [1.3 Assigning Values to Array Elements](#13__115)
  - [1.4 Array Boundaries](#14__133)
  - [1.5 Specifying Array Size](#15__158)
- [2. Multidimensional Arrays](#2__168)
- - [2.1 Initializing Two-Dimensional Arrays](#21__180)
  - [2.2 Other Multidimensional Arrays](#22__220)
- [3. Pointers and Arrays](#3__232)
- [4. Functions, Arrays, and Pointers](#4__295)
- - [4.1 Using Pointer Parameters](#41__363)
  - [4.2 Pointer Notation and Array Notation](#42__406)
- [5. Pointer Operations](#5__417)
- - [Dereferencing Uninitialized Pointers](#_568)
- [6. Protecting Data in Arrays](#6__582)
- - [6.1 Using `const` with Formal Parameters](#61__const_617)
  - [6.2 Other Aspects of `const`](#62_const__657)
- [7. Pointers and Multidimensional Arrays](#7__710)
- - [7.1 Pointers to Multidimensional Arrays](#71__774)
  - [7.2 Pointer Compatibility (Issue on p. 262)](#72_P262__851)
  - - [Final Paragraph](#_876)
  - [7.3 Functions and Multidimensional Arrays](#73__899)
- [8. Variable-Length Arrays (VLA)](#8_VLA_985)
- [9. Compound Literals](#9__1000)
- [Issues](#_1049)

## 1. Arrays

- An array is a sequence of values of the same type stored in order
- The entire array has a name, and individual items or **elements** within the array are accessed via integer indices
- **Array indices start at 0**
- C compilers do not check whether array indices are valid (

  ```
  int i[10];

  i[20] = 1;
  i[23] = 2;
  ```

  ). - While the code may compile, this can result in data being placed in memory locations already occupied by other data, potentially corrupting program results or even causing the program to crash.
- The numbers used to identify array elements are called **subscripts**, **indices**, or **offsets**
- Elements in an array are stored sequentially in adjacent memory locations

### 1.1 Initializing Arrays

- Variables that store a single value are sometimes called **scalar variables**

```
int a[2] = { 1.0, 2.1 };
```

  - If an array is not initialized, its elements behave like uninitialized regular variables, storing garbage values
- If an array is partially initialized, the remaining elements are all initialized to 0

```c
#include <stdio.h>

int main() {
	int a[2];

	for (int i = 0; i < 2; i++)
	{
		printf("%d\n", a[i]);
	}
	// -858993460
	// -858993460

	a[0] = 1;

	for (int i = 0; i < 2; i++)
	{
		printf("%d\n", a[i]);
	}
	// 1
	// -858993460

	int b[2] = { 1 };

	for (int i = 0; i < 2; i++)
	{
		printf("%d\n", b[i]);
	}
	// 1
	// 0
}
```

  - You can omit the number inside the square brackets, allowing the compiler to automatically match the array size to the number of items in the initialization list

```
int i = { 1, 2 };
```

  #### Declaring Arrays with `const`

- Sets the array to read-only; the program can only retrieve values from the array

### 1.2 Designated Initializers (C99)

- A new feature introduced in C99: **designated initializers**; this feature allows you to initialize specific array elements

```
int i[3] = { 0, 0, 1 };
// 等效于
int i[3] = { [2] = 1 };
```

  - Two important characteristics of designated initializers
  - If there are more values following a designated initializer, those subsequent values will be used to initialize the elements following the designated element
  - If a designated element is initialized here, the final initialization will override the previous initialization

```c
#include <stdio.h>

int main() {
	int a[5] = { 0, 1,[3] = 3, 4,[1] = 2 };

	for (int i = 0; i < 5; i++)
	{
		printf("%d ", a[i]);
	}
	// 0 2 0 3 4
}
```

  ### 1.3 Assigning Values to Array Elements

- After declaring an array, you can assign values to its elements using array subscripts (indices)

```
int i[2];
i[1] = 1;
```

  - C does not allow assigning an array as a single unit to another array, nor does it allow assignment using a list of curly braces except during initialization

```
int i[2];
i = { 0, 1 }; // 错误
```

  ### 1.4 Array Boundaries

- When using arrays, you must prevent out-of-bounds indexing; the compiler does not check for out-of-bounds errors

```c
#include <stdio.h>

int main() {
	int ints[5] = { 0, 1, 2, 3, 4 };
	int i;

	for ( i = -1; i < 5; i++)
	{
		ints[i] = i;
	}

	for (i = -1; i < 5; i++)
	{
		printf("ints[%d] = %d\n", i, ints[i]);
	}
}
```

  ### 1.5 Specifying Array Size

- Prior to the C99 standard, only **integer constant expressions** could be used within square brackets when declaring arrays
  - Integer constant expression: an expression consisting of integer constants
  - The `sizeof` expression is treated as an integer constant, but (unlike in C++) `const` values are not
  - The value of the expression must be greater than 0
- C99 introduced a new type of array called a **variable-length array (VLA)**

## 2. Multidimensional Arrays

- An array of arrays, where the **master array** contains elements that are themselves arrays of elements

```
int ints[2][3];
// ints 是内含 2 个元素的数组
// 元素是一个内含 3 个 int 类型元素的数组
```

  ### 2.1 Initializing a two-dimensional array

```c
#include <stdio.h>

int main() {
	int ints[2][3] = { { 1, 2 }, { 3, 4 } };
	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			printf("ints[%d][%d] = %d  ", i, j, ints[i][j]);
		}
		printf("\n");
	}
	// ints[0][0] = 1  ints[0][1] = 2  ints[0][2] = 0
	// ints[1][0] = 3  ints[1][1] = 4  ints[1][2] = 0
}
```

  

```c
#include <stdio.h>

int main() {
	int ints[2][3] = { 1, 2, 3, 4 };
	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			printf("ints[%d][%d] = %d  ", i, j, ints[i][j]);
		}
		printf("\n");
	}
	// ints[0][0] = 1  ints[0][1] = 2  ints[0][2] = 3
	// ints[1][0] = 4  ints[1][1] = 0  ints[1][2] = 0
}
```

  ### 2.2 Other multidimensional arrays

- Three-dimensional arrays

  ```
  int ints[4][3][2];
  ```

  - To process a three-dimensional array, use a triple nested loop; to process a four-dimensional array, use a quadruple nested loop

## 3. Pointers and Arrays

- **See Chapter 9, Section 7: Introduction to Pointers**
- An array name is the address of the first element of the array

  ```
  int ints[2];
  ints == &ints[0];
  ```

  - Both are constants and do not change during program execution
  - You can assign them to a pointer **variable**, and then modify the value of the pointer variable

```c
#include <stdio.h>

int main() {
	int ints[2];
	double doubles[2];

	int* i;
	double* d;

	i = ints;
	d = doubles;

	for (int index = 0; index < 2; index++)
	{
		printf("index = %d, int: %#x, double: %#x\n", index, i + index, d + index);
	}
	// index = 0, int: 0xf3fbc0, double: 0xf3fba8
	// index = 1, int: 0xf3fbc4, double: 0xf3fbb0
}
```

  - In the system, addresses are byte-addressable; an `int` type occupies 4 bytes, and a `double` type occupies 8 bytes. In C, incrementing a pointer by 1 means adding one **storage unit**
  - For arrays, this means that the address after incrementing by 1 is the address of the next **element**, not the address of the next byte
- Even if a pointer points to a scalar variable, you must know the variable’s type; otherwise, the pointer cannot correctly retrieve the value at that address

```
int ints[2];
ints + 1 == &ints[1];
*(ints + 1) == ints[1];
*(ints + n) == ints[n];
// 可以认为 *(ints + n) 的意思是“到内存的 ints 位置，然后移动 n 个单元，检索存储在那里的值”
```

  - You can use pointers to represent array elements and retrieve their values
- Essentially, the same object can be represented in two ways

  - Pointer representation
  - Array representation
- In fact, the C language standard does rely on pointers when describing array representation

## 4. Functions, Arrays, and Pointers

- Using a function to calculate the sum of elements in an array

  - Passing an array

    ```c
    #include <stdio.h>

    #define SIZE 5
    int sum(int[]);

    int main() {
    	int ints[SIZE] = { 1, 2, 3, 4, 5 };

    	int total = 0;

    	total = sum(ints, SIZE);

    	printf("total = %d\n", total);
    }

    int sum(int ints[], int size) {
    	int total = 0;

    	for (int i = 0; i < size; i++)
    	{
    		total += ints[i];
    	}

    	return total;
    }
    ```

  - Passing a pointer

    ```c
    #include <stdio.h>

    #define SIZE 5
    int sum(int*);

    int main() {
    	int ints[SIZE] = { 1, 2, 3, 4, 5 };

    	int total = 0;

    	total = sum(ints, SIZE);

    	printf("total = %d\n", total);
    }

    int sum(int* ints, int size) {
    	int total = 0;

    	for (int i = 0; i < size; i++)
    	{
    		total += ints[i];
    	}

    	return total;
    }
    ```

  - These two methods are interchangeable only within a function prototype or function definition header

### 4.1 Using Pointer Parameters

- For a function to process an array, it needs to know where the array starts and where it ends
  - One method: Pass the array and its size
  - Another method: Pass pointers to the start and end of the array

```c
#include <stdio.h>

#define SIZE 5
int sum(int*, int*);

int main() {
	int ints[SIZE] = { 1, 2, 3, 4, 5 };

	int total = 0;

	total = sum(ints, ints + SIZE);
    // ints + SIZE: 第 SIZE 个元素的尾地址 / 第 SIZE + 1 个元素的起始地址

	printf("total = %d\n", total);
}

int sum(int* start, int* end) {
	int total = 0;

	while (start < end)
	{
		
		total += *start;
		start++;
        // 可简化为
        total += *start++;
        
		printf("total = %d\n", total);
	}
	
	return total;
}
```

  ### 4.2 Pointer Notation and Array Notation

- Pointer notation:
  - Closer to machine language
  - Some compilers can generate more efficient code during compilation
- Array Notation:
  - Makes the function’s intent to process an array more obvious
  - Programmers from many other languages are more familiar with array notation

## 5. Pointer Operations

- Basic pointer operations

  - Assignment: Assigning an address to a pointer

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = ints;
    i = &ints[2];
    ```

  - Dereferencing: The \* operator returns the value stored at the address pointed to by the pointer

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i = %#x, *i = %d\n", i, *i);
    ```

  - Address-of: A pointer variable has its own address and value

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i = %#x, *i = %d, &i = %#x\n", i, *i, &i);
    // 指针的值是一个地址
    ```

  - Adding an integer to a pointer: Multiply the integer by the size of the type pointed to by the pointer (in bytes), then add the result to the initial address

    - If the result of the addition exceeds the bounds of the array pointed to by the initial pointer, the result is undefined
    - Unless the result exactly exceeds the first position past the end of the array, C guarantees that the pointer remains valid

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i     = %#x, *i       = %d\n", i, *i);
    printf("i + 2 = %#x, *(i + 2) = %d\n", i + 2, *(i + 2));
    ```

  - Incrementing a pointer: Incrementing a pointer to an array element moves the pointer to the next element in the array

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i   = %#x, *i   = %d\n", i, *i);

    i++;

    printf("i++ = %#x, *i++ = %d\n", i, *i);
    ```

  - Subtracting an integer from a pointer: Multiply the integer by the size of the type pointed to by the pointer (in bytes), then subtract the result from the initial address

    - If the result of the subtraction exceeds the range of the array pointed to by the initial pointer, the result is undefined
    - Unless the result exactly exceeds the first position after the end of the array, C guarantees that the pointer remains valid

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i     = %#x, *i       = %d\n", i, *i);
    printf("i - 2 = %#x, *(i - 2) = %d\n", i - 2, *(i - 2));
    ```

  - Decrementing a pointer: Decrementing a pointer to an array element moves the pointer to the previous element in the array

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i   = %#x, *i   = %d\n", i, *i);

    i--;

    printf("i-- = %#x, *i-- = %d\n", i, *i);
    ```

  - Calculating the difference between pointers: Calculating the difference between two pointers

    - Typically, the two pointers being compared point to different elements of the same array, and the difference is calculated to determine the distance between the two elements
    - The unit of the difference is the same as the unit of the array type

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;
    int* j;

    i = &ints[2];
    j = &ints[4];

    printf("j     = %#x, *j     = %d\n", j, *j);
    printf("i     = %#x, *i     = %d\n", i, *i);

    printf("j - i = %d\n", j - i);
    ```

  - Comparison: Relational operators can be used to compare the values of two pointers

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;
    int* j;

    i = &ints[2];
    j = &ints[4];

    printf("j     = %#x, *j     = %d\n", j, *j);
    printf("i     = %#x, *i     = %d\n", i, *i);

    printf("j > i = %d\n", j > i);
    ```

  - The step size of pointer movement is determined by the form of the current pointer variable

  ```
  int* i;
  // 步长: 1 个 int 类型长度

  int** i;
  // 步长: 1 个 int 类型长度

  int(*i)[2];
  // 步长: 2 个 int 类型长度

  int* a;
  int(*b)[2] = a;
  // 步长: 2 个 int 类型长度
  ```

  ### Dereferencing an Uninitialized Pointer

- **Do not dereference an uninitialized pointer**

```
int* i;
*i = 1;
```

  - When a pointer is created, the system only allocates memory for the pointer itself, not for the data it points to
- Therefore, before using a pointer, it must first be initialized with an allocated address

## 6. Protecting Data in Arrays

```c
#include <stdio.h>

#define SIZE 5
int sum(int*);

int main() {
	int ints[SIZE] = { 1, 3, 5, 7, 9 };

	int total = 0;

	total = sum(ints, SIZE);

	printf("total = %d\n", total);
}

int sum(int* ints, int size) {
	int total = 0;

	for (int i = 0; i < size; i++)
	{
		total += ints[i]++;
		printf("ints[%d] = %d\n", i, ints[i]);
	}

	return total;
}
```

  - Although the calculation result is correct, elements in the array have been modified

### 6.1 Using const for Formal Parameters

```c
#include <stdio.h>

#define SIZE 5
int sum(const int*);

int main() {
	int ints[SIZE] = { 1, 3, 5, 7, 9 };

	int total = 0;

	total = sum(ints, SIZE);

	printf("total = %d\n", total);
}

int sum(const int* ints, int size) {
	int total = 0;

	for (int i = 0; i < size; i++)
	{
		total += ints[i]++;
		printf("ints[%d] = %d\n", i, ints[i]);
	}

	return total;
}
```

  - When an operation attempts to modify a read-only object, the compiler catches this error and generates an error message
- If the function you are writing needs to modify an array, do not use const when declaring the array formal parameter
- If the function you are writing does not need to modify the array, it is best to use `const` when declaring the array formal parameter

### 6.2 Other aspects of `const`

- You can use the `#define` directive to create symbolic constants with similar functionality, but `const` offers greater flexibility
- You can create `const` arrays, `const` pointers, and pointers to `const`
- Rules to note regarding pointer assignment and `const`:

  - Non-const data can be assigned to const data, but const data cannot be assigned to non-const data

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    const int const_ints[5] = { 1, 3, 5, 7, 9 };

    int* i = ints;
    const int* const_i = ints;

    i = const_ints;
    // 无效
    i = &ints[2];

    const_i = const_ints;
    const_i = &ints[2];
    ```

  - Declare and initialize a pointer that cannot point to another location

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* const i_const = ints;

    i_const = &ints[2];
    // 报错

    *i_const = 10;
    ```

  - When creating a pointer, you can use `const` twice; this pointer cannot be modified and cannot point to another location

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    const int* const const_i_const = ints;

    const_i_const = &ints[2];
    // 报错

    const_i_const = 10;
    // 报错
    ```

  ## 7. Pointers and Multidimensional Arrays

```
int ints[4][2];
```

  - Analysis of the pointer properties of the multidimensional array above

  - The values of `ints` and `ints[0]` are the same

    ```
    ints == &ints[0];
    ints[0] == &ints[0][0];

    // ints[0] 是占用 1 个 int 大小对象的地址
    // ints 是占用 2 个 int 大小对象的地址
    ```

  - Adding 1 to a pointer or address increases its value by the size of the corresponding type

    ```
    ints + 1 != ints[0] + 1;
    ```

  - Dereferencing a pointer or using the subscripted `[]` operator after an array name yields the value represented by the object

    ```
    *(ints[0]) == ints[0][0];

    ints[0] == &ints[0][0];

    *ints == ints[0];

    *ints == &ints[0][0];

    **ints == ints[0][0];
    ```

  - `ints` is an address of an address; it must be dereferenced twice to obtain the original value
    - An address of an address, or a pointer to a pointer, is an example of **double indirection**

```c
#include <stdio.h>

int main() {
	int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };

	printf("ints       : %#x\n", &ints);
	for (int i = 0; i < 4; i++)
	{
		printf("ints[%d]    : %#x\n", i, &ints[i]);
		for (int j = 0; j < 2; j++)
		{
			printf("ints[%d][%d] : %#x ", i, j, &ints[i][j]);
		}
		printf("\n");
	}
}
```

  - A visual representation of the relationship between array addresses, array contents, and pointers (P261)

### 7.1 Pointers to Multidimensional Arrays

```
int (*i)[2];
// 一个指向于内含 2 个 int 类型元素的数组的指针

int* i[2];
// 一个指向于内含 2 个 int 类型指针元素的数组

int** i;
// 一个指向指针的指针
```

  - Iterating through a two-dimensional array using pointers

  - Treating it as a one-dimensional array

    ```c
    #include <stdio.h>

    void see(int**, int**);

    int main() {
    	int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
    	see(ints, ints + 4);
    }

    void see(int** start, int** end) {

    	while (start < end)
    	{
    		printf("%d : %#x\n", *start, start);

    		start++;
    	}
    }
    ```

  - Using two-dimensional array features

    ```c
    #include <stdio.h>

    void see(int*[2], int*[2]);

    int main() {
    	int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
    	see(ints, ints + 4);
    }

    void see(int(*start)[2], int(*end)[2]) {

    	int* i;

    	while (start < end)
    	{
    		i = start;

    		printf("%#x : %#x : %d\n", start, *start, **start);
    		// start  与 *start 不等价
    		// start  是 ints[0]    ints[1]    ints[2]    ints[3]    ints[4] 的地址
    		// *start 是 ints[0][0] ints[1][0] ints[2][0] ints[3][0] ints[4][0] 的地址

    		printf("%#x : %d\n", i, *i);
    		printf("%#x : %d\n", i + 1, *(i + 1));

    		start++;

    		printf("\n");
    	}
    }
    ```

  ### 7.2 Pointer Compatibility (Issue on p. 262)

- Variables can be type-casted; pointers can be type-casted (but will be invalid)

```c
int i = 1;
float f = 2.0;

int* i_po = &i;
float* f_po = &f;

printf("f     = %f, i     = %d\n", f, i);
printf("f_po  = %#x, i_po  = %#x\n", f_po, i_po);
printf("*f_po = %f, *i_po = %d\n", *f_po, *i_po);

f_po = i_po;
// 无效清零

printf("f     = %f, i     = %d\n", f, i);
printf("f_po  = %#x, i_po  = %#x\n", f_po, i_po);
printf("*f_po = %f, *i_po = %d\n", *f_po, *i_po);
```

  #### Last paragraph

```c
#include <stdio.h>

int main() {
    int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };

    printf("ints: %#x\n", &ints);

    int** i1;
    i1 = ints;
    printf("i1  = %#x\n", i1);

    int(*i2)[2];
    i2 = ints;
    printf("i2  = %#x\n", i2);

}
```

  ### 7.3 Functions and Multidimensional Arrays

- Row summation

```c
#include <stdio.h>

void see(int*[2], int*[2]);

int main() {
	int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
	see(ints, ints + 4);
}

void see(int(*start)[2], int(*end)[2]) {

	int n = 1;
	int* i;

	while (start < end)
	{
		i = start;

		printf("第%d行求和为%d\n", n, *i + *(i + 1));

		n++;
		start++;

		printf("\n");
	}
}
```

  - Column summation

```c
#include <stdio.h>

void see(int*[2], int*[2]);

int main() {
	int ints[4][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
	see(ints, ints + 4);
}

void see(int(*start)[2], int(*end)[2]) {

	int* i  = start;
	int n = 1;
	int sum = 0;
	int count = 1;

	while (start < end)
	{
		sum += **start;

		if (count == 4)
		{
			printf("第%d列求和为%d\n", n, sum);

			if (n != 2)
			{
				count = 1;
				sum = 0;
				n++;
				i++;
				start = i;
			}
			else
			{
				break;
			}
			
		}
		else {
			count++;
			start++;
		}
	}
}
```

  ## 8. Variable-Length Arrays (VLA)

- C99 introduced **variable-length arrays (VLA)**, allowing variables to represent the dimensions of an array

```
int a = 4;
int b = 2;
int ints[a][b];
```

  - Variable-length arrays cannot change size; however, variables can be used to specify the array’s dimensions at creation time
- Variable-length arrays allow for dynamic memory allocation, meaning the array size can be specified at runtime

## 9. Compound Literals

- C99 introduced **compound literals**
- Literals are constants other than symbolic constants

  - 5 is an int literal
  - 1.2 is a double-type literal
  - ‘a’ is a char-type literal
  - “abc” is a string-type literal
- Creating:

  ```
  int ints[3] = { 1, 2, 3 };

  (int [3]) { 1, 2, 3 };
  // 复合字面量
  // 匿名数组
  ```

  - Ignoring size:

  ```
  int ints[] = { 1, 2, 3 };

  (int []) { 1, 2, 3 };
  ```

  - Cannot be created and then used later; must be used at the time of creation:

  ```
  int* i;
  i = (int [3]) { 1, 2, 3 };
  ```

  - Passing as actual arguments:

  ```
  sum((int [3]) { 1, 2, 3 });
  ```

  - Compound literals are a means of providing values needed temporarily

  - Compound literals have block scope, which means that once you leave the block where the compound literal is defined, the program cannot guarantee that the literal exists
  - The definition of a compound literal is within the innermost curly braces

## Problems

- For

```c
#include <stdio.h>

void see(int*, int*);

int main() {
	int ints[5] = { 1, 3, 5, 7, 9 };
	see(ints, ints + 5);
}

void see(int* start, int* end) {
	while (start < end)
	{
		printf("%d\n", *start);

		start++;
	}
}
```

  - Incorrect: The loop does not stop

```c
#include <stdio.h>

void see(int*);

int main() {
	int ints[5] = { 1, 3, 5, 7, 9 };
	see(ints);
}

void see(int* ints) {
	while (ints < ints + 5)
	{
		printf("%d\n", *ints);
		ints++;
	}
}
```