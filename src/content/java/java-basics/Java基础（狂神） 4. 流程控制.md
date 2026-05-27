#### 目录

- [1. 用户交互Scanner](#1_Scanner_2)
- [2. 顺序结构](#2__72)
- [3. 选择结构](#3__80)
- [4. 循环结构](#4__177)
- [5. break continue](#5_break_continue_253)

## 1. 用户交互Scanner

- Scanner对象

  - 获取用户输入
  - 语法

    ```java
    Scanner s = new Scanner(System.in);
    ```
  - 通过Scanner类的next()与nextLine()方法获取输入的字符串，在读取前我们一般需要使用hasNext()与hasNextLine()判断是否还有输入的数据
  - next()：

    - 读取到有效字符后才可以结束输入
    - 对输入有效字符之前遇到的空白，next()方法会自动将其去除
    - 输入有效字符后才将其后面输入的空白作为分隔符或者结束符
    - next()不能得到带有空格的字符串

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
  - nextLine()：

    - 以Enter为结束符，返回的是输入回车之前的所有字符
    - 可以获得空白

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
    ```

## 2. 顺序结构

- Java的基本结构，按照顺序一句一句执行
- 最简单的算法结构
- 是任何一个算法都离不开的一种基本算法结构

## 3. 选择结构

- if单选择结构

  - 语法：

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
- if双选择结构

  - 语法：

    ```
    if(布尔表达式){
        // 布尔表达式为true将执行的语句
    }else{
        // 布尔表达式为flase将执行的语句
    }
    ```
- if多选择结构

  - 语法：

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
- 嵌套的if结构

  - 语法：

    ```
    if(布尔表达式 1){
        // 布尔表达式 1为true将执行的语句
        if(布尔表达式 2){
            // 布尔表达式 2为true将执行的语句
        }
    }
    ```
- switch多选择结构

  - switch语句中的变量：

    - byte, short, int, char
    - String(从Java SE 7开始)
    - case标签必须为字符串常量或字面量
  - 语法：

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

## 4. 循环结构

- while 循环

  - 语法：

    ```
    while(布尔表达式){
        // 循环内容
    }
    ```
  - 只要布尔表达式为true，循环就会一直执行下去
  - 少部分情况需要循环一直执行，例：服务器的请求响应监听等
- do…while 循环

  - 语法：

    ```
    do{
        // 代码语句
    }while(布尔表达式);
    ```
  - while与do…while的区别：

    - while先判断后执行，do…while先执行后判断
    - do…while保证循环体会被至少执行一次
- for 循环

  - 语法：

    ```
    for(初始化;布尔表达式;更新){
        // 代码语句
    }
    ```
- 增强for循环（Java5引入）

  - 语法：

    ```
    for(声明语句 : 表达式){
        // 代码语句
    }
    ```
  - 声明语句：

    - 声明新的局部变量，该变量的类型必须和数组元素的类型匹配
    - 其作用域限定在循环语句块，其值与此时数组元素的值相等
  - 表达式：表达式是要访问的数组名，或者是返回值为数组的方法

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

- break用于强行退出循环
- continue用于终止某次循环过程