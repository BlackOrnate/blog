#### 目录

- [1. if 语句](#1_if__2)
- [2. if else 语句](#2_if_else__19)
- - [2.1 另一个示例：介绍 getchar() 和 putchar()](#21__getchar__putchar_35)
  - [2.2 ctype.h 系列的字符函数](#22_ctypeh__57)
  - [2.3 多重选择 else if](#23__else_if_87)
  - [2.4 else 与 if 配对](#24_else__if__102)
  - [2.5 多层嵌套的 if 语句](#25__if__119)
- [3. 逻辑运算符](#3__144)
- - [3.1 备选拼写：iso646.h 头文件](#31_iso646h__158)
  - [3.2 优先级](#32__168)
  - [3.3 求值顺序](#33__175)
  - [3.4 范围](#34__183)
- [4. 条件运算符： ? :](#4____200)
- [5. 循环辅助：continue 和 break](#5_continue__break_221)
- - [5.1 continue 语句](#51_continue__227)
  - [5.2 break 语句](#52_break__255)
- [6. 多重选择：switch 和 break](#6_switch__break_299)
- - [6.1 switch 语句](#61_switch__301)
  - [6.2 多重标签](#62__330)
  - [6.3 switch 和 if else](#63_switch__if_else_352)
- [7. goto 语句](#7_goto__361)
- - [7.1 避免使用 goto](#71__goto_373)

## 1. if 语句

- if 语句被称为分支语句（branching statement）或选择语句（selection statement）

```
if (expression)
    statement
```

- 如果对 expession 求值为真（非0），则执行 statement；否则，跳过 statement
- statement 可以是一条简单语句或复合语句
- if 语句只能测试和执行一次
- expression 通常是关系表达式，即比较两个量的大小
- **即使 if 语句由复合语句构成，整个 if 语句仍被视为一条语句**

## 2. if else 语句

- if else 语句可以在两条语句之间作选择

```
if (expression)
    stetement1
else
    statement2
```

- 如果对 expession 求值为真（非0），则执行 statement1；否则，执行 statement2
- statement1 和 statement2 可以是一条简单语句或复合语句

### 2.1 另一个示例：介绍 getchar() 和 putchar()

- getchar() 函数不带任何参数，它从输入队列中返回下一个字符
- putchar() 函数打印它的参数

```c
char c;

c = getchar();
// 等效于
scanf("%c", &c);

putchar(c);
// 等效于
printf("%c", c);
```

- 这些函数只处理字符，所以它们比更通用的 scanf() 和 printf() 函数更快、更简洁
- getchar() 和 putchar() 不需要转换说明，因为它们只处理字符

### 2.2 ctype.h 系列的字符函数

- C 有一系列专门处理字符的函数，这些函数接收一个字符作为参数，如果该字符属于某个特殊的类别，就返回一个非0值（真）；否则，返回0（假）
- 测试函数

  | 函数名 | 如果是下列参数时，返回值为真 |
  | --- | --- |
  | isalnum() | 字母数字（字母或数字） |
  | isalpha() | 字母 |
  | isblank() | 标准的空白字符（空格、水平制表符或换行符）或任何其他本地化指定为空白的字符 |
  | iscntrl() | 控制字符 |
  | isdigit() | 数字 |
  | isgraph() | 除空格之外的任意可打印字符 |
  | islower() | 小写字母 |
  | isprint() | 可打印字符 |
  | ispunct() | 标点符号（除空格或字母数字字符以外的任何可打印字符） |
  | isspace() | 空白字符（空格、换行符、换页符、回车符、垂直制表符、水平制表符或其他本地化定义的字符） |
  | isupper() | 大写字母 |
  | isxdigit() | 十六进制数字符 |
- 映射函数

  | 函数名 | 行为 |
  | --- | --- |
  | tolower() | 如果参数是大写字符，该函数返回小写字符；否则，返回原始参数 |
  | toupper() | 如果参数是小写字符，该函数返回大写字符；否则，返回原始参数 |

### 2.3 多重选择 else if

- 扩展 if else 结构

```
if (expression1)
    stetement1
else if (expression2)
    statement2
else
    statement3
```

### 2.4 else 与 if 配对

- 如果没有花括号，else 与离它最近的 if 匹配，除非最近的 if 被花括号括起来

```
if (expression1)
    stetement1
    
	if (expression2)
    statement2
        
else
    statement3
```

### 2.5 多层嵌套的 if 语句

```c
#include <stdio.h>

int main() {
	int num = 0;
	int vlaue = 1;

	while (rewind(stdin), scanf("%d", &num) != EOF)
	{
		for (int i = 2; i < num / vlaue; i++)
		{
			if (num % i == 0)
			{
				vlaue = i;
				printf("%d and %d\n", i, num / i);
			}
		}
	}
}
```

## 3. 逻辑运算符

| 逻辑运算符 | 含义 |
| --- | --- |
| && | 与 |
| || | 或 |
| ! | 非 |

- 当且仅当 exp1 和 exp2 都为真时，exp1 && exp2 才为真
- 如果 exp1 或 exp2 为真，则 exp1 || exp2 为真
- 如果 exp1 为假，则 !exp1 为真；如果 exp1 为真，则 !exp1 为假

### 3.1 备选拼写：iso646.h 头文件

| 逻辑运算符 | iso646.h |
| --- | --- |
| && | and |
| || | or |
| ! | not |

### 3.2 优先级

- ! 运算符的优先级很高，比乘法运算符高，与递增运算符的优先级相同，只比圆括号的优先级低
- && 运算符的优先级比 || 运算符高，但是两者的优先级都比关系运算符低，比赋值运算符高

### 3.3 求值顺序

- 除了两个运算符共享一个运算对象的情况外，C 通常不保证先对复杂表达式中的哪个部分求值
- 计算的顺序由编译器设计者决定
- 但是，C 保证逻辑表达式的求值顺序是从左往右

### 3.4 范围

- && 运算符可以用于测试范围

```
if (i >= 90 && i <= 100)
// 不等价于
if (90 <= i <= 100)

if (90 <= i <= 100)
// 比较运算符的求值顺序为从左往右
// 等价于
if ((90 <= i) <= 100)
```

## 4. 条件运算符： ? :

- C 提供条件表达式（conditional expression）作为表达 if else 语句的一种便捷方式，该表达式使用 ? : 运算符

```
expression ? stetement1 : statement2
```

- 如果对 expession 求值为真（非0），则执行 statement1；否则，执行 statement2

```c
if (i > 90)
    printf("A\n");
else
    printf("B\n");
// 等价于
(i > 90) ? printf("A\n") : printf("B\n");
```

## 5. 循环辅助：continue 和 break

- continue 和 break 语句可以根据循环体中的测试结果来忽略一部分循环内容，甚至结束循环

### 5.1 continue 语句

- 执行到 continue 语句时，会跳过本次迭代的剩余部分，并开始下一轮迭代
- 如果 continue 语句在嵌套循环中，则只会影响包含该语句的内层循环

```c
#include <stdio.h>

int main() {
    char c;

    for (int i = 0; i < 10; i++)
    {
        c = getchar();

        if (c == '\n')
        {
            continue;
        }

        putchar(c);
    }
    putchar('\n');
}
```

### 5.2 break 语句

- 执行到 break 语句时，会终止包含它的循环，并继续执行下一阶段
- 如果 break 语句在嵌套循环中，则只会影响包含该语句的当前循环

```c
#include <stdio.h>

int main() {
    int i = 0;
    int j = 0;

    printf("i = ");
    scanf("%d", &i);
    while (i > 0)
    {
        printf("j = ");
        scanf("%d", &j);

        while (j > 0)
        {
            printf("i * j = %d\n", i * j);
            if (j > 100)
            {
                break;
            }
            printf("j = ");
            scanf("%d", &j);
        }

        if (i > 100)
        {
            break;
        }
        printf("i = ");
        scanf("%d", &i);
    }

}
```

## 6. 多重选择：switch 和 break

### 6.1 switch 语句

- 执行过程：

  - 对紧跟在关键字 switch 后圆括号中的表达式求值
  - 然后程序扫描标签列表，直到发现一个匹配的值为止
  - 然后程序跳转至那一行
  - 如果没有匹配的标签，有 defalut 则跳转至改行，没有 defalut 则继续执行在 switch 后面的语句
- break 的作用：

  - 让程序离开 switch 语句，跳至 switch 后面的语句
  - 如果没有 break 语句，就会从匹配标签开始执行到 switch 末尾

```c
char c = 'B';

switch(c)
{
    case 'A': printf("1");
        break;
    case 'B': printf("2");
        break;
    case 'C': printf("3");
        break;
    default: printf("Other");
}
```

### 6.2 多重标签

```c
char c = 'b';

switch(c)
{
    case 'a':
    case 'A': printf("1");
        break;
    case 'b':
    case 'B': printf("2");
        break;
    case 'c':
    case 'C': printf("3");
        break;
    default: printf("Other");
}
```

### 6.3 switch 和 if else

- 如果是根据浮点类型的变量或表达式来选择，则无法使用 switch
- 如果根据变量在某范围内决定程序流的去向，使用 switch 会很麻烦，使用 if else 会比较方便
- 使用 switch 需要涵盖全部范围，为每个整数设置 case 值
- 但是，如果使用 switch ，程序通常运行速度较快，生成代码较少

## 7. goto 语句

- goto 语句有两个部分： goto 和标签名
- 标签名遵循变量命名规则

```c
goto part;
part: printf("part");
```

### 7.1 避免使用 goto

- 处理包含多条语句的 if 语句

```c
int i = 5;

if (i > 10)
    goto a;
goto b;

a: printf('a');
b: printf('b');

// 等价于

int i = 5;

if (i > 10)
    printf('a');
printf('b');
```

- 创建循环

```c
int i = 0;

a: scanf("%d", &i);
if (i < 0)
    goto b;
printf("a");
goto a;

b: printf("b");

// 等价于

int i = 0;

while (i >= 0)
{
    printf("a");
    scanf("%d", &i);
}
printf("b");
```

- C 程序员可以接收的一种 goto 用法：出现问题时从一组嵌套循环中跳出

```c
int i = 5;
while (i > 0)
{
    for (int j = 1; j < 50; j++)
    {
        if (j = i)
        {
            goto exce;
        }
    }
}

exce: printf("Exception");
```