#### Catalog

- [1. Introduction to strings](#1__2)
- [1.1 Arrays of char types and null characters](#11_charnull_4)
  - [1.2 Working with strings](#12__26)
  - [Strings and characters](#_42)
  - [1.3 The strlen() function](#13_strlen_51)
- [2. Constants and the C preprocessor](#2_C_72)
- [2.1 const qualifiers](#21_const__98)
  - [2.2 Explicit constants](#22__109) - [2.1 const qualifiers](#21_const__98) - [2.2 Explicit constants](#22__109)
- [3. printf() and scanf()](#3_printfscanf_157)
- [3.1 The printf() function](#31_printf_166)
  - [3.2 Using printf()](#32_printf_190)
  - [3.3 Conversion note modifiers for printf()](#33_printf_204)
  - [Example of using modifiers and flags](#_230)
  - [3.4 Meaning of conversion descriptions](#34__286)
  - [3.4.1 Conversion mismatches](#341__288)
    - [Parameter passing](#_317)
    - [3.4.2 Return value of printf()](#342_printf_339)
    - [3.4.3 Printing longer strings](#343__345)
  - [3.5 Using scanf()](#35_scanf_364)
  - [3.5.1 Input from a scanf() perspective (pit)](#351_scanf_417)
    - [3.5.2 Normal characters in format strings (memory principle unknown)](#352__448)
    - [3.5.3 Return value of scanf()](#353_scanf__469)
  - [3.6 The \* qualifier for printf() and scanf()](#36_printf__scanf____475)
  - [3.7 Usage hints for printf()](#37_printf_514)

## 1. Introduction to strings

### 1.1 Arrays of char types and the null character

- C does not have a special variable type for storing strings. Strings are stored in arrays of type char.
- The array consists of consecutive storage cells, and the characters in a string are stored in neighboring storage cells, one character per cell.

| a | | b | c | \0 |
| --- | --- | --- | --- | --- | --- |
| | 1 byte per storage cell | | | null character |

- \0: null character, used by C to mark the end of a **string**.
- The size of the array must be 1 more than the number of characters in the string to be stored.

```
char c;
// 分配1个字节

char c[5];
// 分配5个字节
```

### 1.2 Working with Strings

- C uses %s to print strings

```c
#include <stdio.h>

int main() {
	char c[5] = "abc";

	printf("%s\n", c);
}
```

#### strings and characters

| Character ('a') | String ("a") |
| --- | --- |
| Basic type (char) | Derived type (array of chars) |
| 1 character composition ('a') | 2 character composition ('a' and \0) |

### 1.3 The strlen() function

- The strlen() function: gives the length of the characters in a string.

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

- The strlen() function knows where to stop and will not count null characters in the

## 2. Constants and the C preprocessor

- With symbolic constants, you only need to change the definition of the symbolic constant, instead of having to look up where the constant is used in your program and change it one by one.
- Creating symbolic constants

  - Declaring variables and assigning them values

    ```
    int i = 1;
    ```

    - Problem: Programs may inadvertently change the value of a variable
  - C preprocessor

    ```c
    #define i 1
    ```

    - All i's in the program are replaced with 1's in a process called compile-time substitution.
    - When the program is run, all substitutions in the program have been made.
    - Constants defined in this way are also called manifest constants.

### 2.1 Const qualifiers

- The const keyword was added to C90 to qualify a variable as read-only.
- Read-only: can be calculated, printed, but not modified.

```
const int i = 1;
```

### 2.2 Explicit constants

- limits.h: provides detailed information about size limits for integer types.

| explicit constants | meaning |
| --- | --- | CHAR\_BIT | Bits of type char | BITS OF TYPE char
| CHAR\_BIT | Number of bits for char type |
| CHAR\_MAX | Maximum value of char type |
| CHAR\_MIN | Minimum value of type char |

- The above CHAR can be replaced by other constants.

| explicit constants | meaning |
CHAR | char type | meaning | --- | --- | CHAR | char type | char type | char type
CHAR | char type | SCHAR | signed char type | SCHAR | signed char type | CHAR
CHAR | signed char type | SCHAR | signed char type | UCHAR | unsigned char type | UCHAR | unsigned char type
SCHAR | signed char type | UCHAR | unsigned char type | SHRT | short type | SHRT | short type
| UCHAR | unsigned char type | SHRT | short type |
| USHRT | unsigned char type | | INT | int type
UINT | unsigned char | UINT | unsigned char | UCHAR | unsigned char | UCHAR | unsigned char
| UINT | unsigned int type | LONG | long type
UINT | unsigned int type | LONG | long type | ULONG | unsigned char type | ULONG | unsigned char type
LLONG | long long type | ULONG | unsigned long type | LLONG | long long type | LLONG | long long type
ULLONG | unsigned long type | LLONG | long long type | ULLONG | unsigned long type
LLONG | long long type | ULLONG | unsigned long long type | ULLONG | unsigned long long type | LLONG | long long type

- float.h: provides detailed information about size limits for float types

| explicit constants | meaning |
| --- | --- | float.h.
| FLT\_MANT\_DLG | Trailing digits for float types |
| FLT\_DIG | Minimum number of significant digits (decimal) of float type |
| FLT\_MIN\_10\_EXP | Minimum negative exponent of float type with all significant digits (in base 10) |
| FLT\_MAX\_10\_EXP | Maximum positive exponent of float type with all significant digits (base 10) |
| FLT\_MIN | Minimum positive exponent of float type with full precision reserved |
| FLT\_MAX | Maximum positive number of type float |
| FLT\_EPSILON | Difference between 1.00 and the smallest float type value greater than 1.00 |

- The above FLT can be replaced with other constant names

| explicit constants | meaning |
FLT | float type | Meaning | --- | --- | FLT | float type | FLT | float type
FLT | float type | DBL | double type | DBL
FLT | float type | DBL | double type | LDBL | long type | FLT
FLT | float type | DBL | double type | LDBL | long double type | FLT | long double type

## 3. printf() and scanf()

- I/O Functions
- printf(): output function
- scanf(): input function

### 3.1 The printf() function

| Conversion Description | Output |
| --- | --- | %a | Floating point, hexadecimal and
| %a | Floating point, hexadecimal, and p notation (C99 / C11) | %a
| %A | Floating-point, hexadecimal and p notation (C99 / C11) |
| %c | Single Characters | %d | Signed Characters
| %d | Signed decimal integers |
| %e | Floating point, e notation | %e | Floating point, e notation | %e | Floating point, e notation
| %e | Floating point, e notation | %f | Floating point, e notation | %f | Floating point, e notation
| %f | Floating point, decimal notation | %g | Floating point, decimal notation
| %g | Automatically selects %f or %e depending on the value; %e format is used for exponents less than -4 or greater than or equal to precision | %G | Floating-point, decimal notation
| %G | Automatically selects %f or %E depending on the value; %E format is used for exponents less than -4 or greater than or equal to precision | %i | Signed
| %i | signed decimal integer (same as %d) | %o | unsigned integer (same as %d)
| %o | unsigned octal integer | %p | pointer
| %p | Pointer | %s | String
| %s | String | %u | Unsigned decimal integer
| %u | Unsigned decimal integer | %x | Unsigned decimal integer | %x | Unsigned decimal integer (same as %d)
| %x | Unsigned hexadecimal integer, using hexadecimal number 0f |
| %X | Unsigned hexadecimal integer, use hexadecimal number 0F |
| %% | Prints a percent sign |

### 3.2 Using printf()

```c
#include <stdio.h>
#define i 10

int main() {
	printf("%c %d %%\n", '$', 2 * i);
	// $ 20 %
}
```

### 3.3 Conversion description modifiers for printf()

| modifiers | meaning | example |
| --- | --- | --- |
| mark | mark | "%-10d" |
| Numbers | Minimum field width If the field cannot hold the number or string to be printed, the system uses a wider field | "%4d" |
| . Numbers | Accuracy For %e, %E, and %f conversions, indicates the number of digits to the right of the decimal point For %g and %G conversions, indicates the maximum number of valid digits For %s conversions, indicates the maximum number of characters to be printed For Integer conversions, indicates the minimum number of digits of a number to be printed | "%5.2f" prints a floating-point number The width of the field is 5 characters, where there are 2 digits after the decimal point |
| h | Used with integer conversion instructions to represent values of type short int or unsigned short int | "%hu", "%hx", "%6.4hd" |
| hh | Used in conjunction with an integer conversion note to represent a value of type signed char or unsigned char | "%hhu", "%hhx", "%6.4hhd" |
| j | Used in conjunction with the integer conversion instructions to represent values of type intmax\_t or uintmax\_t These types are defined in stdint.h | "%jd", "%8jx" |
| l | Used in conjunction with integer conversion descriptions to indicate values of type long int or unsigned long int | "%ld", "%8lu" |
| ll | Used with integer conversion instructions to represent values of type long long int or unsigned long long int (C99) | "%lld", "%8llu" |
| L | Used in conjunction with the floating point conversion instructions to represent values of type long double | "%Lf", "%10.4Le" |
| t | Used with integer conversion instructions to denote values of type ptrdiff\_t ptrdiff\_t is the type of the difference between 2 pointers (C99) | "%td", "%12ti" |
| z | Used with integer conversion description to indicate a value of type size\_t size\_t is the type returned by sizeof | "%zd", "%12zd" |

| Marker | Meaning | Example |
| --- | --- | --- | --- | ---
| - | The item to be printed is left-aligned, i.e. the item is printed from the left side of the field | "%-20s" |
| + | Signed values that are positive are preceded by a plus sign Signed values that are negative are preceded by a minus sign | "%+6.2f" | Space | Signed values that are positive are preceded by a plus sign
| space | If signed value is positive, display leading space in front (no sign) If signed value is negative, display minus sign in front | "% 6.2f" |
| # | Convert the result to another form Start with 0 if %o Start with 0 if %x or %X Start with 0x or 0X For all floating-point formats, print a decimal character even if it is not followed by any digits For %g and %G, prevent 0 from being removed after the result | "%#o", "%#8.0 f", "%+#10.3e" | 0 | For numeric values, print a decimal character as well.
| 0 | For numeric values, fill field widths with leading zeros instead of spaces For integer formats, ignore the - flag if it appears or specifies precision | "%010d", "%08.3f" |

#### Examples of using modifiers and flags

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

### 3.4 Meaning of conversion instructions

#### 3.4.1 Conversion mismatch

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

##### Parameter passing

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

- The first %ld gets the first 4 bytes of f. The second %ld gets the last 4 bytes of f.
- The second %ld gets the last 4 bytes of f. The third %ld gets the last 4 bytes of d.
- The third %ld gets the last 4 bytes of d.
- The fourth %ld gets the last 4 bytes of d.

#### 3.4.2 Return Value of printf()

- The return value of the printf() function is the number of characters printed.

#### 3.4.3 Printing Longer Strings

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

### 3.5 Using scanf()

| printf() | scanf() |
| --- | --- |
| Argument list: variables, constants, and expressions | Pointer to variable |

- If scanf() is used to read the value of a basic variable type, add & to the variable name.
- If scanf() is used to read a string into a character array, do not use &.

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

| Conversion Notes | Meaning |
| --- | --- | %c | Characters | %c
| %c | Characters |
| %d | Signed decimal integers |
| %e, %f, %g, %a | Floating-point numbers (C99 adds %a) | %e, %f, %g, %a
| %e, %f, %g, %a | Floating point numbers (%A new for C99) | %i | Signed decimal integers
| %i | Signed decimal integer | %o | Signed decimal integer | %o | Signed decimal integer | %o | Signed decimal integer
| %o | Signed octal integers | %p | Pointers
| %p | pointer (address) | %s | string from
| %s | String All characters starting from the first non-white space character to the next white space character |
| %u | Unsigned decimal integer |
| %x, %X | Signed hexadecimal integers |

| modifiers | meaning | examples |
| --- | --- | --- |
| \* | Suppress Assignment | "%\*d" |
| Numbers | Maximum Field Width Input reaches the maximum field width, or stops at the 1st encounter with a blank character | "%10s" |
| hh | Read integer as signed char or unsigned char type | "%hhd", "%hhu" |
| ll | Read integer as long long or unsigned long long type (C99) | "%lld", "%llu" |
| h, l, or L | read integer as short, long type | "%hd", "%ld" |
| j | Use intmax\\_t or uintmax\_t type (C99) | "%jd", "%ju" |
| z | Use sizeof return value type (C99) | "%zd", "%zo" |
| t | Use type representing difference between 2 pointers (C99) | "%td", "%tx" |

#### 3.5.1 Input from a scanf() perspective (pit)

- scanf() fetches data from the buffer
- scanf() will feed all the input data into the buffer, fetch the data in the buffer according to the input conditions, and delete the fetched data from the buffer
- If there is any data left after the input is fetched, the data is retained and fetched from the buffer the next time scanf() is used, and no more input is performed.
- The next time scanf() is used, it fetches the data from the buffer and no more input is performed.
- scanf() automatically adds '\0' to the end of the character sequence when it feeds string type data into the execution array

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

#### 3.5.2 Ordinary Characters in Format Strings (Memory Principle Unknown)

- The user needs to strictly follow the format of the format string in scanf()

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

#### 3.5.3 Return Value of scanf()

- The scanf() function returns the number of items successfully read.

### 3.6 The \* qualifier for printf() and scanf()

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

### 3.7 Usage hints for printf()

- Use fixed field widths that are large enough to make the output neat and nice looking.

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

- Nest a number in text, specifying a field less than or equal to the width of the number

```c
#include <stdio.h>

int main() {
	printf("ABC %10.2f abc\n", 1.234);
	// ABC       1.23 abc

	printf("ABC %.2f abc\n", 1.234);
	// ABC 1.23 abc
}
```