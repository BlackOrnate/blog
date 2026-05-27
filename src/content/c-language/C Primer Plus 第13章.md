#### 目录

- [1. 与文件进行通信](#1__2)
- - [1.1 文件是什么](#11__9)
  - [1.2 文本模式和二进制模式](#12__16)
  - [1.3 I/O 的级别](#13_IO__38)
  - [1.4 标准文件](#14__46)
- [2. 标准 I/O](#2__IO_63)
- - [2.1 检查命令行参数](#21__72)
  - [2.2 fopen() 函数](#22_fopen__104)
  - [2.3 getc() 和 putc() 函数](#23_getc__putc__137)
  - [2.4 文件结尾](#24__161)
  - [2.5 fclose() 函数](#25_fclose__191)
  - [2.6 指向标注文件的指针](#26__208)
- [3. 文件拷贝](#3__221)
- [4. 文件 I/O：fprintf() 、fscanf() 、fgets() 和 fputs()](#4__IOfprintf_fscanf_fgets__fputs_276)
- - [4.1 fprintf() 和 fscanf() 函数](#41_fprintf__fscanf__278)
  - [4.2 fgets() 和 fputs() 函数](#42_fgets__fputs__300)
- [5. 随机访问：fseek() 和 ftell()](#5_fseek__ftell_329)
- - [5.1 fseek() 和 ftell() 的工作原理](#51_fseek__ftell__338)
  - [5.2 可移植性](#52__369)
  - [5.3 fgetpos() 和 fsetpos() 函数](#53_fgetpos__fsetpos__386)
- [6. 标准 I/O 的机理](#6__IO__408)
- [7. 其他标准 I/O 函数](#7__IO__433)
- - [7.1 int ungetc() 函数](#71_int_ungetc__435)
  - [7.2 int fflush() 函数](#72_int_fflush__447)
  - [7.3 int setvbuf() 函数](#73_int_setvbuf__459)
  - [7.4 二进制 I/O ：fread() 和 fwrite()](#74__IO_fread__fwrite_467)
  - [7.5 size\_t fwrite() 函数](#75_size_t_fwrite__471)
  - [7.6 size\_t fread() 函数](#76_size_t_fread__479)
  - [7.7 int feof() 和 int ferror() 函数](#77_int_feof__int_ferror__487)

## 1. 与文件进行通信

- 程序从文件中读取信息或把信息写入文件的交互形式就是文件重定向（第8章）
- 可以在程序中打开文件，然后使用特殊的 I/O 函数读取文件中的信息或把信息写入文件

### 1.1 文件是什么

- **文件（file）** 通常是在磁盘或固态硬盘上的一段已命名的存储区
- C 把文件看作是一系列连续的字节，每个字节都能被单独读取

### 1.2 文本模式和二进制模式

- 文本内容和二进制内容、文本文件格式和二进制文件格式，以及文件的文本模式和二进制模式
- 所有文件的内容都以二进制形式存储
- 如果文件最初使用二进制编码的字符表示文本，该文件就是文本文件，其中包含文本内容
- 如果文件中的二进制值代表机器语言代码或数值数据或图片或音乐编码，该文件就是二进制稳健，其中包含二进制内容
- 为了规范文本文件的管理，C 提供两种访问文件的途径

  - **二进制模式**
    - 程序可以访问文件的每个字节
  - **文本模式**
    - 程序所见的内容和文件的实际内容不同
    - 把本地环境表示的行末尾或文件结尾映射为 C 模式
- 除了以文本模式读写文本文件，还能以二进制模式读写文本文件

### 1.3 I/O 的级别

- I/O 的两个级别
  - **底层 I/O （low-level I/O）**：使用操作系统提供的基本 I/O 服务
  - **标准高级 I/O （standard high-level I/O）**：用 C 库的标准包和 stdio.h 头文件定义

### 1.4 标准文件

- C 程序会自动打开 3 个文件
  - **标准输入（standard input）**
    - 系统的普通输入设备，通常为键盘
    - 为程序提供输入
    - getchar() 和 scanf() 使用的文件
  - **标准输出（standard output）**
    - 系统的普通输出设备，通常为显示屏
    - 程序输出到标准输出
    - putchar() 、puts() 和 printf() 使用的文件
  - **标准错误输出（standard error output）**
    - 系统的普通输出设备，通常为显示屏
    - 提供一个逻辑上不同的地方来发送错误消息

## 2. 标准 I/O

- 与底层 I/O 相比有 3 个好处
  - 可移植
  - 有许多专门的函数简化了处理不同 I/O 的问题
  - 输入和输出都是**缓冲**的

### 2.1 检查命令行参数

```c
int main(int argc, char* argv[]) {
    if (argc != 2) { // 查看是否有命令行参数
        printf("%s\n", argv[0]);
        exit(EXIT_FAILURE);
    }
    return 0;
}
```

- exit() 函数关闭所有打开的文件并结束程序

  - 正常结束的程序传递 0 ，异常结束的程序传递非零值
  - C 标准要求 0 或宏 EXIT\_SUCCESS 用于表明成功结束程序，宏 EXIT\_FAILURE 用于表明结束程序失败
  - 这些宏和 exit() 原型都位于 stdlib.h 头文件中
- 在最初调用的 main() 中使用 return 与调用 exit() 的效果相同

  ```python
  return 0;
  // 等效于
  exit(0);
  ```
- 如果 main() 在一个递归程序中，exit() 仍然会终止程序，return 只会把控制权交给上一级递归
- 在其他函数中调用 exit() 也能结束整个程序

### 2.2 fopen() 函数

- fopen() 函数用于打开文件

  - 声明在 stdio.h 中
  - 第 1 个参数是待打开文件的名称 / 一个包含该文件名的字符串地址
  - 第 2 个参数是一个字符串，指定待打开文件的模式
- fopen() 的模式字符串

| 模式字符串 | 含义 |
| --- | --- |
| “r” | 以读模式打开文件 |
| “w” | 以写模式打开文件，把现有文件的长度截为 0 ；如果文件不存在，则创建一个新文件 |
| “a” | 以写模式打开文件，在现有文件末尾添加内容 ；如果文件不存在，则创建一个新文件 |
| “r+” | 以更新模式打开文件（可以读写文件） |
| “w+” | 以更新模式打开文件，如果文件存在，则将其长度截为 0 ；如果文件不存在，则创建一个新文件 |
| “a+” | 以更新模式打开文件，在现有文件的末尾添加内容 ；如果文件不存在，则创建一个新文件 |
| “rb”、“wb”、“ab”、“rb+”、“r+b”、“wb+”、“w+b”、“ab+”、“a+b” | 与上一个模式类似，但是以二进制模式而不是文本模式打开文件 |
| “wx”、“wbx”、“w+x”、“wb+x"或"w+bx” | （C11）类似非 x 模式，但是如果文件已存在或以独占模式打开文件，则打开文件失败 |

- 程序成功打开文件后，fopen() 将返回**文件指针（file pointer）**，其他 I/O 函数可以使用这个指针指定该文件
- 文件指针的类型是指向 FILE 的指针，FILE 是定义在 stdio.h 中的派生类型
- 文件指针并不指向实际的文件，它指向一个包含文件信息的数据对象，其中包含操作文件的 I/O 函数所用的缓冲信息
- 标准库中的 I/O 函数使用缓冲区，所以它们不仅要知道缓冲区的位置，还要知道缓冲区被填充的程度以及操作哪一个文件
- 标准 I/O 函数根据这些信息必要时决定再次填充或清空缓冲区
- 文件指针指向的数据对象包含了这些信息

### 2.3 getc() 和 putc() 函数

- getc() 和 putc() 函数与 getchar() 和 putchar() 函数类似
  - 需要告诉 getc() 和 putc() 函数使用哪一个文件
    - putc()
      - 第 1 个参数：待写入的字符
      - 第 2 个参数：文件指针

```
char c;
FILE* f;

c = getchar();
// 从标准输入中获取一个字符

c = getc(f);
// 从文件指针指定的文件中获取一个字符

putc(c, f);
// 把字符放入文件指针指定的文件中
```

### 2.4 文件结尾

- 从文件中读取数据的程序在读到文件结尾时要停止
- 如果 getc() 函数在读取一个字符时发现时文件结尾，它将返回一个特殊值 EOF
- C 程序只有在读到超过文件末尾时才会发现文件的结尾

```
char c;
FILE* f;

f = fopen("abc.txt", "r");
c = getc(f);
while (c != EOF) {
    puchar(c);
    c = getc(f);
}

// 代码优化

char c;
FILE* f;

f = fopen("abc.txt", "r");
while ((c = getc(f)) != EOF) {
    putchar(c);
}
```

### 2.5 fclose() 函数

- fclose() 函数关闭文件指针指定的文件，必要时刷新缓冲区
- 应该检查是否成功关闭文件

  ```c
  FILE* f;
  if (fclose(f) != 0) {
      printf("Error: %s \n", argv[1]);
  }
  ```

  - 如果磁盘已满、移动硬盘被移除或出现 I/O 错误，都会导致调用 fclose() 函数失败

### 2.6 指向标注文件的指针

- stdio.h 头文件把 3 个文件指针与 3 个标准文件相关联，C 程序会自动打开这 3 个标准文件
- 标准文件和相关联的文件指针

| 标准文件 | 文件指针 | 通常使用的设备 |
| --- | --- | --- |
| 标准输入 | stdin | 键盘 |
| 标准输出 | stdout | 显示屏 |
| 标准错误 | stderr | 显示屏 |

## 3. 文件拷贝

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[]) {
    FILE *in, *out;
    char c;
    char name[40];

    // 检查命令行参数
    if (argc < 2)
    {
        fprintf(stderr, "Error(1) : %s\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    // 设置输入
    if ((in = fopen(argv[1], "r")) == NULL)
    {
        fprintf(stderr, "Error(2) : %s\n", argv[1]);
        exit(EXIT_FAILURE);
    }

    // 设置输出
    strncpy(name, argv[1], 35);
    name[35] = "\0";
    strcat(name, ".txt");
    
    if ((out = fopen(name, "w")) == NULL)
    {
        fprintf(stderr, "Error(3)\n");
        exit(3);
    }

    // 拷贝数据
    while ((c = getc(in)) != EOF)
    {
        putc(c, out);
    }

    // 收尾
    if (fclose(in) != 0 || fclose(out) != 0)
    {
        fprintf(stderr, "Error(4) : closing");
    }

    return 0;
}
```

## 4. 文件 I/O：fprintf() 、fscanf() 、fgets() 和 fputs()

### 4.1 fprintf() 和 fscanf() 函数

- 工作方式与 printf() 和 fscanf() 类似
- fprintf() 和 fscanf() 函数需要用第 1 个参数指定处理的文件

  ```c
  FILE *f;
  char c[10];

  fprintf(stdout, "abc\n");
  fprintf(f, "abc\n");
  fscanf(stdin, "%s", c);
  fscanf(f, "%s", c);
  ```
- rewind() 函数让程序回到文件开始处，方便 while 循环打印整个文件的内容

### 4.2 fgets() 和 fputs() 函数

- fgets() 函数

  - 第 1 个参数表示输入位置的地址
  - 第 2 个参数表示待输入字符串的大小（所占空间）
  - 第 3 个参数表示待读取的而文件

  ```
  char *c;
  char *file;
  fgets(c, 40 * sizeof(char), file)
  ```
- fputs() 函数

  - 第 1 个参数表示字符串的地址
  - 第 2 个参数表示文件的指针

  ```
  char *c;
  char *file;
  fputs(c, file);
  ```

## 5. 随机访问：fseek() 和 ftell()

- fseek() 函数把文件当成数组，在 fopen() 打开的文件中移动到指定字节处
  - 返回 int 类型的值
- ftell()
  - 返回 long 类型的值，表示文件中的当前位置

### 5.1 fseek() 和 ftell() 的工作原理

- fseek()

  - 第 1 个参数：FILE 指针

    - 指向待查找的文件，fopen() 应该已打开该文件
  - 第 2 个参数：**偏移量（offset）**

    - 从起点开始要移动的距离
    - 该参数必须是一个 long 类型的值，可以为正（前移）、负（后移）或0（不移）
  - 第 3 个参数：模式

    - 确定起始点
    - 模式的明示常量（manifest constant）

      | 模式 | 偏移量的起始点 |
      | --- | --- |
      | SEEK\_SET | 文件开始处 |
      | SEEK\_CUR | 当前位置 |
      | SEEK\_END | 文件末尾 |
- ftell() 函数的返回类型是 long，它返回的是参数指向文件的当前位置距开始处的字节数

### 5.2 可移植性

- 在二进制模式中，实现不必支持 SEEK\_END 模式

  - 移植性更高的方法是逐字节读取整个文件直到文件末尾
- 在文本模式中，只有以下调用能保证其行为

  | 函数调用 | 效果 |
  | --- | --- |
  | fseek(file, 0L, SEEK\_SET) | 定位至开始处 |
  | fseek(file, 0L, SEEK\_CUR) | 保持当前位置不动 |
  | fseek(file, 0L, SEEK\_END) | 定位至文件结尾 |
  | fseek(file, ftell-pos, SEEK\_SET) | 到距文件开始处 ftell-pos 的位置，ftell-pos 是 ftell() 的返回值 |

### 5.3 fgetpos() 和 fsetpos() 函数

- 处理较大文件的定位函数
- 两个函数不使用 long 类型的值表示位置，它们使用：fpos\_t（file position type，文件定位类型）
  - fpos\_t 类型不是基本类型，它根据其他类型来定义
  - fpos\_t 类型的变量或数据对象可以在文件中指定一个位置，它不能是数组类型

```
int fgetpos(FILE* restrict stream, fpos_t* restrict pos);
// 把 fpos_t 类型的值放在 pos 指向的位置上，该值描述了文件中的当前位置距文件开头的字节数
// 如果成功，返回 0; 如果失败，返回非 0
```

```
int fsetpos(FILE* stream, const fpos_t* pos);
// 使用 pos 指向位置上的 fpos_t 类型值来设置文件指针指向偏移该值后指定的位置
// 如果成功，返回 0; 如果失败，返回非 0
// fpos_t 类型值通过之前调用 fgetpos() 获得
```

## 6. 标准 I/O 的机理

- 第 1 步
  - 调用 fopen() 打开文件
  - fopen() 不仅打开一个文件，还创建了一个缓冲区以及一个包含文件和缓冲区数据的结构
  - fopen() 返回一个指向该结构的指针，以便其他函数直到如何找到该结构
  - 如果以文本模式打开该文件，就获得一个文本流
  - 如果以二进制模式打开该文件，就获得一个二进制流
- 第 2 步
  - 调用输入函数
  - 当调用函数时，文件中的缓冲大小数据块就被拷贝到缓冲区中
  - 最初调用函数，除了填充缓冲区，还要设置文件指针所指向的结构中的值
- 第 3 步
  - 输入函数按要求从缓冲区读取数据
  - 在读取文件时，文件位置指示器被设置为指向刚读取字符的下一个字符
  - 调用任何一个函数都将从上一次函数停止调用的位置开始
- 第 4 步
  - 当输入函数发现已读完缓冲区的所有字符时，会请求把下一个缓冲大小的数据块从文件拷贝到该缓冲区中
  - 函数在读取缓冲区中的最后一个字符后，把结尾指示器设置为真，下一次被调用的输入函数将返回EOF
- 第 5 步
  - 输出函数以类似的方式把数据写入缓冲区
  - 当缓冲区被填满时，数据将被拷贝至文件中

## 7. 其他标准 I/O 函数

### 7.1 int ungetc() 函数

```
int ungetc(char c, FILE *F);
```

- 把指定的字符放回输出流中
- 如果放回，下次调用标准输入函数时将读取该字符
- 如果把一行中的多个字符返回输入流，那么下一次输入函数读入的字符顺序与放回时的顺序相反

### 7.2 int fflush() 函数

```
int fflush(FILE *F);
```

- 使输出缓冲区中所有的未写入数据被发送到文件指针指定的输出文件
  - 这个过程称为**刷新缓冲区**
- 如果文件指针是空指针，所有输出缓冲区都被刷新

### 7.3 int setvbuf() 函数

```
int setvbuf(FILE *restrict F, char *restrict c, int i, size_t size);
```

### 7.4 二进制 I/O ：fread() 和 fwrite()

### 7.5 size\_t fwrite() 函数

```
size_t fwrite(const void *restrict ptr, size_t size, size_t nmemb, FILE *restrict F);
```

### 7.6 size\_t fread() 函数

```
size_t fread(void *restrict ptr, size_t size, size_t nmemb, FILE *restrict F);
```

### 7.7 int feof() 和 int ferror() 函数

```
int feof(FILE *F);
```

```
int ferror(FILE *F);
```