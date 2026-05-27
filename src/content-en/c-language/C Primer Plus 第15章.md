#### Catalog

- [1. Binary, bits and bytes](#1__2)
- [1.1 Binary Integers](#11__13)
  - [1.2 Signed Integers](#12__27) - [1.3 Binary Floating Point Numbers](#12__27)
  - [1.3 Binary Floating Point Numbers](#13__45)
  - [1.3.1 Binary decimals](#131__53)
    - [1.3.2 Floating-Point Representation](#132__67)
- [2. Other decimal numbers](#2__73)
- [2.1 Octal](#21__79)
  - [2.2 Hexadecimal](#22__106) - [3.
- [3. C PERPOSITIVE OPERATORS](#3_C__141)
- [3.1 Bitwise Logic Operators](#31__145)
  - [3.1.1 Binary inverse or per-bit inversion: ~](#311__151)
    - [3.1.2 Bitwise AND: &](#312__166)
    - [3.1.3 Per-bit or: |](#313__182)
    - [3.1.4 Per-position different or: ^](#314__198)
  - [3.7 Shift operators](#37__214)
  - [3.7.1 Left shift: <<](#371__218)
    - [3.7.2 Right shift: >>](#372__235)
    - [3.7.3 Usage: shift operators](#373__252)
- [4. Bit fields](#4__260)

## 1. Binary, Bit, and Byte

- A number expressed in base 2 is called a **binary number**.

```
1		  1		 	0		  1
1 * 2^3 + 1 * 2^2 + 0 * 2^1 + 1 * 2^0 = 13
```

### 1.1 Binary integers

- The C language uses **byte** to indicate the size required to store the system character set

  - 1 byte = 8 bits
- Different ways of interpreting a byte (8 bits) ** bit pattern **

  - unsigned char : 0000 0000 ~ 1111 1111 = 0 ~ 255
  - signed char : 1000 0000 ~ 0111 1111 = -128 ~ 127

### 1.2 Signed integers

- **sign-magnitude** Representation: 1 bit\\*\*high-order bit\*\*\*stores the sign, the remaining 7 bits represent the number itself.

  - 1111 1111 ~ 0111 1111 = -127 ~ 127
  - There are two zeros:
    - 0000 0000 = +0
    - 1000 0000 = -0
- **Binary Complement (two's-complement)** method: inverse, plus 1

  - 1111 1111 ~ 0111 1111 = -128 ~ 127
- **Binary inverse (one's-complement)** Method: Inverse

  - 1000 0000 ~ 0111 1111 = -127 ~ 127
  - There are two zeros:
    - 0000 0000 = +0
    - 1111 1111 = -0

### 1.3 Binary Floating Point Numbers

- Floating point numbers are stored in two parts
  - Binary decimals
  - Binary exponent

#### 1.3.1 Binary Decimals

- Power of 2 as denominator

```
1	  0		1
1/2 + 0/4 + 1/8 = 0.625
```

- Many fractions cannot be represented accurately as binary decimals.
  - Can only accurately represent the sum of multiple powers of 1/2

#### 1.3.2 Floating-Point Representation

- Some bits store the binary fraction, other bits store the exponent

## 2. other decimal numbers

- The octal and hexadecimal notation systems are commonly used

## 2.1 Octal

- Octal refers to the octal notation system.
- It is a system of octal notation in which numbers are expressed in base 8.

```
4		  5			1
4 * 8^2 + 5 * 8^1 + 1 * 8^0 = 297
```

- Each octal bit corresponds to 3 binary bits.

  - Binary bits equivalent to octal bits

    | octal bits | binary equivalent |
    | --- | --- | 0 | 000 | 0 | 000 | 0 | 000
    | 0 | 000 |
    | 0 | 000 | 1 | 001 |
    | 0 | 000 | 1 | 001 | 2 | 010 |
    | 3 | 011 |
    4 | 100 | 5 | 101 | 2
    5 | 101 | 6 | 110 | 10
    6 | 110 | 7 | 111 | 10
    | 7 | 111

### 2.2 Hexadecimal

- Hexadecimal (hexadecimal or hex)** refers to the hexadecimal notation system
- Hexadecimal (hexadecimal or hex)** refers to the hexadecimal notation system

```
A			3			F
10 * 16^2 + 3 * 16^1 + 15 * 16^0 = 2623
```

- Each hexadecimal bit corresponds to 4 binary bits.

  - Decimal, Hexadecimal and Equivalent Binary Bits

    | decimal | hexadecimal | equivalent binary |
    | --- | --- | --- |
    | 0 | 0 | 0000 |
    | 0 | 0 | 0000 | 1 | 1 | 0001 |
    2 | 2 | 0010 | 3 | 3 | 3 | 0
    | 2 | 2 | 0010 | 3 | 3 | 0011 | 3 | 0011
    4 | 4 | 0100 | 5 | 5 | 5 | 5
    | The following is a summary of the findings of the study.
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues since the last meeting of the Committee on Constitutional Affairs
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working on the following issues
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working closely with the Government of the Hong Kong Special Administrative Region (HKSAR) on the development of a new system for the protection of human rights.
    | The following is a summary of the work done by the Administration in the past three years.
    | The Government of the Hong Kong Special Administrative Region (HKSAR) has been working closely with the Government of the People's Republic of China (PRD) to develop a comprehensive strategy for the development of the HKSAR.
    15 | F | 1111 | 12 | C | 1100

## C Positional Operators

### 3.1 Bitwise Logical Operators

- **Bitwise** operations: operations are performed on each bit, without affecting the left and right bits.

#### 3.1.1 Binary inverse or inverse by bit: ~

- turns a 1 into a 0 and a 0 into a 1.
- Operators do not change the original value

_```c
char c = 0b10011010;
~c;
printf("%d\n%d\n", c, ~c);
// ~(1001 1010) = -102
//   0110 0101  = 101
```_.

#### 3.1.2 Bitwise and: &

- 1 only if same as 1

```c
char c1 = 0b10010011;
char c2 = 0b00111101;
printf("%d\n", c1 & c2);
// 1001 0011
// 0011 1101
// &
// 0001 0001
```

#### 3.1.3 Bitwise or: |

- If there is 1, then it is 1

```c
char c1 = 0b10010011;
char c2 = 0b00111101;
printf("%d\n", c1 | c2);
// 1001 0011
// 0011 1101
// |
// 1011 1111
```

#### 3.1.4 Bitwise different or: ^

- 1 if different

```c
char c1 = 0b10010011;
char c2 = 0b00111101;
printf("%d\n", c1 ^ c2);
// 1001 0011
// 0011 1101
// ^
// 1010 1110
```

### 3.7 Shift Operators

#### 3.7.1 Left Shift: <<

- Shifts the object to the left of the operator to the left by the number of bits specified by the object to the right.
- The operator does not change the original value

```c
char c = 0b10001010;
c << 2;
printf("%d\n%d\n", c, c << 2);
// 00 1000 1010
// 10 0010 1000
//    高位截断
//    0010 1000
```

#### 3.7.2 Shift Right: >>

- Shifts the object to the left of the operator to the right by the number of bits specified by the object to the right
- The operator does not change the original value

```c
char c = 0b10001010;
c >> 2;
printf("%d\n%d\n", c, c >> 2);
// 1000 1010
// 1110 0010 10
// 低位截断
// 1110 0010
```

#### 3.7.3 Usage: Shift Operators

- Provides fast multiplication and division to powers of 2
  - number << n : Multiply number by the nth power of 2.
  - number >> n : if number is non-negative, divide number by the nth power of 2

## 4. Bit Fields

- A bit field** is a set of adjacent bits in a variable of type signed int or unsigned int.
- It is created by a structure declaration

```c
struct {
    int a : 1;
    int b : 2;
    int c : 3;
} abc;
// abc 为包含 3 个 1 位的字段

abc.a = 0;
abc.c = 1;
// 由于字段位数为 1 ，所以只能赋值为 0 或 1
```

- If the total number of bits in the declaration exceeds the number of bits in an int (unsigned int as well), the next int memory location is used.

  - In this case, an unnamed "hole" is left in the first int.
  - The unnamed "hole" can be "filled" with the width of the unnamed field.
  - Use an unnamed field with a width of 0 so that the next field is stored in the next int

  ```c
  struct {
      int a : 1;
      int   : 2;
      int b : 2;
      int   : 0;
      int c : 3;
  } abc;
  // a 和 b 之间有一个 2 位的空隙
  // c 将存储在下一个 int z
  ```