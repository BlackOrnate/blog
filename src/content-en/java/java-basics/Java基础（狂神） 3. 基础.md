#### Catalog

- [1. Notes](#1__2)
- [2. Identifiers and Keywords](#2__11)
- [3. Data Types](#3__24) [4.
- [4. Data Type Extensions](#4__56) [5. Type Conversions](#5_6)
- [5. Type conversion](#5__84) [6.
- [6. Variables, constants, scopes](#6__108)
- [7. Basic Operators] (#7__128)
- [8. Self-adding and self-decreasing operators](#8__140) [9. Package mechanisms](#9__129)
- [9. Package Mechanisms](#9__147) [10.
- [10. JavaDoc Generation Documentation](#10_JavaDoc_155)

## 1. annotations

- There are three types of comments in Java:
  - Single-line comments: //
  - Single-line comments: // Multi-line comments: /\* \*/
  - Documentation annotations: /\*\* \*/

## 2. identifiers and keywords

- All components of Java need names
- Class names, variable names, and method names are called identifiers
- Note:
  - All identifiers should start with a letter, dollar sign, or underscore.
  - The first character can be followed by any combination of letters, dollar signs, underscores, or numbers.
  - **No keywords can be used as variable or method names
  - Identifiers are case sensitive
  - Chinese naming is allowed

## 3. Data types

- Strongly typed languages
  - Requires variables to be used in a strict manner, all variables must be defined before they can be used.
- Weakly Typed Languages
- Java's data types are divided into two categories
  - Primitive types
    - Numeric types
      - Numeric types Integer types
        - byte: 1 byte, -128~127
        - short: 2 bytes, -32768~32767
        - byte: 1 byte, -128~127 short: 2 bytes, -32768~32767
        - long: 8 bytes
      - Floating point
        - float: 4 bytes
        - double: 8 bytes
      - Character type
        - char: 2 bytes
    - boolean types:
      - true and false: 1 byte
  - Reference type
    - Classes
    - interface
    - Array
- Byte
  - Bit: the smallest unit of **data storage** within a computer.
  - Byte: the basic unit of **data processing** in a computer.
  - 1Byte = 8 bit
  - Characters: letters, numbers, words and symbols used in computers

## 4. data type extensions

- Binary: 0b
- Decimal
- Octal: 0
- Hexadecimal: 0x
- JDK7: Numbers can be separated by underscores.
- Floating Point Extensions

  - BigDecimal math utility class
  - float: finite discrete rounding error approximately close to but not equal to
  - Comparisons using exclusively floating-point numbers
- Character extensions

  - Forced conversion: (numeric type) character
  - Escape character
    - \t: Tab
    - \n: newline character

## 5. Type conversion

- Type conversion is needed to perform partial arithmetic operations

  Byte, short, char - > int - > long - > float - > double
- In operations, data of different types are converted to the same type first, and then the operation is performed.
- Forced type conversion

  - (type) Variable name
  - High - > Low
- Automatic type conversion

  - Low - > High
- Note

  - Boolean values cannot be converted.
  - Cannot convert an object to a disjoint type

## 6. Variables, constants, scopes

- Every variable must have its type declared
- A Java variable is the most basic storage unit in a program, and its elements include the variable name, variable type, and scope.
- The elements are the variable name, the variable type, and the scope.
  - Every variable has a type, which can be either a basic type or a reference type.
  - The variable name must be a legal identifier
- The variable name must be a legal identifier.
  - Class variables
  - Instance variables
    - The default value is 0.0.0 if not initialized.
    - Boolean value defaults to false
    - All are null except for basic types
  - Local variables
- Constants
  - After the value is set, it is not allowed to be changed during the program operation.
  - Names of constants are usually written in uppercase

## 7. Basic Operators

- Arithmetic operators: +, -, \*, /, %, ++, -.
- Assignment operators: =
- Relational operators: >, <, >=, <=, ==, ! = instanceof
- Logical operators: &&, ||, !
- Bitwise operators: &, |, ^, ~, >>, <<, >>>.
- Conditional operators: ? =
- Extended Assignment Operators: +=, -=, \*=, /=

## 8. self-adding and self-decreasing operators

- a++: a = a + 1, after code execution, first assignment, then self-incrementation
- ++a: self-increment, then assignment before code execution

## 9. Package mechanism

- Namespace used to distinguish class names
- Syntax: package pkg1. pkg2. pkg3
- Adopt the principle of domain inversion: www. bilibili. com -> com. bilibili. www

## 10. JavaDoc generates documentation

- javadoc -encoding UTF-8 -charset UTF-8 Full name of file
- Generate your own API documentation
- Parameter Information

  - @author: author's name
  - @version: version number
  - @since: indicates the earliest version of jdk to be used.
  - @param: name of parameter
  - @return: return value case
  - @throws: the case where the exception is thrown