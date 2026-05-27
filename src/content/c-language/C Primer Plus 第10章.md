#### 目录

- [1. 数组](#1__2)
- - [1.1 初始化数组](#11__27)
  - - [使用 const 声明数组](#_const__79)
  - [1.2 指定初始化器（C99）](#12_C99_85)
  - [1.3 给数组元素赋值](#13__115)
  - [1.4 数组边界](#14__133)
  - [1.5 指定数组的大小](#15__158)
- [2. 多维数组](#2__168)
- - [2.1 初始化二维数组](#21__180)
  - [2.2 其他多维数组](#22__220)
- [3. 指针和数组](#3__232)
- [4. 函数、数组和指针](#4__295)
- - [4.1 使用指针形参](#41__363)
  - [4.2 指针表示法和数组表示法](#42__406)
- [5. 指针操作](#5__417)
- - [解引用未初始化的指针](#_568)
- [6. 保护数组中的数据](#6__582)
- - [6.1 对形式参数使用 const](#61__const_617)
  - [6.2 const 的其他内容](#62_const__657)
- [7. 指针和多维数组](#7__710)
- - [7.1 指向多维数组的指针](#71__774)
  - [7.2 指针的兼容性（P262 有问题）](#72_P262__851)
  - - [最后一段](#_876)
  - [7.3 函数和多维数组](#73__899)
- [8. 变长数组（VLA）](#8_VLA_985)
- [9. 复合字面量](#9__1000)
- [问题](#_1049)

## 1. 数组

- 数组（array）是按顺序存储的一系列类型相同的值
- 整个数组有一个数组名，通过整数下标访问数组中单独的项或**元素（element）**
- **数组的下标从0开始**
- C编译器不会检查数组的下标是否正确

  ```
  int i[10];

  i[20] = 1;
  i[23] = 2;
  ```

  - 编译通过，但是会导致数据被放置在已被其他数据占用的地方，可能会破坏程序的结果甚至导致程序异常中断
- 用于识别数组元素的数字被称为**下标（subscript）**、**索引（indice）**或**偏移量（offset）**
- 数组中的元素被依次存储在内存中相邻的位置

### 1.1 初始化数组

- 只存储单个值得变量有时也称为**标量变量（scalar variable）**

```
int a[2] = { 1.0, 2.1 };
```

- 如果不初始化数组，数组元素和未初始化1得普通变量一样，其中存储的都是垃圾值
- 如果部分初始化数组，剩余的元素都会被初始化为0

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

- 可以省略方括号中的数字，让编译器自动匹配数组大小和初始化列表中的项数

```
int i = { 1, 2 };
```

#### 使用 const 声明数组

- 将数组设为只读，程序只能从数组中检索值

### 1.2 指定初始化器（C99）

- C99增加的一个新特性：**指定初始化器（designated initializer）**；利用该特性可以初始化指定的数组元素

```
int i[3] = { 0, 0, 1 };
// 等效于
int i[3] = { [2] = 1 };
```

- 指定初始化器的两个重要特性
  - 如果指定初始化器后面有更多的值，那么后面这些值将被用于初始化指定元素后面的元素
  - 如果在此初始化指定元素，那么最后的初始化将会取代之前的初始化

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

### 1.3 给数组元素赋值

- 声明数组后，可以借助数组下标（索引）给数组元素赋值

```
int i[2];
i[1] = 1;
```

- C不允许把数组作为一个单元赋给另一个数组，除初始化以外也不允许使用花括号列表的形式赋值

```
int i[2];
i = { 0, 1 }; // 错误
```

### 1.4 数组边界

- 使用数组时，要防止数组下标越界，编译器不会检查越界错误

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

### 1.5 指定数组的大小

- 在 C99 标准之前，声明数组时只能在方括号中使用**整型常量表达式**
  - 整型常量表达式：由整型常量构成的表达式
  - sizeof 表达式被视为整型常量，但是（与C++不同）const 值不是
  - 表达式的值必须大于0
- C99 创建了一种新型数组，称为**可变长数组（variable-length array）** 或简称 **VLA**

## 2. 多维数组

- 数组的数组，**主数组（master array）** 内含元素，元素是内含元素的数组

```
int ints[2][3];
// ints 是内含 2 个元素的数组
// 元素是一个内含 3 个 int 类型元素的数组
```

### 2.1 初始化二维数组

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

### 2.2 其他多维数组

- 三维数组

  ```
  int ints[4][3][2];
  ```
- 处理三维数组要使用 3 重嵌套循环，处理四维数组要使用 4 重嵌套循环

## 3. 指针和数组

- **简介见 第9章 7.指针简介**
- 数组名是数组首元素的地址

  ```
  int ints[2];
  ints == &ints[0];
  ```

  - 两者都是常量，在程序的运行过程中，不会改变
  - 可以把它们赋值给指针**变量**，然后可以修改指针变量的值

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

- 系统中地址按字节编址，int 类型占用 4 字节，double 类型占用 8 字节；在C中，指针加 1 指的是增加一个**存储单元**
  - 对数组而言，意味着加 1 后的地址是下一个**元素**的地址，而不是下一个字节的地址
- 即使指针指向的是标量变量，也要知道变量的类型，否则指针就无法正确地取回地址上的值

```
int ints[2];
ints + 1 == &ints[1];
*(ints + 1) == ints[1];
*(ints + n) == ints[n];
// 可以认为 *(ints + n) 的意思是“到内存的 ints 位置，然后移动 n 个单元，检索存储在那里的值”
```

- 可以使用指针表示数组的元素和获得元素的值
- 从本质上来说，同一个对象由两种表示法

  - 指针表示法
  - 数组表示法
- 实际上，C 语言标准在描述数组表示法时确实借助了指针

## 4. 函数、数组和指针

- 使用函数计算数组中元素之和

  - 利用数组传入

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
  - 利用指针传入

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
  - 只有在函数原型或函数定义头中，以上两种方式才可相互替换

### 4.1 使用指针形参

- 函数要处理数组需要知道何时开始，何时结束
  - 一种方法：传入数组和数组大小
  - 另一种方法：传入数组的开始处和结束处指针

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

### 4.2 指针表示法和数组表示法

- 指针表示法：
  - 更接近机器语言
  - 一些编译器在编译时能生成效率更高的代码
- 数组表示法：
  - 让函数是处理数组的意图更加明显
  - 许多其他语言的程序员对数组表示法更熟悉

## 5. 指针操作

- 基本的指针操作

  - 赋值：把地址赋给指针

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = ints;
    i = &ints[2];
    ```
  - 解引用：\* 运算符给出指针指向地址上存储的值

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i = %#x, *i = %d\n", i, *i);
    ```
  - 取址：指针变量有自己的地址和值

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i = %#x, *i = %d, &i = %#x\n", i, *i, &i);
    // 指针的值是一个地址
    ```
  - 指针与整数相加：整数和指针所指向类型的大小（以字节为单位）相乘，然后把结果与初始地址相加

    - 如果相加的结果超出了初始指针指向的数组范围，计算结果则是未定义的
    - 除非正好超过数组末尾第一个位置，C保证该指针有效

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i     = %#x, *i       = %d\n", i, *i);
    printf("i + 2 = %#x, *(i + 2) = %d\n", i + 2, *(i + 2));
    ```
  - 递增指针：递增指向数组元素的指针可以让该指针移动至数组的下一个元素

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i   = %#x, *i   = %d\n", i, *i);

    i++;

    printf("i++ = %#x, *i++ = %d\n", i, *i);
    ```
  - 指针减去一个整数：整数和指针所指向类型的大小（以字节为单位）相乘，然后初始地址减去结果

    - 如果相减的结果超出了初始指针指向的数组范围，计算结果则是未定义的
    - 除非正好超过数组末尾第一个位置，C保证该指针有效

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i     = %#x, *i       = %d\n", i, *i);
    printf("i - 2 = %#x, *(i - 2) = %d\n", i - 2, *(i - 2));
    ```
  - 递减指针：递减指向数组元素的指针可以让该指针移动至数组的上一个元素

    ```c
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* i;

    i = &ints[2];

    printf("i   = %#x, *i   = %d\n", i, *i);

    i--;

    printf("i-- = %#x, *i-- = %d\n", i, *i);
    ```
  - 指针求差：计算两个指针的差值

    - 通常，求差的两个指针分别指向同一个数组的不同元素，通过计算求出两个元素之间的距离
    - 差值的单位与数组类型的单位相同

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
  - 比较：使用关系运算符可以比较两个指针的值

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
- 指针移动的步长由当前指针变量的形式决定

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

### 解引用未初始化的指针

- **不要解引用未初始化的指针**

```
int* i;
*i = 1;
```

- 创建一个指针时，系统只分配了存储指针本身的内存，并未分配存储数据的内存
- 因此，在使用指针之前，必须先用已分配的地址初始化它

## 6. 保护数组中的数据

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

- 虽然计算结果正确，但是修改了数组中的元素

### 6.1 对形式参数使用 const

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

- 发生对只读对象进行修改的操作时，编译器会捕获这个错误，并生成一条错误信息
- 如果编写的函数需要修改数组，在声明数组形参时则不使用 const
- 如果编写的函数不需要修改数组，在声明数组形参时最好使用 const

### 6.2 const 的其他内容

- 使用 #define 指令可以创建类似功能的符号常量，但是 const 的用法更加灵活
- 可以创建 const 数组、const 指针和指向 const 的指针
- 关于指针赋值和 const 需要注意的规则：

  - 普通数据可以赋给 const 数据，但是 const 数据不可以赋给普通数据

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
  - 声明并初始化一个不能指向别处的指针

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    int* const i_const = ints;

    i_const = &ints[2];
    // 报错

    *i_const = 10;
    ```
  - 创建指针时可以使用 const 两次，该指针既不能更改也不能指向别处

    ```
    int ints[5] = { 1, 3, 5, 7, 9 };
    const int* const const_i_const = ints;

    const_i_const = &ints[2];
    // 报错

    const_i_const = 10;
    // 报错
    ```

## 7. 指针和多维数组

```
int ints[4][2];
```

- 对上方多维数组的指针属性分析

  - ints 和 ints[0] 的值相同

    ```
    ints == &ints[0];
    ints[0] == &ints[0][0];

    // ints[0] 是占用 1 个 int 大小对象的地址
    // ints 是占用 2 个 int 大小对象的地址
    ```
  - 给指针或地址加 1，其值会增加对应类型大小的数值

    ```
    ints + 1 != ints[0] + 1;
    ```
  - 解引用一个指针或在数组名后使用带下标的 [] 运算符，得到引用对象代表的值

    ```
    *(ints[0]) == ints[0][0];

    ints[0] == &ints[0][0];

    *ints == ints[0];

    *ints == &ints[0][0];

    **ints == ints[0][0];
    ```

    - ints 是地址的地址，必须解引用两次才能获得原始值
    - 地址的地址或指针的指针就是**双重间接（double indirection）** 的例子

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

- 数组地址、数组内容和指针之间关系的视图（P261）

### 7.1 指向多维数组的指针

```
int (*i)[2];
// 一个指向于内含 2 个 int 类型元素的数组的指针

int* i[2];
// 一个指向于内含 2 个 int 类型指针元素的数组

int** i;
// 一个指向指针的指针
```

- 二维数组利用指针遍历

  - 看成一维数组

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
  - 使用二维数组特性

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

### 7.2 指针的兼容性（P262 有问题）

- 变量可以进行类型转换，指针可以进行类型转换（会被无效）

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

#### 最后一段

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

### 7.3 函数和多维数组

- 行求和

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

- 列求和

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

## 8. 变长数组（VLA）

- C99 新增了**变长数组（variable-length array, VLA）**，允许使用变量表示数组的维度

```
int a = 4;
int b = 2;
int ints[a][b];
```

- 变长数组不能改变大小，只是在创建数组时，可以使用变量指定数组的维度
- 变长数组允许动态内存分配，可以在程序运行时指定数组的大小

## 9. 复合字面量

- C99 新增了**复合字面量（compound literal）**
- 字面量时除符号常量外的常量

  - 5 是 int 类型字面量
  - 1.2 是 double 类型字面量
  - ‘a’ 是 char 类型字面量
  - “abc” 是 字符串类型字面量
- 创建

  ```
  int ints[3] = { 1, 2, 3 };

  (int [3]) { 1, 2, 3 };
  // 复合字面量
  // 匿名数组
  ```
- 忽略大小

  ```
  int ints[] = { 1, 2, 3 };

  (int []) { 1, 2, 3 };
  ```
- 不能先创建然后使用，必须在创建时使用

  ```
  int* i;
  i = (int [3]) { 1, 2, 3 };
  ```
- 作为实际参数传参

  ```
  sum((int [3]) { 1, 2, 3 });
  ```
- 复合字面量是提供临时需要的值的一种手段

  - 复合字面量具有块作用域，这意味着一旦离开定义复合字面量的块，程序将无法保证该字面量是否存在
  - 复合字面量的定义在最内层的花括号中

## 问题

- 对

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

- 错：循环不停止

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