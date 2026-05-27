#### Catalog

- [1. single character I/O: getchar() and putchar()](#1_IOgetchar__putchar_2)
- [2. buffer](#2__14)
- [3. end keyboard input](#3__32)
- [3.1 Files, streams and keyboard input](#31__34)
  - [3.2 Ending files](#32__48)
- [4. Redirection and files](#4__75)
- [4.1 UNIX, Linux, and DOS redirection](#41_UNIXLinux__DOS__85)
  - [4.1.1 Redirecting input](#411__92)
    - [4.1.2 Redirecting output](#412__113) - [4.1.3 Combined redirection of output](#412__113)
    - [4.1.3 Combined redirection](#413__128)
- [5. Creating a more user-friendly interface](#5__144)
- [5.1 Using buffered inputs](#51__146)
  - [5.2 Mixing numeric and character input](#52__193)

## 1. single-character I/O: getchar() and putchar()

```
char c;
while((c = getchar()) != '#')
{
    putchar(c);
}
```

## 2. buffers

- Displaying a character entered by the user and then repeating the character immediately after printing it is **unbuffered (or direct) input**, i.e., the program that is waiting for it can use the entered character immediately.
- The character just entered is not repeated until the ENTER key is pressed, this form of input is **buffered**.
- The characters typed by the user are collected and stored in a temporary storage area called a **buffer** (buffer), and the program can use the characters typed by the user only after the ENTER key is pressed.
- Reasons for using a buffer
  - Transmitting a number of characters as a block saves time rather than sending them one by one.
  - If the user makes a typo, the error can be corrected directly from the keyboard; when the ENTER key is pressed, the correct input is transmitted.
- Buffering is divided into two categories
  - **Fully buffered I/O**:
    - The buffer is flushed when it is full (the content is sent to the destination), usually found in file inputs
    - Common sizes are 512 and 4096 bytes
  - **Line Buffered I/O**:
    - Flushes the buffer when a line break occurs
    - Keyboard input is usually line-buffered, so the buffer is flushed only after the ENTER key is pressed.

## 3. End keyboard input

## 3.1 Files, Streams, and Keyboard Input

- \*\*File\*\* is an area of memory where information is stored.
- Usually files are stored in some kind of permanent memory (hard disk, flash drive, or DVD, etc.)
- C has a number of library functions for opening, reading, writing and closing files

  - At a lower level, C can work directly with files using the basic file tools of the host operating system; these direct calls to operating system functions are called **low-level I/O**
  - At a higher level, C can also process files through the \*\*standard I/O package\*\*; this involves creating a standard model for processing files and a set of standard I/O functions; at this level, specific C implementations are responsible for dealing with the differences between systems (which store files differently) in order to allow the user to use a uniform The interface
- You can check for line breaks with if (c == '\n'), and even if the system actually uses a combination of carriage returns and line breaks to mark the end of a line, the I/O functions will convert between the two representations.
- Conceptually, C programs deal with **streams** rather than directly with files
- A stream is an idealized stream of actual input or output mappings; this means that different attributes and different kinds of input are represented by streams with more uniform attributes; thus, the process of opening a file is to associate a stream with a file, and reading and writing are done through streams

### 3.2 End of file

- The computer operating system has to determine the beginning and end of a file in some way.
- Methods of detecting file endings:

  - Put a special character at the end of the file to mark the end of the file. CTRL + Z is considered an end-of-file marker.
  - Storing information about the size of the file, in this way you can store all the characters in the file, including CTRL + Z.
- In C, reading a file with getchar() returns a special value when it detects the end of the file, i.e., **EOF (end of file)**.

  - The scanf() function also returns EOF when it detects the end of the file.
  - Typically, EOF is defined in the stdio.h file

  ```c
  #define EOF (-1)
  ```

  - **Reason for -1**: the getchar() function usually returns values between 0 and 127, which corresponds to the standard character set; if the system recognizes the extended character set, the function may return values between 0 and 255; in either case, -1 doesn't correspond to any character, so the value can be used to mark the end of a file.
- On most UNIX and Linux systems, pressing CTRL + D at the beginning of a line transmits an end-of-file signal.
- On other systems, pressing CTRL + Z at the beginning of a line, or anywhere, transmits the end-of-file signal.

## 4. Redirection and Files

- Programs can use files in two ways
  - Explicitly using specific functions to open a file, close a file, read a file, and write to a file.
  - Designing programs that can interact with the keyboard and screen through different channels **Redirection** Input to a file and output from a file
    - reassign stdin streams to files
    - Continue to use the getchar() function to get data from the input stream, but don't care where in the stream you get the data from

### 4.1 UNIX, Linux, and DOS Redirection

- Redirecting input lets a program use a file for input instead of the keyboard.
- Redirecting output lets the program output to a file instead of the screen

#### 4.1.1 Redirecting Input

- A **text file** is a file containing text, where the data stored is in characters that we can recognize.

  - The contents of the file can be text or a C program
  - Files containing machine language instructions (files storing executable programs) are not text files.

  ```
  ./ABC < words
  // 名为 ABC.exe 的可执行文件
  // 名为 words 的文本文件
  ```
- The < symbol is the redirection operator for UNIX and DOS / Windows.

  - This operator associates the file with the stdin stream, importing the contents of the file into the program.
  - The program itself doesn't know (doesn't care) whether the input comes from the file or from the keyboard, it only knows that it is a stream of characters to be imported, so it reads them and prints them one by one on the screen until it reaches the end of the file.

#### 4.1.2 Redirecting Output

```
./ABC > words
// 名为 ABC.exe 的可执行文件
// 名为 words 的文本文件
```

- The > symbol is also a redirection operator.
  - Creates a new text file and redirects the output of the program to that file.
  - Redirection assigns the stdout stream from the display device to the text file.
    - If a file of the same name already exists, it is common to erase the contents of that file and replace it with the new one.

#### 4.1.3 Combined Redirection

```
./ABC < words > new_words
// 等效于
./ABC > new_words < words
```

- Dumping a text file into another text file by a program
- Principles of Combinatorial Redirection:
  - The redirection operator connects an **executable** program (including standard operating system commands) to a data file; it cannot be used to connect a data file to another data file, or a program to another program
  - You cannot read input from more than one file or direct output to more than one file using the redirect u operator
  - Normally, a space between the filename and the operator is not required, except for occasional use in command-line prompt mode with special meaning characters

## 5. Creating a more user-friendly interface

## 5.1 Using buffered input

```c
int i = 0;
printf("i = %d\n", i);
while(getchar() != 'y')
{
    printf("i = %d\n", ++i);
}

// 优化

int i = 0;
printf("i = %d\n", i);
while (getchar() != 'y')
{
    printf("i = %d\n", ++i);
    while (getchar() != '\n')
    {
        continue;
    }
}

// 优化

int i = 0;
char c = ' ';
printf("i = %d\n", i);
while ((c = getchar()) != 'y')
{
    if (c == 'n')
    {
        printf("i = %d\n", ++i);
    }else
    {
        printf("Error\n");
    }
    
    while (getchar() != '\n')
    {
        continue;
    }
}
```

### 5.2 Mixing numeric and character inputs

- Both getchar() and scanf() can handle input, but you can't mix them!
  - getchar(): reads every character, including spaces, tabs, and newlines.
  - scanf(): skips spaces, tabs, and newlines when reading.

```c
int length = 0;
int width = 0;
char c = ' ';

while ((c = getchar()) != EOF)
{
    if (c == '\n')
    {
        continue;
    }
    scanf("%d %d", &length, &width);
    for (int i = 1; i <= length; i++)
    {
        for (int j = 1; j <= width; j++)
        {
            putchar(c);
        }
        putchar('\n');
    }
}
```