#### 目录

- [1. 什么是方法](#1__2)
- [2. 方法的定义和调用](#2__40)
- [3. 方法的重载](#3__102)
- [4. 命令行传递参数](#4__145)
- [5. 可变参数](#5__170)
- [6. 递归讲解](#6__200)

## 1. 什么是方法

- java 方法是语句的集合，它们在一起执行一个功能

  - 方法是解决一类问题的步骤的有序集组合
  - 方法包含于类或对象中
  - 方法在程序中被创建，在其他地方被引用
- 设计方法的原则：

  - 方法的本意是功能块，就是实现某个功能的语句块的集合
  - 设计方法的时候，最好保持方法的原子性
    - 原子性：一个方法只完成一个功能，有利于后期的扩展

```java
public class Test {
    public static void main(String[] args) {
        System.out.println(add(1, 2));
        System.out.println("~~~~~~");
        abc();
    }

    public static int add(int x, int y) {
        return x + y;
    }

    public static void abc(){
        for (int i = 0; i < 100; i++) {
            System.out.println(i);
        }
    }
}
```

## 2. 方法的定义和调用

- java 的方法类似于其他语言的函数，是一段**用来完成特定功能的代码片段**
- **方法包含一个方法头和一个方法体**

  - **修饰符**：
    - 可选的，告诉编译器如何调用该方法
    - 定义了该方法的访问类型
  - **返回值类型**：
    - 方法可能会有返回值
    - returnValueType 是方法返回值的数据类型
    - 有些方法执行所需的操作，但没有返回值
      - 在这种情况下，returnValueType 是关键字 void
  - **方法名**：
    - 方法的实际名称
    - 方法名和参数表共同构成方法签名
  - **参数类型**：
    - 当方法被调用时，传递值给参数
    - 这个值被称为实参或变量
    - 参数列表是指方法的参数类型、顺序和参数的个数
    - 参数是可选的，方法可以不包含任何参数
      - 形式参数：在方法被调用时用于接收外界输入的数据
      - 实参：调用方法时实际传给方法的数据
  - **方法体**：
    - 包含具体的数据，定义该方法的功能

```python
修饰符 返回值类型 方法名(参数类型 参数名) {
    ···
    方法体
    ···
        
    return 返回值;
}
```

```java
public class Test {
    public static void main(String[] args) {
        abc(1,2);
    }

    public static void abc(int x, int y){
        if (x == y) {
            System.out.println("x = y");
        } else if (x > y) {
            System.out.println("x > y");
        } else {
            System.out.println("x < y");
        }
    }
}
```

## 3. 方法的重载

- 重载就是在一个类中，有相同的函数名称，但形参不同的函数
- 方法重载的规则：

  - 方法名称必须相同
  - 参数列表必须不同（个数不同、或类型不同、参数排列顺序不同等）
  - 方法的返回类型可以相同也可以不相同
  - 仅仅返回类型不同不足以成为方法的重载
- 实现理论：方法名称相同时，编译器会根据调用方法的参数个数、参数类型等逐个匹配，以选择对应的方法，如果匹配失败，则编译器报错

```java
public class Test {
    public static void main(String[] args) {
        abc();
        abc(1,2);
    }

    public static void abc() {
        System.out.println("abc");
    }

    public static void abc(int x, int y){
        if (x == y) {
            System.out.println("x = y");
        } else if (x > y) {
            System.out.println("x > y");
        } else {
            System.out.println("x < y");
        }
    }
}
```

## 4. 命令行传递参数

```java
public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
    }
}
```

```
D:\Study\Java\src>javac Test.java

D:\Study\Java\src>java Test a b c
args[0] = a
args[1] = b
args[2] = c
```

## 5. 可变参数

- JDK 1.5 开始，java 支持传递同类型的可变参数给一个方法
- 在方法声明中，在指定参数类型后加一个省略号（…）
- 一个方法中只能指定一个可变参数，它必须是方法的最后一个参数
  - 任何普通的参数必须在之前声明

```java
public class Test {
    public static void main(String[] args) {
        abc(9, 2, 3, 4, 5, 6, 7);
    }

    public static void abc(int a, int... numbers) {
        int value = numbers[0];

        for (int i : numbers) {
            if (i > value) {
                value = i;
            }
        }
        System.out.println("max = " + value);
    }
}
```

## 6. 递归讲解

- 递归：方法A调用方法A
- 利用递归可以用简单的程序来解决一些复杂的问题
- 它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量
- 递归的能力在于用有限的语句来定义对象的无限集合
- 递归结构包括两个部分：

  - 递归头：什么时候不调用自身方法
    - 如果没有头，将陷入死循环
  - 递归体：什么时候需要调用自身方法

```java
public class Test {
    public static void main(String[] args) {
        System.out.println(abc(9));
    }

    public static int abc(int x) {
        if (x == 1) {
            return 1;
        }
        return x * abc(x - 1);
    }
}
```