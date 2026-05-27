## 1. Strings and String I/O

- A **string** is a char array terminated by a null character (\0)

```
char a[5] = "abc";
char* b = "ABC";

puts("123");
puts(a);
puts(b);
```

- Like the printf() function, the puts() function is part of the stdin.h family of input/output functions
- Unlike the printf() function, the puts() function only displays the string and automatically appends a newline character to the end of the displayed string

### 1.1 Defining Strings in a Program

- The program must ensure there is sufficient space to store the string

#### 1.1.1 String Literals (String Constants)

- Content enclosed in double quotes is called a **string literal**, also known as a **string constant**
- The characters within the double quotes and the `\0` character automatically appended by the compiler are both stored in memory as a string
- If string literals are not separated by spaces or are separated by whitespace characters, C treats them as concatenated string literals

  ```
  char c[5] = "a""b" "c"
      		"d";
  // 等效于
  char c[5] = "abcd";
  ```

- String constants belong to the **static storage class**. If a string constant is used within a function, the string is stored only once and exists for the entire lifetime of the program, even if the function is called multiple times
- Content enclosed in double quotes is treated as a pointer to the storage location of that string; this is similar to treating an array name as a pointer to the array’s location

  ```c
  char c[5] = "abc";

  printf("%s, %p, %c\n", c, c, *c);
  // abc, 008FFA70, a
  ```

#### 1.1.2 String Arrays and Initialization

- When defining a string array, you must inform the compiler of the required memory size
- The first method is to store the string in an array with sufficient space: `

  ```
  char c[5] = "abc";
  ```

` - This form of initialization is much simpler than standard array initialization: `

  ```
  char c[5] = { 'a', 'b', 'c', '\0' };
  ```

` - Note the terminating null character
  - Without a terminating null character, this is not a string but an array of characters
  - When specifying the array size, ensure the number of elements is at least one more than the string length (to accommodate the null character)
  - All unused elements are automatically initialized to 0
- The second method: Let the compiler determine the array size

  ```
  char c[] = "abc";
  ```

- Functions that process strings typically do not know the array size; they determine where the string ends by searching for the null character at the end
  - Allowing the compiler to calculate the array size is only valid when initializing the array
  - If you create an array to be filled later, you must specify its size at declaration
- Third method: Create a string using pointer notation

  ```
  char* c = "abc";

  c == &c[0];
  *c == 'a';
  *(c + 1) == 'b';
  ```

#### 1.1.3 Arrays and Pointers

- Differences between array and pointer forms

  - Array form
    - Allocated in computer memory as an array containing elements (each element corresponds to a character, plus a terminating null character ‘\0’), with each element initialized to the character corresponding to the string literal
    - The string is stored in the data segment as part of the executable file; when the program is loaded into memory, the strings in the program are also loaded
    - The string is stored in **static memory**
    - Memory is allocated for this array only when the program begins execution; at this point, the string is copied into the array
    - At this point, there are two copies of the string
      - One is the string literal in static memory
      - The other is the string stored in the array
    - Thereafter, the compiler treats the array name as an alias for the address of the array’s first element
    - In array notation, the array name is an **address constant**
    - The array name cannot be changed; changing it would alter the array’s storage location (address)
  - Pointer notation
    - This also causes the compiler to reserve an equivalent amount of space for the string in static storage
    - Additionally, once the program begins execution, it allocates a storage location for the pointer variable and stores the address of the string in that pointer variable
    - The variable initially points to the first character of the string, but its value can be changed

  ```c
  char a[5] = "abc";
  char* b = "abc";

  printf("%#x\n", a);
  // 0x8ff9c4

  printf("%#x\n", b);
  // 0xac7ce4

  printf("%#x\n", "abc");
  // 0xac7ce4
  ```

#### 1.1.4 Differences Between Arrays and Pointers

```
char a[5] = "abc";
char* b = "abc";

// a: 常量
// b: 变量
```

- Key differences between the two

  - An array name is a constant
  - A pointer name is a variable
- Practical usage

  - Both can use array notation

    ```
    a[0] == 'a';
    b[0] == 'a';
    ```

- Both support pointer addition

    ```
    *(a + 1) = 'b';
    *(b + 1) = 'b';
    ```

- Only pointer notation supports increment operations

    ```
    *(++b) = 'b';
    ```

- Modifying the information of elements in an array

    - The **elements** of an array are variables (unless declared with `const`)
    - The **array name** is a constant
    - Does not modify string constants

    ```
    a[0] = 'A';
    ```

