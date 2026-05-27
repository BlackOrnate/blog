#### Catalog

- [1. Basic Operators](#1___2)
- [1.1 Assignment Operator =](#11___8)
  - [A few terms: data objects, left-values, right-values, and operators](#_20)
  - [1.2 Addition Operator +](#12___41)
  - [1.3 Subtraction Operator -](#13___54)
  - [1.4 Symbolic Operators - and +](#14_____64)
  - [1.5 Multiplication Operators \*](#15___77)
  - [Exponential growth](#_85)
  - [1.6 Division Operator /](#16___105)
  - [1.7 Operator Priority](#17__133)
- [2. Other operators](#2__147)
- [2.1 sizeof operators and size\_t types](#21_sizeof__size_t__149) [2.2 Modulo operators](#21_sizeof_size_t__149)
  - [2.2 The modulo operator %](#22___171)
  - [2.3 Incremental Operator ++](#23___187)
  - [2.4 The Decreasing Operator --](#24___206)
  - [2.5 Don't be a smartass (pit) (P101)](#25_P101_225)
- [3. Expressions and Statements](#3__240)
- [3.1 Expressions](#31__242)
  - [Every expression has a value (pit) (P102)](#P102_258)
  - [3.2 Statements (pit) (P103)](#32_P103_285)
  - [Side effects and sequence points](#_304)
  - [3.3 Compound Statements / Blocks](#33____333)
  - [Summary Expressions and Statements](#__353)
- [4. Type Conversion](#4__367)
- [Forced type conversion operators](#_439)
  - [Some operators in C](#C_455)

## 1. Basic operators

- C uses operators to represent arithmetic computations.

### 1.1 The assignment operator =

```
i = 1;
```

- The entry to the left of the = sign must be a variable name.
- The left-hand side of the assignment operator must reference a storage address.
- C uses the modifiable lvalue to mark entities that are assignable.

#### A few terms: data objects, left values, right values, and operators

- Data object

  - A data storage area used to store values
  - The use of variable names is one way to identify an object
  - The object refers to the actual data storage
- Left value (lvalue)

  - A name or expression used to identify a specific data object
  - A lvalue is a label used to identify or locate a storage location.
  - Because objects modified by const are read-only and cannot be modified, C has added a new term, modifiable lvalue, to identify objects that can be modified.
  - The left-hand side of the assignment operator should be a modifiable lvalue.
- The left-hand side of the assignment operator should be a modifiable left-value (rvalue)

  - A right value is a quantity that can be assigned to a modifiable left value and is not itself a left value.
  - A right-value can be a constant, a variable, or another expression (function call) that can be evaluated.
  - The concept is now described in terms of the value of an expression.
- Operators

  - Operators Order of assignment: right to left

### 1.2 Addition +

```
i = 1 + 2;

a = i + j;
```

- The value of the addition can be a variable or a constant.
- The binary operator requires two objects to complete the operation.

### 1.3 Subtraction operator -

```
i = 2 - 1;
```

- A binary operator that requires two objects to complete the operation.

### 1.4 Symbolic operators - and +

```
i = -1;

i = +1;
// C90 新增
```

- Unary operators, which require only one operator object

### 1.5 Multiplication operators \*

```
i = 2 * 3;
```

#### Exponential growth

```c
#include <stdio.h>

int main() {
	double add = 0.5, total = 0;

	for (int square = 1; square <= 64; square++)
	{
		add = 2 * add;
		total = add + total;

		printf("square = %2d	add = %13e	total = %12e\n", square, add, total);
	}
}
```

### 1.6 Division Operators /

- Floating-point division is the process by which the fractional part of the result of an integer division of a floating-point number is discarded.
- The fractional part of the result of integer division is discarded, a process known as truncation

```
i = 3.0 / 2.0;
// i = 1.5

i = 3 / 2;
// i = 1

i = -3.0 / 2.0;
// i = -1.5

i = -3 / 2;
// i = -1
// 趋0截断

i = -3 / 2;
// i = -2
// 四舍五入
```

- For negative integers, rounding and truncation to zero were available before C99, and truncation to zero is mandatory after C99.

### 1.7 Operator precedence

- Priority (highest to lowest)

| Operators | Combining Laws |
| --- | --- |
| () | Left to Right |
| + - (unary) | right to left |
| \* / | from left to right |
| + - (binary) | from left to right | | = | from right to left | \* / | from left to right
| = | from right to left | \* / | from left to right | | + - (binary)

## 2. Other operators

### 2.1 The sizeof operator and the size\_t type

```c
#include <stdio.h>

int main() {
	
	int i = 0;
	size_t intsize;

	intsize = sizeof(int);

	printf("i = %d, sizeof i = %zd, sizeof(int) = %zd\n", i, sizeof i, intsize);
	// i = 0, sizeof i = 4, sizeof(int) = 4
}
```

- sizeof returns a value of type size\_t.
- This is an unsigned integer type

### 2.2 The modulo operator %

- Calculates the remainder (remainder) of the integer to its left divided by the integer to its right.
- The modulo operator can only be used on integers, not floating point numbers.

```
int i = 11 % 5;
// i = 1

int i = -11 % 5;
// i = 1
```

### 2.3 Incrementing Operators ++

- Prefixed form
  - Increment first, then assign.
- Suffixed form
  - Assign first, then increment.

```
a = ++i;
// a = i + 1
// i = i + 1

a = i++;
// a = i
// i = i + 1
```

### 2.4 Decrementing Operators -

- Prefixed form
  - Decrement, then assign
- Suffixed form
  - Assign first, then decrement

```
a = --i;
// a = i - 1
// i = i - 1

a = i--;
// a = i
// i = i - 1
```

### 2.5 Don't be a smartass (pit) (P101)

- In C, the compiler can choose for itself which argument in a function to evaluate first

```
a = i / 2 + 5 * (1 + i++);
// 理论上先计算 i / 2，再计算 5 * (1 + i++)
// 编译器可能先计算 5 * (1 + i++)，再计算 i / 2
```

- Do not use increment or decrement operators on a variable that appears in more than one argument of a function.
- Do not use the increment or decrement operator on a variable that appears multiple times in an expression.

## 3. Expressions and Statements

## 3.1 Expressions

- An expression consists of an operator and an object, which is the object on which the operator operates.

```
4
-6
4 + 21
a * (b + c / d) /20
q = 5 * 2
x = ++q % 3
a > 3
```

#### Each expression has a value (pit) (P102)

| expression | value |
| --- | --- |
| -4 + 6 | 2 |
| c = 3 + 8 | 11 |
| 5 > 3 | 1 |
| 1 + (i = 1 + 2) | 4 |

```c
#include <stdio.h>

int main() {
	
	int i = 0;
	int j = 0;

	j = 1 + (i = 1 + 2);

	printf("i = %d, j = %d\n", i, j);
	// i = 3, j = 4
}
```

### 3.2 Statements (Pit) (P103)

- Statements are the basic building blocks of a C program.
- In C, most statements end with a semicolon
- ** According to the C standard, a statement is not a statement; if you remove the semicolon after a statement, the rest of it is not an expression and has no value **

```
int i;

int i
// 不是表达式，没有值
```

- Assignment expression statement: assign a value to a variable
- Function expression statement: cause a function call

#### Side Effects and Sequence Points

- Side effect

  - Modification of a data object or file
  - The main purpose is the side effect
  - Side effect of assignment, changing the value of a variable.
  - The side effect of the printf() function is the information displayed.
- Sequence point.

  - The point in program execution at which all side effects occur before moving on to the next step.
  - In C, a semicolon in a statement marks a sequence point.
  - In a statement, the assignment, increment, and decrement operators make changes to the object of the operation that must be completed before the program executes the next statement.
  - The end of any full expression is also a sequence point.
- A full expression

  - This expression is not a sub-expression of a larger expression.

  ```
  y = (4 + x++) + (6 + x++);
  // 4 + x++ 不是一个完整的表达式
  // 整个赋值表达式是一个完整的表达式
  // C并未指明是在对子表达式求值后递增 x ，还是对所有表达式求值后再递增 x
  ```

### 3.3 Compound Statements / Blocks

- Compound staement
  - One or more statements enclosed in parentheses.

```c
#include <stdio.h>

int main() {
	int i = 0;

	while (i++ < 10)
	{
		printf("%d\n", i);
	}
}
```

### Summary Expressions and Statements

- Expressions
  - An expression consists of an operator and an object.
- Statements
  - Simple statements
    - Assignment expression statements
    - Function expression statements
    - Null statements
  - Compound Statements (Blocks)
    - Composed of one or more statements enclosed in parentheses

## 4. Type Conversion

- Type Conversion Rules

  - When type conversions occur in expressions, chars and shorts, whether unsigned or signed, are automatically converted to int and, if necessary, to unsigned int (unsigned int is larger than int if short and int are the same size; in this case, unsigned short is converted to unsigned int). short is converted to unsigned int) These conversions are called promotions because they are all conversions from a smaller type to a larger type.
  - For operations involving two types, the two values are converted to the higher level of each type.
  - Type level (from highest to lowest)

    | types |
    | --- |
    | long double |
    | double |
    | long double | double | float |
    | unsigned long long |
    | float | unsigned long long
    long long | unsigned long | float
    | long long
    unsigned int | int | int | int | int | int | int | int | int | int
    long long | unsigned long | long | unsigned int | int | int

    - When long and int are the same size, the unsigned int level is higher than long.
    - short and char types are not listed: they have been upgraded to int or unsigned char
  - In an assignment expression statement, the final result of the computation is converted to the type of the variable being assigned; this process may result in a type promotion or demotion; a demotion is the conversion of a type to a lower-level type.
  - When passed as a function parameter, char and short are converted to int, and float is converted to double.
- Rules for when the value to be assigned does not match the target type

  - If the target type is unsigned int and the value to be assigned is int, the extra bits are ignored.
  - If the target type is signed int and the value to be assigned is int, the result varies from implementation to implementation.
  - If the target type is int and the value to be assigned is double/float, the behavior is undefined.
- When a floating point number is converted to an integer type, the original floating point value is truncated (tends to be 0-truncated)

```c
#include <stdio.h>

int main() {
	char c;
	int i;
	float f;

	f = i = c = 'C';
	printf("c = %c, i = %d, f = %2.2f\n", c, i, f);
	// c = C, i = 67, f = 67.00

	c++;
	// 68
	i = f + 2 * c;
	// 67 + 2 * 68 = 203
	f = 2.0 * c + i;
	// 2.0 * 68 + 203 = 339.0
	printf("c = %c, i = %d, f = %2.2f\n", c, i, f);
	// c = D, i = 203, f = 339.00

	c = 1107;
	// 1107 % 256 = 83
	printf("c = %c\n", c);
	// c = S
	
	c = 80.89;
	// 80.89 趋0截断 80
	printf("c = %c\n", c);
	// c = P
}
```

### Forced type conversion operators

- Forced cast: A type name enclosed in parentheses is placed in front of a quantity, which is the target type you want to convert to.
- The parentheses and the enclosed type name form the cast operator.

```
int i;
i = 1.6 + 1.7;
// i = 3;

i = (int)1.6 + (int)1.7;
// i = 2;
```

### Some of C's operators

| type | symbol | meaning |
| --- | --- | --- |
| assignment operator | = | assigns the value on its right side to the variable on its left |
| | arithmetic operator | + | adds the value on its left side to the value on its right side |
| | - | Subtracts the value on its left from the value on its right | | - | As an arithmetic operator.
| | - | As a unary operator, change the sign of the value on its right side |
| | \* | Multiply its left-hand side value by its right-hand side value |
| | / | Divide its left-hand side value by its right-hand side value; if both numbers are integers, the result is truncated (tends to be 0-truncated) |
| | % | Dividing the value on its left by the value on its right takes the remainder (can only be applied to integers) |
| | ++ | Add 1 to the right-hand side (prefix mode); add 1 to the left-hand side (suffix mode) | | - | - | Add 1 to the right-hand side (prefix mode)
| | - | minus 1 for the right-hand side (prefix mode); minus 1 for the left-hand side (suffix mode) |
| other operators | sizeof | get the size (in bytes) of the right-hand side of the object, which can be a type specifier enclosed in parentheses |
| | (type name) | force type conversion operator converts the value on its right to the type specified in parentheses |