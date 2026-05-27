#### Catalog

- [1. Variable and constant data](#1__2)
- [2. Data: Data type keywords](#2__20)
- [2.1 Integers](#21__45)
  - [2.2 Floating point numbers](#22__58)
  - [2.3 Distinctions](#23__73)
- [3. Basic Data Types](#3__85)
- [3.1 int types](#31_int_87)
  - [3.1.1 Access to values](#311__95)
    - [3.1.2 Printing](#312__121)
    - [3.1.3 Octal and Hexadecimal](#313__141)
    - [3.1.4 Displaying octal and hexadecimal](#314__148)
  - [3.2 Other integer types](#32__160)
  - [3.2.1 long constants and long long constants](#321_long__long_long__175)
    - [3.2.2 Integer overflow](#322__203)
    - [3.2.3 Printing](#323__222)
  - [3.3 Using characters: char types](#33_char_239)
  - [3.3.1 Declarations](#331__248)
    - [3.3.2 Character constants and initialization](#332__257)
    - [Difficulties (Pitfalls) (P45)](#P45_277)
    - [3.3.3 Non-printing characters](#333__300)
    - [3.3.4 Printing](#334__320)
    - [3.3.5 Symbolized or not (pit)](#335__338)
  - [3.4 \_Bool types](#34__Bool_347)
  - [3.5 Portable types: stdint.h and inttypes.h](#35_stdinth__inttypesh_355)
  - [3.6 float, double and long double](#36_floatdouble__long_double_392)
  - [3.6.1 Declarations](#361__418)
    - [3.6.2 Floating-point constants](#362__428)
    - [3.6.3 Printing](#363__456)
    - [3.6.4 Floating-point value overflow and underflow](#364__488)
  - [3.7 Complex and Imaginary Number Types](#37__519)
  - [3.8 Other types] (#38__535)
  - [3.9 Type sizes] (#39__544)
- [4. Using data types](#4__576)

## 1. Variable and Constant Data

- Constant: set before the program is used and will not change throughout the program's life.
- Variable: may change or be assigned a value during the program runtime

```c
#include <stdio.h>

int main() {
    int i = 1;
    // i: 变量
    // 1: 常量
}
```

## 2. data: data type keyword

| initial keyword | C90 add keyword | C99 add keyword |
| --- | --- | --- |
| int | signed | \_Bool |
| long | void | \_Complex |
| short | | \_Imaginary |
| unsigned | | | | char
| char | | |
| float | | | char
| double | | |

- Bits, Bytes and Words
  - Bit: bit, used to store 0s and 1s
  - Byte: byte
    - 1byte = 8bits
  - Word: word
    - Depending on the number of bits in the operating system, the number of bits is the word length
      - 8-bit system: 1word = 8bits
      - 16-bit system: 1word = 16bits
      - 32-bit system: 1word = 32bits
      - 64-bit system: 1word = 64bits

### 2.1 Integers

| correct | incorrect |
| --- | --- | 2, -23, 2456 | 3.14, 0.22, 2.000 |
| 2, -23, 2456 | 3.14, 0.22, 2.000 |

| 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | | Word length 8 bits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---



### 2.2 Floating Point Numbers

| correct | incorrect |
| --- | --- | 2.75, 3.75
| 2.75, 3.16E7, 7.00, 2e-8 | 7 |

- E/e notation: 3.16E7 = 3.16 \* 10 ^ 7

| + | 0.316 | 8 | | |
| --- | --- | --- | --- |
| symbols | decimals | exponents | |
| + | 0.316 | \* 10 ^ 8 | = 3.16 \* 10 ^ 7 |

### 2.3 Distinctions

| integer | floating point |
| --- | --- |
| without fractional part | with fractional part | with smaller range | with larger range | with smaller range | with larger range | with smaller range | with larger range
| smaller range | larger range | | for some arithmetic calculations (two numbers).
| For some arithmetic calculations (subtracting two large numbers) the loss of precision is small | The loss of precision is large | Actual value | Actual value
| actual value | approximation of actual value | faster | operation
| faster | slower (compensated for by floating point processor on CPU) |

## 3. Basic Data Types

### 3.1 The int type

- Signed integer
- 16 bits
- Range: - 2 ^ 31 ~ 2 ^ 31 - 1

#### 3.1.1 Access to the value

- Assignment

  ```
  int i;
  // 创建内存空间
  i = 1;
  ```
- Getting a value by function

  ```c
  int i;
  scanf("%d", &i);
  ```
- Initialize variables

  ```
  int i = 1;
  // 创建内存空间，并为其赋值
  ```

#### 3.1.2 Printing

```c
#include <stdio.h>

int main() {
  int i = 1;
  int j = 2;

  printf("i = %d, j = %d\n", i, j);
  // i = 1, j = 2
  
  printf("i = %d, j = %d\n", i);
  // i = 1, j = 11604003
  // j为脏数据
}
```

#### 3.1.3 Octal and Hexadecimal

- Octal: starts with 0
- Hexadecimal: starts with 0x or 0X.

#### 3.1.4 Displaying Octal and Hexadecimal

| Symbol | Meaning
| --- | --- | %d | Displaying Numbers in Decimal | %d
| %d | Display digits in decimal |
| %o | displays numbers in octal | %x or %X
| %x or %X | Displays numbers in hexadecimal | %#o | Displays numbers in hexadecimal
| %#o | Display numbers in octal with prefix |
| %#x or %#X | Display numbers in hexadecimal with prefixes |

### 3.2 Other integer types

| Symbol | Meaning |
| --- | --- | short (int) | short (int) | short (int) | short (int)
| short (int) | Less space than int, signed integer, 16-bit | long (int) | More space than int, signed integer, 32-bit | long (int) | Signed integer, 32-bit
| long long (int) | Signed Integer, 32-bit | long long (int) | Signature | Meaning | --- | --- | short (int) | Signed Integer, 16-bit
| long long (int) | takes up more space than long, signed integer, 64-bit | unsigned (int)
| unsigned (int) | unsigned integer, 0 ~ 2^16 - 1 |

- C90 added unsigned long and unsigned short
- C99 adds unsigned long long
- Adding the keyword signed in front of any signed type emphasizes the intent of using a signed type.

#### 3.2.1 long constants and long long constants

- Use the l or L suffix to indicate a long type

  ```
  int i1 = 1;
  // 16位存储

  int i2 = 1l;
  // singned long
  // 32位存储

  int j = 2uL;
  // unsigned long
  ```
- Use the ll or LL suffix to denote the long long type.

  ```
  int i1 = 1;
  // 16位存储

  int i2 = 1l;
  // singned long
  // 32位存储

  int j = 2uL;
  // unsigned long
  ``` Use ll or LL suffix for long long type.

#### 3.2.2 Integer Overflow

```c
#include <stdio.h>

int main() {
	int i = 2147483647;
	int j = 4294967295u;

	printf("%d, %d, %d\n", i, i+1, i+2);
	// 2147483647, -2147483648, -2147483647
	
	printf("%u, %u, %u\n", j, j+1, j+2);
	// 4294967295, 0, 1
}
```

#### 3.2.3 Printing

| Symbol | Meaning |
| --- | --- | %ld | Print in decimal long | --- | %ld | print in decimal
| %ld | print in decimal long | %lx | print in hex long | %lx | print in hex long | %lx | print in hex
| %lx | print in hexadecimal long |
%lo | print in octal long | %hd | print in octal
| %hd | Print in decimal short | %hl | Print in hexadecimal short | %hl | Print in hexadecimal short
| %hl | print in hexadecimal short | %ho | print in octal short | %ho | print in octal long
| %ho | print in octal short | %u | print uns uns unsigned
| %u | print unsigned int | %lu | print unsigned int | %lu | print unsigned int
| %lu | print unsigned long | %lld | print in hexadecimal
| %lld | print in decimal long long | %llu | print unsigned int
| %llu | print unsigned long long | %lld | print in decimal

### 3.3 Working with Characters: the char type

- Storing characters (letters or punctuation)
- **char actually stores an integer rather than a character **
- Computers use numeric codes for characters
- ** must be 1 byte, i.e., 8 bits **

#### 3.3.1 Declarations

```
char a;
char b, c;
```

#### 3.3.2 Character constants and initialization

```
char a = 'A';
// 初始化
// a: 变量
// 'A': 常量

char a = 65;
// 将 ASCII码 65 对应的字符赋值给 a
```

| statements | T / F |
| --- | --- |
| a = 'A'; | T |
| a = 'A'; | F, at which point A is a variable |
| a = 'A'; | F, at which point "A" is a string |

##### Difficulty (Pit) (P45)

- C treats character constants as int types instead of char types
- C treats character constants as int instead of char. int: 32 bits, char: 8 bits.
- The ASCII code of a character constant was stored in a 32-bit memory cell, but now it can be stored in an 8-bit memory cell.

```c
#include <stdio.h>

int main() {
	char a = 'ABCD';
    // 把4个独立的8位ASCII码存储在一个32位存储单元中

	char b = a;
    // 只有最后8位有效

	printf("%c\n", b);
    // D
}
```

#### 3.3.3 Non-printing Characters

| Escape Character | Meaning | Application |
| --- | --- | --- |
| \a | Alarm (ANSI C) | Emits a beep, but does not move the cursor |
| \b | Backspace | | \b
| \f | Page feed | Move active position to start of next page (may display as strange symbol) |
| \n | line feed | move active to start of next line |
| \r | Carriage Return | move active to start of current line |
| \t | Horizontal Tab | Moves active position to next horizontal tab |
| \v | Vertical Tab | Move active to next vertical tab (may show up as strange symbols) |
| \ | Backslash (\) | |
| \' | Single quote | |
| \" | double quotes | | | \?
| \? | question mark | |
| \0oo | Octal (oo is a valid octal number) | Use the character corresponding to the ASCII code for that octal number |
| \xhhh | Hexadecimal (hhh is a valid hexadecimal number) | Use the character corresponding to the ASCII code of the hexadecimal number |

#### 3.3.4 Printing

```c
#include <stdio.h>

int main() {
	char c = ' ';

	scanf("%c", &c);
	// a

	printf("%c = %d\n", c, c);
	// a = 97
}
```

#### 3.3.5 Is there a symbol (pit)

- Different compilers define the symbolic type of char differently.
  - Some compilers implement char as a signed type, char can be expressed in the range of -2^7 ~ 2^7 - 1.
  - Some compilers implement char as an unsigned type, which can be represented as 0 ~ 2^8 - 1.
- Under the C90 standard, C allows the use of signed and unsigned before the keyword char.

### 3.4 \_Bool types

- The C99 standard adds the \_Bool type to represent Boolean values, i.e., logical true and false.
- C uses 1 for true and 0 for false.
- The \_Bool type is actually an integer type, occupying only 1 bit of storage space**.

### 3.5 Portable Types: stdint.h and inttypes.h

- New for C99
- stdint.h and inttypes.h were introduced to ensure that C types function the same way on different systems, since some type names have different functions on different systems.
- stdint.h: aliases for existing type names.

  - The exact-width integer type:

    - C99 provides
    - int32\_t: exact-width 32-bit integer type
    - **May not be supported by the underlying system of the computer
  - Minimum width type (minimum width type):

    - C99 and C11 provide
    - int\_least8\_t: the type with the smallest width among the types that can hold 8-bit signed integer values
  - fastest minimum width type:

    - C99 and C11 provide
    - fastest minimum width type: provided by C99 and C11 int\_fast8\t: the fastest integer type in the system for 8-bit signed values
  - The fastest minimum width type: provided by C99 and C11

    - C99 provides
    - intmax\_t: the largest signed integer type.
    - uintmax\_t: the largest unsigned integer type
- inttypes.h: string macros to display portable types

  - PRId32: prints 32-bit signed descriptions of suitable conversions (d / l)

### 3.6 float, double and long double

- The representation of floating point numbers is similar to scientific notation, i.e., numbers are expressed as decimals multiplied by a power of 10

| Examples | Scientific Notation | Exponential Notation
| --- | --- | --- | ---
| 1000000000 | 1.0 \* 10 ^ 9 | 1.0e9 |
| 123000 | 1.23 \* 10 ^ 5 | 1.23e5 | 322.56 | 322.56 | 1.23e5
| 322.56 | 3.2256 \* 10 ^ 2 | 3.2256e2 |
| 0.000056 | 5.6 \* 10 ^ -5 | 5.6e-5 |

- float: single precision
  - Can represent at least 6 significant digits and has a range of at least 10 ^ -37 ~ 10 ^ 37.
  - Typically, the system takes 32 bits to store a float.
    - 8 bits for the value and sign of the exponent
    - 24 bits for the non-exponential part and its sign
- double: double precision
  - Can represent at least 10 significant digits with a range of at least 10 ^ -37 ~ 10 ^ 37
  - Typically, the system takes 64 bits to store a double.
    - Some systems use all of the extra 32 bits to represent the non-exponential part of the number, increasing the number of significant digits (improving precision) and reducing rounding errors.
    - Some systems use some of the extra 32 bits to represent the exponential part of the number, increasing the range of numbers that can be represented.
- long double: higher precision than double
  - C only guarantees that the long double type has at least the same precision as the double type.

#### 3.6.1 Declarations

_```
float f;
double d;
long double ld;
```

#### 3.6.2 Floating-point constants

- The compiler assumes that floating-point constants are double-precision, which is more accurate, but slows down programs

```
float f;

f = 1.1;
// 1.1: 常量
// double

f = 1.1f;
// float

f = 1.1L;
// long double
```

- C99 adds hexadecimal representation of floating-point constants.
  - Add prefix 0x or 0X to hexadecimal.
  - Replace e and E with p or P, respectively, and powers of 2 with powers of 10.

| 0x | a | .1f | p10 | |
| --- | --- | --- | --- | --- | --- | --- | Hexadecimal
| Hexadecimal | (10 | + 1/16 + 15/256) | \* 2^ 10 | = 10364.0 |

#### 3.6.3 Printing

- The compiler automatically converts float types to double types

| symbol | meaning |
| --- | --- | %f | Prints float and double | in decimal notation.
| %f | Print float and double in decimal notation | %e | Print float and double in exponential notation | %e | Print float and double in exponential notation
%e | Print float and double in exponential notation | %a | Print hexadecimal notation
| %a | Prints floats and doubles in hexadecimal notation | %lf | Prints floats and doubles in hexadecimal notation
| %lf | Prints long float and long double in decimal notation | %e | Prints float and double in exponential notation | %a | Prints float and double in hexadecimal notation

| %a | Print float and double in hexadecimal notation

#### 3.6.4 Floating Point Value Overflow and Underflow

- Overflow:
  - Calculations result in numbers that are too large for the current type.
  - When this happens, C assigns a very large value to the variable and indicates that the value is inf or infinity.

```c
float f = 3.4e38 * 100.0f;

printf("%e\n", f);
// inf
```

- Underflow:
  - A subnormal floating-point value: a calculation that results in a number that is too small, with loss of valid bits at the end.

```c
#include <stdio.h>

int main() {
	float f = 0.1234e-2;

	printf("%f / 10 = %f\n", f, f / 10);
    // 0.001234 / 10 = 0.000123
}
```

- Special floating-point value: NaN, where the behavior of the calculation is undefined.

### 3.7 Complex and imaginary number types

- C99 provides
- Complex numbers:
  - float\_Complex:
    - Contains two values of type float, representing the real part and the imaginary part.
  - double\_Complex
  - long double\_Complex
- Imaginary number:
  - float\_Imaginary
  - double\_Imaginary
  - long double\_Imaginary
- If the complex.h header file is included, you can replace \_Complex with complex and \_Imaginary with imaginary.

### 3.8 Other Types

- Arrays
- Pointer
- Structures
- Union

### 3.9 Type Size

- sizeof(): outputs the size of the specified type in bytes.
- C99 and C11 provide %zd to match the return value type of sizeof().
- Compilers that do not support C99 and C11 can use %u and %lu instead of %zd.

```c
#include <stdio.h>

int main() {
	printf("int : %zd\n", sizeof(int));
	// int : 4

	printf("char : %zd\n", sizeof(char));
	// char : 1

	printf("long : %zd\n", sizeof(long));
	// long : 4

	printf("long long : %zd\n", sizeof(long long));
	// long long : 8
		
	printf("double : %zd\n", sizeof(double));
	// double : 8
	
	printf("long double : %zd\n", sizeof(long double));
	// long double : 8
}
```

## 4. Using Data Types

- Initializing a variable should use a constant type that matches the variable type

| Examples | T / F |
| --- | --- | int i = 1; | T | T | T | T | T | T | T
| int i = 1; | T |
| int i = 1.0; | F, can be assigned, not recommended |
| int i = 1.5; | F, can be assigned, will only keep integer bits |
| float f = 3.1415926536; | F, may warn, will only keep 6 valid digits |