- Changes the information pointed to by the pointer

    - Modifies string literals

    ```
    b[0] = 'A';
    ```

#### 1.1.5 String Arrays

```
char* a[2] = { "abc", "ABC" };
char b[2][5] = { "abc", "ABC" };
```

- The two are very similar in some respects

  - When using a single index, both represent a string

    ```
    a[0] == "abc";
    b[0] == "abc";
    ```

- When using two indices, both represent a single character

    ```
    a[0][0] == 'a';
    b[0][0] == 'a';
    ```

- Initialization methods are the same
- Differences between the two

  - Pointer representation:
    - Is an array containing pointers
    - A pointer points to the location of the string literals used during initialization; these string literals are stored in static memory
  - Array representation:
    - An array of arrays
    - The array stores copies of the string literals, so each string is stored twice
    - Memory allocation is inefficient
    - Each element must be the same size, and the size must be large enough to store the longest possible string

### 1.2 Pointers and Strings

- The vast majority of string operations are performed using pointers

```c
char* a = "abc";
char* b;

b = a;

printf("a = %s, &a = %#x, value = %#x\n", a, &a, a);
// a = abc, &a = 0xaff7b0, value = 0xcd7ce4

printf("b = %s, &b = %#x, value = %#x\n", b, &b, b);
// b = abc, & b = 0xaff7a4, value = 0xcd7ce4
```

- Typically, a program only needs to know the address to perform an operation

## 2. String Input

- To read a string into a program, you must first reserve space to store the string, then use an input function to retrieve it

### 2.1 Allocating Space

- When reading a string, the computer does not calculate its length before allocating space

  ```c
  char* c;
  scanf("%s", c);
  // 编译器给出警告
  ```

- `scanf()` requires copying data to the address specified by the parameter, which is an uninitialized pointer at that point; the parameter could point to any location
- Method 1: Specify the array size when declaring it

  ```
  char c[5];
  ```

- Method 2: Use C library functions to allocate memory (supplemented in Chapter 12)
- After allocating memory for the string, you can read the string
- The C library provides several functions for reading strings: scanf(), gets(), and fgets()

### 2.2 The Unfortunate gets() Function

- The gets() function reads an entire line of input until it encounters a newline character, then discards the newline, stores the remaining characters, and appends a null character to the end of these characters to form a C string
- It is often used in conjunction with the puts() function, which displays a string and appends a newline character at the end

```
char c[5];

puts("Enter str:");
gets(c);
puts(c);
```

- Some compilers issue warnings when the gets() function is used during compilation
- Issues with the get() function

  - The get() function’s only argument is an array address; it cannot verify whether the array is large enough to hold the input line
  - The get() function only knows the starting point of the array; it does not know how many elements the array contains
- If the input string is too long, it can cause a **buffer overflow**, where excess characters overflow the designated storage space
- If the extra characters only occupy unused memory, no immediate problem will occur
- If they overwrite other data in the program, it can lead to abnormal program termination or other security issues

### 2.3 Alternatives to gets()

- In the past, fgets() was used as an alternative to gets(). The fgets() function is slightly more complex and handles input differently from gets()
- The gets_s() function, introduced in C11, can also replace gets()
  - This function is more similar to gets() and can replace existing gets() calls in code
  - However, it is an optional extension within the stdio.h I/O function set, so even C11-compatible compilers may not support it

#### 2.3.1 The fgets() Function (and fputs())

- The fgets() function addresses overflow issues by limiting the number of characters read via its second parameter
- This function is specifically designed for handling file input, so it may not be suitable for general-purpose use
- The difference between fgets() and gets()

  - The second argument of the fgets() function specifies the maximum number of characters to read
    - If the parameter is n, fgets() will read n-1 characters, or until it encounters the first newline character
  - If fgets() reads a newline character, it stores it in the string
    - This differs from gets(), which discards the newline character
  - The third parameter of the fgets() function’s third argument specifies the file to read from
    - If reading data from the keyboard, use stdin (**standard input**) as the argument; this identifier is defined in stdio.h
- The fgets() function is typically used in conjunction with the fputs() function, unless the function does not append a newline character to the end of the string
- The second argument of the fputs() function specifies the file to which it will write
- To display output on the computer screen, use stdout (**standard output**) as this argument

```
char c[5];

fputs("Enter str:", stdout);
fgets(c, 5, stdin);
fputs("str:", stdout);
fputs(c, stdout);
```

