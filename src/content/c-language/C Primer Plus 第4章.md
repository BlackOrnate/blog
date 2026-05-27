#### 目录

- [1. 字符串简介](#1__2)
- - [1.1 char类型数组和null字符](#11_charnull_4)
  - [1.2 使用字符串](#12__26)
  - - [字符串和字符](#_42)
  - [1.3 strlen()函数](#13_strlen_51)
- [2. 常量和C预处理器](#2_C_72)
- - [2.1 const 限定符](#21_const__98)
  - [2.2 明示常量](#22__109)
- [3. printf()和scanf()](#3_printfscanf_157)
- - [3.1 printf()函数](#31_printf_166)
  - [3.2 使用printf()](#32_printf_190)
  - [3.3 printf()的转换说明修饰符](#33_printf_204)
  - - [使用修饰符和标记的示例](#_230)
  - [3.4 转换说明的意义](#34__286)
  - - [3.4.1 转换不匹配](#341__288)
    - - [参数传递](#_317)
    - [3.4.2 printf()的返回值](#342_printf_339)
    - [3.4.3 打印较长的字符串](#343__345)
  - [3.5 使用scanf()](#35_scanf_364)
  - - [3.5.1 从scanf()角度看输入（坑）](#351_scanf_417)
    - [3.5.2 格式字符串中的普通字符（内存原理未知）](#352__448)
    - [3.5.3 scanf() 的返回值](#353_scanf__469)
  - [3.6 printf() 和 scanf() 的 \* 修饰符](#36_printf__scanf____475)
  - [3.7 printf()的用法提示](#37_printf_514)

## 1. 字符串简介

### 1.1 char类型数组和null字符

- C语言没有专门用于存储字符串的变量类型，字符串都被存储在 char 类型的数组中
- 数组由连续的存储单元组成，字符串中的字符被存储在相邻的存储单元中，每个单元存储一个字符

| a |  | b | c | \0 |
| --- | --- | --- | --- | --- |
|  | 每个储存单元1字节 |  |  | 空字符 |

- \0：空字符（null character），C语言用它标记**字符串的结束**
- 数组的容量必须比待存储字符串中的字符数多1

```
char c;
// 分配1个字节

char c[5];
// 分配5个字节
```

### 1.2 使用字符串

- C语言使用 %s 打印字符串

```c
#include <stdio.h>

int main() {
	char c[5] = "abc";

	printf("%s\n", c);
}
```

#### 字符串和字符

| 字符（‘a’） | 字符串（“a”） |
| --- | --- |
| 基本类型（char） | 派生类型（char 数组） |
| 1个字符组成（‘a’） | 2个字符组成（‘a’ 和 \0） |

### 1.3 strlen()函数

- strlen()函数：给出字符串中的字符长度

```c
#include <stdio.h>
#include <string.h>
// 提供 strlen() 函数的原型

int main() {
	char c[5] = "abc";

	printf("length of %s is %zd\n", c, strlen(c));
	// length of abc is 3
}
```

- strlen() 函数知道在何处停止，不会将空字符计入

## 2. 常量和C预处理器

- 使用符号常量（symbolic constant），只需更改符号常量的定义，不用在程序中查找使用常量的地方，然后逐一修改
- 创建符号常量

  - 声明变量，并将其赋值

    ```
    int i = 1;
    ```

    - 问题：程序可能无意间改变变量的值
  - C预处理器

    ```c
    #define i 1
    ```

    - 程序中所有的 i 都会被替换成 1，这一过程被称为编译时替换（compile-time substitution）
    - 在运行程序时，程序中所有的替换均已完成
    - 这样定义的常量也被称为明示常量（manifest constant）

### 2.1 const 限定符

- C90新增 const 关键字，用于限定一个变量为只读
- 只读：可以计算、打印，无法修改

```
const int i = 1;
```

### 2.2 明示常量

- limits.h：提供与整数类型大小限制相关的详细信息

| 明示常量 | 含义 |
| --- | --- |
| CHAR\_BIT | char 类型的位数 |
| CHAR\_MAX | char 类型的最大值 |
| CHAR\_MIN | char 类型的最小值 |

- 可将以上的 CHAR 替换成其他常量名

| 明示常量 | 含义 |
| --- | --- |
| CHAR | char 类型 |
| SCHAR | signed char 类型 |
| UCHAR | unsigned char 类型 |
| SHRT | short 类型 |
| USHRT | unsigned char 类型 |
| INT | int 类型 |
| UINT | unsigned int 类型 |
| LONG | long 类型 |
| ULONG | unsigned long 类型 |
| LLONG | long long 类型 |
| ULLONG | unsigned long long 类型 |

- float.h：提供与浮点数类型大小限制相关的详细信息

| 明示常量 | 含义 |
| --- | --- |
| FLT\_MANT\_DLG | float 类型的尾数位数 |
| FLT\_DIG | float 类型的最少有效数字位数（十进制） |
| FLT\_MIN\_10\_EXP | 带全部有效数字的 float 类型的最小负指数（以10为底） |
| FLT\_MAX\_10\_EXP | float 类型的最大正指数（以10为底） |
| FLT\_MIN | 保留全部精度的 float 类型最小正数 |
| FLT\_MAX | float 类型的最大正数 |
| FLT\_EPSILON | 1.00和比1.00大的最小float类型值之间的差值 |

- 可将以上的 FLT 替换成其他常量名

| 明示常量 | 含义 |
| --- | --- |
| FLT | float 类型 |
| DBL | double 类型 |
| LDBL | long double 类型 |

## 3. printf()和scanf()

- I/O 函数
- printf()：输出函数
- scanf()：输入函数

### 3.1 printf()函数

| 转换说明 | 输出 |
| --- | --- |
| %a | 浮点数、十六进制数和 p 记数法（C99 / C11） |
| %A | 浮点数、十六进制数和 p 记数法（C99 / C11） |
| %c | 单个字符 |
| %d | 有符号十进制整数 |
| %e | 浮点数，e 记数法 |
| %E | 浮点数，E 记数法 |
| %f | 浮点数，十进制记数法 |
| %g | 根据值的不同，自动选择 %f 或 %e；%e 格式用于指数小于 -4 或者大于或等于精度 |
| %G | 根据值的不同，自动选择 %f 或 %E；%E 格式用于指数小于 -4 或者大于或等于精度 |
| %i | 有符号十进制整数（与 %d 相同） |
| %o | 无符号八进制整数 |
| %p | 指针 |
| %s | 字符串 |
| %u | 无符号十进制整数 |
| %x | 无符号十六进制整数，使用十六进制数 0f |
| %X | 无符号十六进制整数，使用十六进制数 0F |
| %% | 打印一个百分号 |

### 3.2 使用printf()

```c
#include <stdio.h>
#define i 10

int main() {
	printf("%c %d %%\n", '$', 2 * i);
	// $ 20 %
}
```

### 3.3 printf()的转换说明修饰符

| 修饰符 | 含义 | 示例 |
| --- | --- | --- |
| 标记 | 标记 | “%-10d” |
| 数字 | 最小字段宽度 如果该字段不能容纳待打印的数字或字符串，系统会使用更宽的字段 | “%4d” |
| .数字 | 精度 对于 %e、%E 和 %f 转换，表示小数点右边数字的位数 对于 %g 和 %G 转换，表示有效数字最大位数 对于 %s 转换，表示待打印字符的最大数量 对于整型转换，表示待打印数字的最小位数 | "%5.2f"打印一个浮点数 字段宽度为5字符，其中小数点后有2位数字 |
| h | 和整型转换说明一同使用，表示 short int 或 unsigned short int 类型的值 | “%hu”，"%hx"，"%6.4hd" |
| hh | 和整型转换说明一同使用，表示 signed char 或 unsigned char 类型的值 | “%hhu”，"%hhx"，"%6.4hhd" |
| j | 和整型转换说明一同使用，表示 intmax\_t 或 uintmax\_t 类型的值 这些类型定义在stdint.h中 | “%jd”，"%8jx" |
| l | 和整型转换说明一同使用，表示 long int 或 unsigned long int 类型的值 | “%ld”，"%8lu" |
| ll | 和整型转换说明一同使用，表示 long long int 或 unsigned long long int 类型的值（C99） | “%lld”，"%8llu" |
| L | 和浮点转换说明一同使用，表示 long double 类型的值 | “%Lf”，"%10.4Le" |
| t | 和整型转换说明一同使用，表示 ptrdiff\_t 类型的值 ptrdiff\_t 是2个指针差值的类型（C99） | “%td”，"%12ti" |
| z | 和整型转换说明一同使用，表示 size\_t 类型的值 size\_t 是 sizeof 返回的类型 | “%zd”，"%12zd" |

| 标记 | 含义 | 示例 |
| --- | --- | --- |
| - | 待打印项左对齐，即从字段的左侧开始打印该项 | “%-20s” |
| + | 有符号值若为正，则在前面显示加号 有符号值若为负，则在前面显示减号 | “%+6.2f” |
| 空格 | 有符号值若为正，则在前面显示前导空格（不显示任何符号） 有符号值若为负，则在前面显示减号 | “% 6.2f” |
| # | 把结果转换为另一种形式 如果为 %o，则以 0 开始 如果为 %x 或 %X，则以 0x 或 0X 开始 对于所有的浮点格式，即使后面没有任何数字，也打印一个小数点字符 对于 %g 和 %G，防止结果后面的 0 被删除 | “%#o”，"%#8.0f"，"%+#10.3e" |
| 0 | 对于数值，用前导 0 代替空格填充字段宽度 对于整数格式，如果出现 - 标记或指定精度，则忽略该标记 | “%010d”，"%08.3f" |

#### 使用修饰符和标记的示例

```c
#include <stdio.h>

int main() {
	int i = 123;

	printf("%d\n", i);
	// 123

	printf("%2d\n", i);
	// 123

	printf("%5d\n", i);
	//   123

	printf("%-5d\n", i);
	// 123
}
```

```c
#include <stdio.h>

int main() {
	double d = 1.234;

	printf("%f\n", d);
	// 1.234000
	
	printf("%e\n", d);
	// 1.234000e+00
	
	printf("%4.2f\n", d);
	// 1.23
	
	printf("%3.1f\n", d);
	// 1.2

	printf("%10.3f\n", d);
	//      1.234

	printf("%10.3E\n", d);
	//  1.234E+00

	printf("%+4.2f\n", d);
	// +1.23
	
	printf("%010.2f\n", d);
	// 0000001.23
}
```

### 3.4 转换说明的意义

#### 3.4.1 转换不匹配

```c
#include <stdio.h>

int main() {
	int i = 336;
	int j = 65618;

	printf("short = %hd, unsigned short = %hu\n", i, i);
	// short = 336, unsigned short = 336

	printf("short = %hd, unsigned short = %hu\n", -i, -i);
	// short = -336, unsigned short = 65200

	printf("int = %d, char = %c\n", i, i);
	// int = 336, char = P
	// 336 = 256 + 80；80 = P

	printf("int = %d, short = %hd, char = %c\n", j, j, j);
	// int = 65618, short = 82, char = R
	// 65618 = 65536 + 82
	// 65618 = 256 * 256 + 82；82 = R

}
```

##### 参数传递

```c
#include <stdio.h>

int main() {
	float f = 1.0f;
	double d = 123456789.0;
	long l1 = 1, l2 = 1;

	printf("%ld %ld %ld %ld\n", f, d, l1, l2);
	// 0 1072693248 1409286144 1100836660
}
```

- 第一个 %ld 获取 f 的前 4 个字节
- 第二个 %ld 获取 f 的后 4 个字节
- 第三个 %ld 获取 d 的后 4 个字节
- 第四个 %ld 获取 d 的后 4 个字节

#### 3.4.2 printf()的返回值

- printf() 函数返回值为打印字符的个数

#### 3.4.3 打印较长的字符串

```c
#include <stdio.h>

int main() {
	printf("abc ");
	printf("ABC\n");

	printf("abc \
ABC\n");

	printf("abc "
			"ABC\n");
}
```

### 3.5 使用scanf()

| printf() | scanf() |
| --- | --- |
| 参数列表：变量、常量和表达式 | 指向变量的指针 |

- 如果用 scanf() 读取基本变量类型的值，在变量名前加上 &
- 如果用 scanf() 把字符串读入字符数组中，不要使用 &

```c
#include <stdio.h>

int main() {
	int i;
	float f;
	char c[10];

	printf("i, f = ");
	scanf("%d %f", &i, &f);

	printf("c[10] = ");
	scanf("%s", c);

	printf("%d %.2f %s\n", i, f, c);
}
```

| 转换说明 | 含义 |
| --- | --- |
| %c | 字符 |
| %d | 有符号十进制整数 |
| %e、%f、%g、%a | 浮点数（C99新增 %a） |
| %E、%F、%G、%A | 浮点数（C99新增 %A） |
| %i | 有符号十进制整数 |
| %o | 有符号八进制整数 |
| %p | 指针（地址） |
| %s | 字符串 从第一个非空白字符开始，到下一个空白字符之前的所有字符 |
| %u | 无符号十进制整数 |
| %x、%X | 有符号十六进制整数 |

| 修饰符 | 含义 | 示例 |
| --- | --- | --- |
| \* | 抑制赋值 | “%\*d” |
| 数字 | 最大字段宽度 输入达到最大字段宽度处，或第1次遇到空白字符停止 | “%10s” |
| hh | 把整数作为 signed char 或 unsigned char 类型读取 | “%hhd”、"%hhu" |
| ll | 把整数作为 long long 或 unsigned long long 类型读取（C99） | “%lld”、"%llu" |
| h、l 或 L | 把整数作为 short、long 类型读取 | “%hd”、"%ld" |
| j | 使用 intmax\_t 或 uintmax\_t 类型（C99） | “%jd”、"%ju" |
| z | 使用 sizeof 的返回值类型（C99） | “%zd”、"%zo" |
| t | 使用表示2个指针差值的类型（C99） | “%td”、"%tx" |

#### 3.5.1 从scanf()角度看输入（坑）

- scanf() 从缓冲区获取数据
- scanf() 会将所有输入的数据全部送入缓冲区，在缓冲区中按照输入条件获取数据，并将获取的数据从缓冲区删除
- 在输入获取之后，如有数据残留，保留该数据，当下次使用 scanf() 时从缓冲区获取，不再进行输入
- 当缓冲区为空时才会让用户进行输入
- scanf() 将字符串类型数据送入执行数组中时，会自动在字符序列的末尾添加 ‘\0’

```c
#include <stdio.h>

int main() {
	int i;
	char c[10];

	scanf("%d %s", &i, c);
	// 1.23 abc

	printf("i = %d, c[10] = %s\n", i, c);
	// i = 1, c[10] = .23

	scanf("%s", c);
	
	printf("c[10] = %s\n", c);
	// c[10] = abc
}
```

#### 3.5.2 格式字符串中的普通字符（内存原理未知）

- 用户需要严格按照 scanf() 中格式字符串的格式进行输入

```c
#include <stdio.h>

int main() {
	int i;
	char c[10];

	scanf("%d, %s", &i, c);
	// 1,abc

	printf("i = %d, c[10] = %s\n", i, c);
	// i = 1, c[10] = abc
}
```

#### 3.5.3 scanf() 的返回值

- scanf() 函数返回值为成功读取的项数

### 3.6 printf() 和 scanf() 的 \* 修饰符

- printf()

```c
#include <stdio.h>

int main() {
	int i = 6;
	int j = 8;
	int a = 1234;
	double d = 242.5;

	printf("%*d\n", i, a);
	//   1234

	printf("%*.*f\n", j, i, d);
	// 242.500000
}
```

- scanf()

```c
#include <stdio.h>

int main() {
	int i = 0;

	scanf("%*d %*d %d", &i);
	// 1 2 3
	
	printf("%d\n", i);
	// 3
}
```

### 3.7 printf()的用法提示

- 使用足够大的固定字段宽度让输出整齐美观

```c
#include <stdio.h>

int main() {
	printf("%d %d %d\n", 1, 123, 12345);
	printf("%d %d %d\n", 12345, 123, 1);
	// 1 123 12345
	// 12345 123 1

	printf("%7d %7d %7d\n", 1, 123, 12345);
	printf("%7d %7d %7d\n", 12345, 123, 1);
	//       1     123   12345
	//   12345     123       1
}
```

- 在文字中嵌套数字，指定一个小于或等于该数字宽度的字段

```c
#include <stdio.h>

int main() {
	printf("ABC %10.2f abc\n", 1.234);
	// ABC       1.23 abc

	printf("ABC %.2f abc\n", 1.234);
	// ABC 1.23 abc
}
```