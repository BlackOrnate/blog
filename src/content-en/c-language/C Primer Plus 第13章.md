#### Table of Contents

- [1. Communicating with Files](#1__2)
- - [1.1 What Are Files?](#11__9)
  - [1.2 Text Mode and Binary Mode](#12__16)
  - [1.3 Levels of I/O](#13_IO__38)
  - [1.4 Standard Files](#14__46)
- [2. Standard I/O](#2__IO_63)
- - [2.1 Checking Command-Line Arguments](#21__72)
  - [2.2 The fopen() Function](#22_fopen__104)
  - [2.3 The getc() and putc() Functions](#23_getc__putc__137)
  - [2.4 End of File](#24__161)
  - [2.5 The fclose() Function](#25_fclose__191)
  - [2.6 Pointers to Files](#26__208)
- [3. File Copying](#3__221)
- [4. File I/O: fprintf(), fscanf(), fgets(), and fputs()](#4__IOfprintf_fscanf_fgets__fputs_276)
- - [4.1 The fprintf() and fscanf() Functions](#41_fprintf__fscanf__278)
  - [4.2 The fgets() and fputs() Functions](#42_fgets__fputs__300)
- [5. Random Access: fseek() and ftell()](#5_fseek__ftell_329)
- - [5.1 How fseek() and ftell() Work](#51_fseek__ftell__338)
  - [5.2 Portability](#52__369)
  - [5.3 The fgetpos() and fsetpos() Functions](#53_fgetpos__fsetpos__386)
- [6. The Mechanics of Standard I/O](#6__IO__408)
- [7. Other Standard I/O Functions](#7__IO__433)
- - [7.1 The int ungetc() Function](#71_int_ungetc__435)
  - [7.2 The int fflush() Function](#72_int_fflush__447)
  - [7.3 The int setvbuf() Function](#73_int_setvbuf__459)
  - [7.4 Binary I/O: fread() and fwrite()](#74__IO_fread__fwrite_467)
  - [7.5 size_t fwrite() Function](#75_size_t_fwrite__471)
  - [7.6 The size_t fread() Function](#76_size_t_fread__479)
  - [7.7 The int feof() and int ferror() Functions](#77_int_feof__int_ferror__487)

## 1. Communicating with Files

- The process by which a program reads information from a file or writes information to a file is known as file redirection (Chapter 8)
- You can open a file in a program and then use special I/O functions to read information from the file or write information to it

### 1.1 What Is a File?

- **A file** is typically a named storage area on a disk or solid-state drive
- C treats a file as a sequence of contiguous bytes, each of which can be read individually

### 1.2 Text Mode and Binary Mode

- Text content and binary content, text file formats and binary file formats, as well as a file’s text mode and binary mode
- All file contents are stored in binary form
- If a file originally uses binary-encoded characters to represent text, it is a text file containing text content
- If the binary values in a file represent machine code, numerical data, images, or music encoding, it is a binary file containing binary content
- To standardize the management of text files, C provides two ways to access files

  - **Binary mode**
    - Programs can access every byte of the file
  - **Text mode**
    - The content seen by the program differs from the actual content of the file
    - Maps the end of a line or the end of the file as represented by the local environment to C mode
- In addition to reading and writing text files in text mode, text files can also be read and written in binary mode

### 1.3 Levels of I/O

- Two levels of I/O
  - **Low-level I/O**: Uses basic I/O services provided by the operating system
  - **Standard high-level I/O**: Defined by the standard C library and the stdio.h header file

### 1.4 Standard Files

- A C program automatically opens three files
  - **Standard Input (standard input)**
    - The system’s general input device, typically the keyboard
    - Provides input to the program
    - The file used by getchar() and scanf()
  - **Standard Output (standard output)**
    - The system’s standard output device, typically the display
    - The program writes to standard output
    - The file used by putchar(), puts(), and printf()
  - **Standard error output**
    - The system’s standard error output device, typically the display
    - Provides a logically distinct location for error messages

## 2. Standard I/O

- Three advantages over low-level I/O
  - Portability
  - Many specialized functions simplify handling different I/O operations
  - Both input and output are **buffered**

### 2.1 Checking Command-Line Arguments

```c
int main(int argc, char* argv[]) {
    if (argc != 2) { // 查看是否有命令行参数
        printf("%s\n", argv[0]);
        exit(EXIT_FAILURE);
    }
    return 0;
}
```

- The exit() function closes all open files and terminates the program

  - A program that terminates normally returns 0; a program that terminates abnormally returns a non-zero value
  - The C standard requires 0 or the macro EXIT_SUCCESS to indicate a successful termination, and the macro EXIT_FAILURE to indicate a failed termination
  - These macros and the exit() prototype are all located in the stdlib.h header file
- Using `return` in the initial call to `main()` has the same effect as calling `exit()`

  ```python
  return 0;
  // 等效于
  exit(0);
  ```

- If `main()` is inside a recursive function, `exit()` will still terminate the program, while `return` will only transfer control to the parent recursive level
- Calling `exit()` from other functions can also terminate the entire program

### 2.2 The `fopen()` Function

- The fopen() function is used to open a file

  - Declared in stdio.h
  - The first argument is the name of the file to be opened / the address of a string containing the filename
  - The second argument is a string specifying the mode of the file to be opened
- fopen() mode strings

| Mode String | Meaning |
| --- | --- |
| “r” | Open the file in read mode |
| “w” | Open the file in write mode; truncate the length of the existing file to 0; if the file does not exist, create a new file |
| “a” | Open the file in write mode; append content to the end of the existing file; if the file does not exist, create a new file |
| “r+” | Open the file in update mode (allows reading and writing) |
| “w+” | Open the file in update mode; if the file exists, reset its length to 0; if the file does not exist, create a new file |
| “a+” | Open the file in update mode, appending content to the end of the existing file; if the file does not exist, create a new file |
| “rb”, “wb”, “ab”, “rb+”, “r+b”, “wb+”, “w+b”, “ab+”, “a+b” | Similar to the previous modes, but opens the file in binary mode rather than text mode |
| “wx”, “wbx”, “w+x”, “wb+x”, or “w+bx” | (C11) Similar to non-x modes, but opening the file fails if the file already exists or is opened in exclusive mode |

- After the program successfully opens the file, `fopen()` returns a **file pointer**, which other I/O functions can use to specify the file
- The file pointer is a pointer to `FILE`, a derived type defined in `stdio.h`
- The file pointer does not point to the actual file; it points to a data object containing file information, including buffer information used by I/O functions that operate on the file
- I/O functions in the standard library use buffers, so they need to know not only the location of the buffer but also how much of the buffer has been filled and which file is being operated on
- Standard I/O functions use this information to determine when to refill or clear the buffer as needed
- The data object pointed to by the file pointer contains this information

### 2.3 The getc() and putc() Functions

- The getc() and putc() functions are similar to the getchar() and putchar() functions
  - You must tell the getc() and putc() functions which file to use
    - putc()
      - 1st argument: The character to be written
      - 2nd argument: File pointer

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

### 2.4 End of File

- A program reading data from a file must stop when it reaches the end of the file
- If the getc() function encounters the end of the file while reading a character, it returns a special value, EOF
- A C program only detects the end of the file when it reads past the end of the file

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

### 2.5 The fclose() Function

- The fclose() function closes the file specified by the file pointer and flushes the buffer if necessary
- You should check whether the file was successfully closed

  ```c
  FILE* f;
  if (fclose(f) != 0) {
      printf("Error: %s \n", argv[1]);
  }
  ```

- Calling the fclose() function may fail if the disk is full, the removable disk is removed, or an I/O error occurs

### 2.6 Pointers to Standard Files

- The stdio.h header file associates three file pointers with three standard files; C programs automatically open these three standard files
- Standard files and their associated file pointers

| Standard File | File Pointer | Typically Used Device |
| --- | --- | --- |
| Standard Input | stdin | Keyboard |
| Standard Output | stdout | Display |
| Standard Error | stderr | Display |

## 3. File Copying

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

## 4. File I/O: fprintf(), fscanf(), fgets(), and fputs()

### 4.1 The fprintf() and fscanf() Functions

- Operate similarly to printf() and fscanf()
- The fprintf() and fscanf() functions require the first argument to specify the file to be processed

  ```c
  FILE *f;
  char c[10];

  fprintf(stdout, "abc\n");
  fprintf(f, "abc\n");
  fscanf(stdin, "%s", c);
  fscanf(f, "%s", c);
  ```

- The rewind() function returns the program to the beginning of the file, facilitating the use of a while loop to print the entire file’s contents

### 4.2 fgets() and fputs() Functions

- fgets() function

  - The first argument specifies the address of the input location
  - The second argument specifies the size of the string to be read (the space it occupies)
  - The third argument specifies the file to be read

  ```
  char *c;
  char *file;
  fgets(c, 40 * sizeof(char), file)
  ```

- The fputs() function

  - The first argument specifies the address of the string
  - The second argument specifies the file pointer

  ```
  char *c;
  char *file;
  fputs(c, file);
  ```

## 5. Random Access: fseek() and ftell()

- The fseek() function treats the file as an array and moves the cursor to a specified byte position within the file opened by fopen()
  - Returns a value of type int
- ftell()
  - Returns a value of type long, indicating the current position in the file

### 5.1 How fseek() and ftell() Work

- fseek()

  - 1st argument: FILE pointer

    - Points to the file to be searched; the file should already be open via fopen()
  - 2nd argument: **offset**

    - The distance to move from the starting point
    - This parameter must be a `long` value and can be positive (move forward), negative (move backward), or 0 (no movement)
  - Third argument: Mode

    - Determines the starting point
    - Manifest constants for modes

      | Mode | Starting point of offset |
      | --- | --- |
      | SEEK_SET | Beginning of file |
      | SEEK_CUR | Current position |
      | SEEK_END | End of file |
- The `ftell()` function returns a `long` value representing the number of bytes from the beginning of the file to the current position pointed to by the parameter

### 5.2 Portability

- In binary mode, the implementation need not support the SEEK\_END mode

  - A more portable approach is to read the entire file byte by byte until the end of the file
- In text mode, only the following calls guarantee their behavior

  | Function Call | Effect |
  | --- | --- |
  | fseek(file, 0L, SEEK_SET) | Move to the beginning |
  | fseek(file, 0L, SEEK_CUR) | Keep the current position |
  | fseek(file, 0L, SEEK_END) | Move to the end of the file |
  | fseek(file, ftell-pos, SEEK_SET) | Moves to a position ftell-pos bytes from the beginning of the file, where ftell-pos is the return value of ftell() |

### 5.3 The fgetpos() and fsetpos() Functions

- Positioning functions for large files
- These two functions do not use long-type values to represent positions; instead, they use: fpos_t(file position type)
  - The fpos_t type is not a primitive type; it is defined based on other types
  - Variables or data objects of type fpos_t can specify a position within a file; they cannot be array types

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

## 6. Mechanism of Standard I/O

- Step 1
  - Call fopen() to open a file
  - fopen() not only opens a file but also creates a buffer and a structure containing information about the file and the buffer data
  - fopen() returns a pointer to this structure so that other functions know where to find it
  - If the file is opened in text mode, a text stream is obtained
  - If the file is opened in binary mode, a binary stream is obtained
- Step 2
  - Call an input function
  - When the function is called, a block of data the size of the buffer is copied from the file into the buffer
  - The initial call to the function not only fills the buffer but also sets the values in the structure pointed to by the file pointer
- Step 3
  - The input function reads data from the buffer as required
  - While reading the file, the file position indicator is set to point to the character following the one just read
  - Any subsequent function call will resume from the point where the previous function call left off
- Step 4
  - When the input function detects that all characters in the buffer have been read, it requests that the next block of data, equal to the buffer size, be copied from the file into that buffer
  - After reading the last character in the buffer, the function sets the end-of-file indicator to true; the next time the input function is called, it will return EOF
- Step 5
  - The output function writes data to the buffer in a similar manner
  - When the buffer is full, the data is copied to the file

## 7. Other Standard I/O Functions

### 7.1 The int ungetc() Function

```
int ungetc(char c, FILE *F);
```

- Returns the specified character to the output stream
- If returned, the next call to a standard input function will read that character
- If multiple characters from a line are returned to the input stream, the order in which the next input function reads the characters will be the reverse of the order in which they were returned

### 7.2 The int fflush() Function

```
int fflush(FILE *F);
```

- Sends all unwritten data in the output buffer to the output file specified by the file pointer
  - This process is called **flushing the buffer**
- If the file pointer is a null pointer, all output buffers are flushed

### 7.3 The int setvbuf() function

```
int setvbuf(FILE *restrict F, char *restrict c, int i, size_t size);
```

### 7.4 Binary I/O: fread() and fwrite()

### 7.5 The size_t fwrite() function

```
size_t fwrite(const void *restrict ptr, size_t size, size_t nmemb, FILE *restrict F);
```

### 7.6 The size_t fread() function

```
size_t fread(void *restrict ptr, size_t size, size_t nmemb, FILE *restrict F);
```

### 7.7 The int feof() and int ferror() functions

```
int feof(FILE *F);
```



```
int ferror(FILE *F);
```