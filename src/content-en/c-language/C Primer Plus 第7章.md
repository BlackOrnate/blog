#### Catalog

- [1. if statement](#1_if__2)
- [2. if else statements](#2_if_else__19)
- [2.1 Another example: Introducing getchar() and putchar()](#21__getchar__putchar_35)
  - [2.2 Character functions from the ctype.h family](#22_ctypeh__57)
  - [2.3 Multiple choice else if](#23__else_if_87)
  - [2.4 pairing else with if](#24_else_if__102)
  - [2.5 Multiple nested if statements](#25__if__119)
- [3. Logical operators] (#3__144)
- [3.1 Alternative spelling: iso646.h header file](#31_iso646h__158)
  - [3.2 Prioritization](#32__168)
  - [3.3 Order of values](#33__175)
  - [3.4 Range] (#34__183)
- [4. Conditional operators: ? :](#4____200)
- [5. Loop aids: continue and break](#5_continue__break_221)
- [5.1 continue statement](#51_continue__227)
  - [5.2 break statement](#52_break__255) - [5.3 continue statement](#51_continue__227) - [5.4 continue statement](#51_continue_227)
- [6. Multiple choice: switch and break](#6_switch__break_299)
- [6.1 Switch statements](#61_switch__301)
  - [6.2 Multiple labeling](#62__330)
  - [6.3 switch and if else](#63_switch__if_else_352)
- [7. goto statements](#7_goto__361)
- [7.1 Avoiding goto](#71__goto_373)

## 1. if statements

- The if statement is known as a branching statement or a selection statement.

```
if (expression)
    statement
```

- If the value of expession is true (non-zero), the statement is executed; otherwise, the statement is skipped.
- A statement can be a simple statement or a compound statement.
- if statement can be tested and executed only once
- expression is usually a relational expression, i.e., it compares two quantities.
- Even if the if statement consists of a compound statement, the entire if statement is still treated as one statement**.

## 2. if else statement

- The if else statement can be a choice between two statements

```
if (expression)
    stetement1
else
    statement2
```

- If the value of expession is true (non-zero), then statement1 is executed; otherwise, statement2 is executed.
- statement1 and statement2 can be a simple statement or a compound statement.

### 2.1 Another example: Introducing getchar() and putchar().

- The getchar() function takes no arguments and returns the next character from the input queue.
- The putchar() function prints its arguments

```c
char c;

c = getchar();
// 等效于
scanf("%c", &c);

putchar(c);
// 等效于
printf("%c", c);
```

- These functions deal only with characters, so they are faster and more concise than the more general scanf() and printf() functions.
- getchar() and putchar() don't need conversion instructions because they deal only with characters.

### 2.2 The ctype.h family of character functions

- C has a series of character-specific functions that take a character as an argument and return a non-zero value (true) if the character belongs to a particular class; otherwise, they return 0 (false).
- Test Functions

  | Function name | Returns true if the following arguments are present |
  | --- | --- |
  | isalnum() | Alphanumeric (letters or numbers) |
  | isalpha() | Alphabetic |
  | | isblank() | standard whitespace characters (spaces, horizontal tabs, or line breaks) or any other character that localization specifies as blank |
  | iscntrl() | Control Characters |
  | isdigit() | digits |
  | isgraph() | Any printable character except a space | | islower()
  | islower() | Lowercase | isprint() | Lowercase | isprint() | Lowercase | Lowercase
  | isprint() | Printable Characters | ispunct()
  | ispunct() | punctuation (any printable character except a space or alphanumeric character) |
  | isspace() | blank characters (spaces, line feeds, page breaks, carriage returns, vertical tabs, horizontal tabs, or other locale-defined characters) |
  | isupper() | uppercase |
  | isxdigit() | hexadecimal digit characters |
- Mapping Functions

  | function name | behavior |
  | --- | --- |
  | tolower() | If the argument is an uppercase character, the function returns the lowercase character; otherwise, it returns the original argument |
  | tolower() | If the argument is a lowercase character, the function returns the uppercase character; otherwise, it returns the original argument |

### 2.3 Multiple choice else if

- Extending the if else construct

```
if (expression1)
    stetement1
else if (expression2)
    statement2
else
    statement3
```

### 2.4 Pairing else with if

- If there are no curly braces, else matches the nearest if, unless the nearest if is enclosed in curly braces.

```
if (expression1)
    stetement1
    
	if (expression2)
    statement2
        
else
    statement3
```

### 2.5 Multiple Nested If Statements

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

## 3. Logical Operators

| Logical Operators | Meaning | ```c
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
``` ## 3.

| && | with | | or |
| | | | or | | | | | !
or | ! | !

- exp1 && exp2 is true if and only if both exp1 and exp2 are true
- exp1 || exp2 is true if either exp1 or exp2 is true
- if exp1 is false, then !exp1 is true; if exp1 is true, then !exp1 is false

### 3.1 Alternative spelling: iso646.h header file

| logical operators | iso646.h |
| --- | --- |
| && | and |
| | | | or | | !
| ! | not |

### 3.2 Prioritization

- The ! operator has a high priority, higher than the multiplication operator, the same priority as the increment operator, and lower than the parentheses.
- The && operator has a higher priority than the || operator, but both have a lower priority than the relational operator and a higher priority than the assignment operator.

### 3.3 Order of Values

- Except in cases where two operators share a single object, C does not usually guarantee which part of a complex expression will be evaluated first.
- The order of evaluation is up to the compiler designer.
- However, C guarantees that logical expressions are evaluated from left to right.

### 3.4 Scope

- The && operator can be used to test ranges

```
if (i >= 90 && i <= 100)
// 不等价于
if (90 <= i <= 100)

if (90 <= i <= 100)
// 比较运算符的求值顺序为从左往右
// 等价于
if ((90 <= i) <= 100)
```

## 4. Conditional operators: ? :

- C provides a conditional expression as a convenient way to express an if else statement using the ? : C provides conditional expressions as a convenient way to express if else statements using the ?

```
expression ? stetement1 : statement2
```

- If the value of expession is true (non-zero), then statement1 is executed; otherwise, statement2 is executed.

```
expression ? stetement1 : statement2
``` If expession is true (non-zero), statement1 is executed; otherwise, statement2 is executed.

## 5. Loop assist: continue and break

- The continue and break statements allow you to ignore part of the loop or even end the loop based on the results of a test in the loop body.

### 5.1 The continue statement

- When the continue statement is executed, the remainder of the iteration is skipped and the next iteration begins.
- If the continue statement is in a nested loop, it only affects the inner loop containing the statement.

If the continue statement is in a nested loop, it only affects the inner loop containing the statement ```c
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
```.

### 5.2 The break statement

- Execution of a break statement terminates the loop containing it and continues to the next stage of execution.
- If the break statement is in a nested loop, it only affects the current loop containing the statement.

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

## 6. Multiple Choice: Switch and Break

### 6.1 The switch statement

- Execute the procedure:

  - The value of the expression in parentheses immediately following the keyword switch is evaluated.
  - The program then scans the list of tags until it finds a match.
  - Then the program jumps to that line.
  - If there is no match, the program jumps to the next line if there is a defalut, and continues with the statement following the switch if there is no defalut.
- What break does:

  - To make the program leave the switch statement and jump to the statement following the switch.
  - If there is no break statement, the program starts at the matching label and ends at the end of the switch.

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

### 6.2 Multiple Labels

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

### 6.3 Switch and if else

- If the selection is based on a variable or expression of a floating-point type, you can't use switch.
- If you are selecting a variable or expression based on its range, switch is cumbersome and if else is more convenient.
- Using switch requires covering the entire range and setting the case value for each integer.
- However, if you use a switch, your program usually runs faster and generates less code.

## The goto statement

- The goto statement has two parts: goto and the label name.
- The label name follows the variable naming convention

```c
goto part;
part: printf("part");
```

### 7.1 Avoiding the use of goto

- to handle if statements that contain more than one statement.

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

- Creating Loops

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

- A use of goto that C programmers can pick up: jumping out of a set of nested loops in the event of a problem.

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