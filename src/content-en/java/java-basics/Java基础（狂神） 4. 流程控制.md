#### Catalog

- [1. User Interaction Scanner](#1_Scanner_2)
- [2. Sequence Structure](#2__72)
- [3. Selection Structures](#3__80)
- [4. loop structure](#4__177)
- [5. break continue](#5_break_continue_253)

## 1. User Interaction Scanner

- Scanner object

  - Getting user input
  - Syntax

    ```java
    Scanner s = new Scanner(System.in);
    ```
  - Get the input string through the next() and nextLine() methods of the Scanner class. Before reading, we generally need to use hasNext() and hasNextLine() to determine whether there is still input data.
  - next():

    - Read a valid character before the end of the input
    - The next() method automatically removes any white space encountered before a valid character is entered.
    - The next() method automatically removes any whitespace encountered before a valid character is entered, and only after a valid character is entered will the whitespace following it be used as a separator or terminator.
    - next() can not get the string with a space

    ```java
    import java.util.Scanner;

    public class demo {
        public static void main(String[] args) {
            // 创建一个扫描器对象，用于接收键盘数据
            Scanner scanner = new Scanner(System.in);

            // 判断用户是否输入字符串
            if (scanner.hasNext()){
                // 使用next方法接收
                String str = scanner.next();
                System.out.println("a" + str);
            }

            // IO流的类不关闭会一直占用资源，需要及时关闭
            scanner.close();
        }
    }
    ```
  - nextLine():

    - Enter as the terminator, returns all the characters before the carriage return is entered.
    - Can get blank

    ```java
    import java.util.Scanner;

    public class demo {
        public static void main(String[] args) {
            // 创建一个扫描器对象，用于接收键盘数据
            Scanner scanner = new Scanner(System.in);

            // 判断用户是否输入字符串
            if (scanner.hasNextLine()){
                // 使用nextLine方法接收
                String str = scanner.nextLine();
                System.out.println("a" + str);
            }

            // IO流的类不关闭会一直占用资源，需要及时关闭
            scanner.close();
      }
    }
    ```.

## 2. Sequential structures

- The basic structure of Java, executed one sentence at a time, in order.
- The simplest algorithmic structure
- The simplest algorithmic structure is the one that is essential to any algorithm.

## 3. selection structure

- if single choice structure

  - Syntax:

    ```
    if(布尔表达式){
        // 布尔表达式为true将执行的语句
    }
    ```

  ```java
  import java.util.Scanner;

  public class demo {
      public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);
          String str = scanner.nextLine();

          // equals: 判断字符串是否相等
          if (str.equals("tacit")){
              System.out.println(str);
          }

          scanner.close();

      }
  }
  ```
- if double-select structure

  - Syntax:

    ```
    if(布尔表达式){
        // 布尔表达式为true将执行的语句
    }else{
        // 布尔表达式为flase将执行的语句
    }
    ```
- if multiple choice structure

  - Syntax:

    ```
    if(布尔表达式 1){
        // 布尔表达式 1为true将执行的语句
    }else if(布尔表达式 2){
        // 布尔表达式 2为true将执行的语句
    }else if(布尔表达式 3){
        // 布尔表达式 3为true将执行的语句
    }else{
        // 布尔表达式为flase将执行的语句
    }
    ```
- Nested if Structures

  - Syntax:

    ```
    if(布尔表达式 1){
        // 布尔表达式 1为true将执行的语句
        if(布尔表达式 2){
            // 布尔表达式 2为true将执行的语句
        }
    }
    ```
- switch multiselect structure

  - Variables in a switch statement:

    - byte, short, int, char
    - String (starting with Java SE 7)
    - case labels must be string constants or literals
  - Syntax:

    ```
    switch(expression){
        case value:
            // 语句
            break; // 可选
        case value:
            // 语句
            break; // 可选
        default: // 可选
            // 语句
    }
    ```

## 4. loop structure

- while loop

  - Syntax:

    ```
    while(布尔表达式){
        // 循环内容
    }
    ```
  - As long as the boolean expression is true, the loop will keep executing.
  - There are a few cases where the loop needs to be executed all the way through, for example, when the server listens for requests and responses.
- do...while loop

  - Syntax:

    Syntax: ```
    do{
        // 代码语句
    }while(布尔表达式);
    ```
  - Difference between while and do...while:

    - do...while executes first and then judges.
    - do...while guarantees that the loop will be executed at least once.
- for loop

  - syntax:

    ```
    for(初始化;布尔表达式;更新){
        // 代码语句
    }
    ```
- Enhanced for loops (introduced in Java 5)

  - Syntax:

    ```
    for(声明语句 : 表达式){
        // 代码语句
    }
    ```
  - Statement:

    - Declares a new local variable whose type must match that of the array element.
    - Its scope is limited to the loop statement block, and its value is equal to the value of the array element at that time.
  - Expression: The expression is the name of the array to be accessed, or a method whose return value is an array.

  ```java
  public class demo {
      public static void main(String[] args) {
          // 定义数组
          int[] numbers = {1, 2, 3, 4, 5};

          // 遍历数组的元素
          for (int i : numbers) {
              System.out.println(i);
          }

      }
  }
  ```

## 5. break continue

- break is used to force an exit from a loop.
- continue is used to terminate a loop.