- The fputs() function returns a pointer to a char
- If executed normally, the address returned by the function is the same as the first argument passed to it
- However, if the function reaches the end of the file, it returns a special pointer: **null pointer**
- This pointer is guaranteed not to point to valid data, so it can be used to identify this special case
- In code, it can be replaced with the number 0, though in C it is more common to use the macro `NULL`

```c
char c[5];

fputs("Enter str:", stdout);

while (fgets(c, 5, stdin) != NULL && c[0] != '\n')
{
    fputs(c, stdout);
}
```

- Iterating over a string (similar to iterating over a custom buffer with Java I/O streams)
- Buffered I/O
- This means that user input is stored in a temporary storage area (buffer) until the user presses the Return key
- Pressing the Return key adds a newline character to the input and sends the entire line to `fgets()`
- For output, `fputs()` sends characters to another buffer; when a newline character is sent, the contents of the buffer are displayed on the screen
- Advantages and disadvantages of `fputs() Advantages and Disadvantages of Storing Newline Characters

  - Advantage: For stored strings, checking for a newline character at the end can determine whether an entire line has been read
  - Disadvantage: Users may not want newline characters stored in the string, and such newlines can cause issues

##### Null Character and Null Pointer

- Null character (‘\0’)
  - A character used to mark the end of a C string; its character code is 0
  - Since no other character can have a code of 0, it cannot be part of a string
- Null pointer (NULL)
  - A value that does not correspond to a valid address of any data
  - Typically, functions use it to return a valid address to indicate that a specific condition has occurred
- The null character is an integer type (1 byte), while the null pointer is a pointer type (4 bytes)
- Reasons why the two are easily confused
  - Both can be represented by the numerical value 0
  - Conceptually, they are different types of 0

#### 2.3.2 The gets_s() Function

- The gets_s() function is similar to fgets(), using a single parameter to limit the number of characters read
- Differences between gets_s() and fgets()

  - gets_s() reads data only from standard input
  - If gets_s() encounters a newline character, it discards it
  - If gets_s() reads the maximum number of characters without encountering a newline character, it performs the following steps:
    - Sets the first character of the destination array to a null character, then reads and discards subsequent input until a newline character or the end of the file is encountered
    - Returns a null pointer
    - Calls an implementation-dependent "handler function," which may terminate or exit the program
- Applicability of gets(), fgets(), and gets_s()

  - If the destination storage area is large enough:
    - All three functions work normally
    - However, fgets() retains the newline character at the end of the input as part of the string; additional code is required to replace it with a null character
  - If the destination storage area is too small:
    - gets() is unsafe; it overwrites existing data, posing a security risk
    - gets_s() is safe, but if you do not want the program to terminate or exit, you must use a "handling function"
      - Additionally, if you intend for the program to continue running, gets_s() will discard the remaining characters of that input line
    - fgets() is the easiest to use and allows for different handling methods

### 2.4 The scanf() Function

- The difference between scanf() and gets() or fgets() lies in how they determine the end of a string

  - scanf() has two methods for determining the end of input
    - Using the %s format specifier, it treats the next whitespace character (empty line, space, tab, or newline) as the end of the string (the string does not include the whitespace character)
    - If a width is specified, it reads the specified number of characters or stops at the first whitespace character
  - gets() and fgets() read all characters up to the first newline character
- Depending on the nature of the input data, using fgets() to read data from the keyboard is more appropriate
- A typical use of scanf() is to read and convert mixed data types into a standard format
- Like gets(), scanf() also has some potential drawbacks

  - If the input line is too long, scanf() can also cause data overflow
  - Using a field width in the %s conversion specifier can prevent overflow

## 3. String Output

- C has three standard library functions for printing strings: puts(), fputs(), and printf()

### 3.1 The puts() Function

- The puts() function is easy to use; simply pass the address of the string as an argument to it

```
puts("abc");
```

- When puts() stops: It stops outputting when it encounters a null character

### 3.2 The fputs() Function

- Differences between fputs() and puts()
  - The second argument of the fputs() function specifies the file to which data is to be written
    - To print to the screen, use stdout (**standard output**), defined in stdio.h, as this argument
  - Unlike puts(), fputs() does not add a newline character at the end of the output
- gets() discards the newline character in the input, while puts() adds a newline character to the output
- fgets() preserves the newline character in the input, while fputs() does not add a newline character to the output

### 3.3 The printf() Function

- Like puts(), printf() also takes the address of a string as its argument
- printf() can format different data types
- Unlike puts(), printf() does not automatically append a newline character to the end of each string

## 4. String Functions

- ANSI C places the prototypes for these string-handling functions in the string.h header file
- The most commonly used functions include strlen(), strcat(), strcmp(), strncmp(), strcpy(), strncpy(), and sprintf() (additional)

### 4.1 The strlen() Function

- Counts the length of a string

```c
char a[5] = "abc";
printf("%d\n", strlen(a));
```

### 4.2 The strcat() Function

- Used to concatenate strings; it takes two strings as arguments
- Appends the contents of the second string to the end of the first string, returning the resulting concatenated string as the result; the second string remains unchanged
- The strcat() function is of type char* (pointer to char)
- The strcat() function returns the address of the first argument—that is, the address of the first string after the second string has been appended

```
char a[5] = "abc";
char b[5] = "ABC";
strcat(a, b);
puts(a);
puts(b);
```

### 4.3 strncat() Function

- The strcat() function cannot check whether the first array can accommodate the second string
- If the space allocated for the first array is insufficient, problems will arise when excess characters overflow into adjacent memory locations
- The third parameter of the strncat() function specifies the maximum number of characters to be appended

```
char a[5] = "abc";
char b[5] = "ABC";
strncat(a, b, 1);
puts(a);
puts(b);
```

### 4.4 The strcmp() Function

- Determines whether the contents of two strings are equal
- If the two string arguments are identical, the function returns 0; otherwise, it returns a non-zero value

```c
char a[5] = "abc";
char b[5] = "ABC";
printf("%d\n", strcmp(a, b));
```

#### 4.4.1 Return Value of strcmp()

- On some systems, it returns the relative order of the two strings

```
strcmp("a", "a") == 0;
strcmp("a", "c") == -1;
strcmp("c", "a") == 1;
strcmp("ab", "a") == 1;
```

- On other systems, it returns the difference between the ASCII codes of the two strings

```
strcmp("a", "a") == 0;
strcmp("a", "c") == -2;
strcmp("c", "a") == 2;
strcmp("ab", "a") == 98;
```

#### 4.4.2 strncmp() Function

- Allows you to limit the comparison length

```
strcmp("abc", "abd") == -1;
strncmp("abc", "abd", 2) == 0;
```

### 4.5 The strcpy() and strncpy() Functions

- Copies the entire string
- The copied string is called the **destination** string

```c
char a[5] = "abc";
char b[5] = "ABC";
strcpy(a, b);
printf("%s\n", a);
// ABC
```

#### 4.5.1 Other Properties of strcpy()

- Important Properties
  - The return type of `strcpy()` is `char*`; the function returns the value of the first argument, i.e., the address of the first character
  - The first argument does not need to point to the beginning of an array; this property can be used to copy a portion of an array

```c
char a[5] = "abc";
char b[5] = "ABC";
strcpy(a + 1, b);
printf("%s\n", a);
// aABC
```

#### 4.5.2 A More Prudent Choice: `strncpy()`

- strcpy() cannot verify whether the destination space can accommodate a copy of the source string
- strncpy() is safer; the third parameter of this function specifies the maximum number of characters to be copied

```c
char a[5] = "abc";
char b[5] = "ABC";
strncpy(a, b, 1);
printf("%s\n", a);
// Abc
```

### 4.6 The sprintf() Function

- The sprintf() function is declared in stdio.h
- This function writes data into a string and can combine multiple elements into a single string
- The first argument of `sprintf()` is the address of the destination string

```c
char a[5] = "abc";
char b[5] = "ABC";
sprintf(a, "%.1s%s", a, b);
printf("%s\n", a);
// aABC
```



### 4.7 Other String Functions

- ````
  char* strchr(char* str, char c);
  ```

`

  - Returns a pointer to the first occurrence of a character in the string
  - Returns a null pointer if the character is not found in the string
- ````
  char* strbrk(char* str1, char* str2);
  ```

`

  - Returns a pointer to the first occurrence of `s2` in `s1` if `s1` contains any character from `s2`
  - Returns a null pointer if no character from `s2` is found in `s1`
- ````
  char* strrchr(char* str, char c);
  ```

`

  - Returns a pointer to the last occurrence of `s1` in `s2`
  - Returns a null pointer if `s1` is not found in `s2`
-```
  char* strstr(char* str1, char* str2);
  ```

- Returns a pointer to the starting position of the string s2 within the string s1
  - If the string s2 is not found in s1, returns a null pointer

## 5. ctype.h Character Functions and Strings

- Character functions cannot process strings, but they can process characters within strings

```c
char a[5] = "abc";
char* b;

b = a;

while (*b)
{
    *b = toupper(*b);
    b++;
}

printf("%s", a);
```