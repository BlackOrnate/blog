#### Catalog

- [1. What is a method](#1__2)
- [2. Defining and calling methods](#2__40)
- [3. Method Overloading](#3__102) [4.
- [4. Passing Parameters on the Command Line](#4__145) [5. Variable Parameters](#4__145)
- [5. Variable Parameters](#5__170) [6. Recursion Explained](#5__170)
- [6. Recursion explained](#6__200)

## 1. What is a method

- java methods are collections of statements that together perform a function

  - A method is an ordered set of steps to solve a class of problems.
  - Methods are contained in classes or objects
  - Methods are created in a program and referenced elsewhere
- Principles of designing methods:

  - Methods are meant to be function blocks, which are collections of blocks of statements that implement a function.
  - When designing a method, it is best to keep the method atomic.
    - Atomicity: a method accomplishes only one function, which is good for later expansion.

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

## 2. Method definition and invocation

- A method in java is similar to a function in other languages, it is a piece of code that ** is used to accomplish a specific function**.
- A method consists of a method header and a method body.

  - **Modifiers**:
    - are optional and tell the compiler how to call the method
    - Defines the type of access to the method
  - **Return value type**:
    - Methods may have return values
    - returnValueType is the data type of the method's return value
    - Some methods perform the desired operation but do not have a return value
      - In this case, returnValueType is the keyword void
  - **MethodName**:
    - The actual name of the method
    - The method name and parameter list together form the method signature
  - **parameterType**:
    - When the method is called, a value is passed to the parameter.
    - This value is called a real parameter or variable
    - The parameter list refers to the type, order, and number of parameters of the method.
    - Parameters are optional, the method can contain no parameters at all
      - Formal parameters: used to receive data from the outside world when the method is called.
      - Actual parameter: the data actually passed to the method when it is called.
  - **Method body**:
    - Contains specific data that defines the function of the method.

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

## 3. Method overloading

- Overloading is a function in a class that has the same function name but different formal parameters.
- The rules of method overloading:

  - The method name must be the same.
  - The parameter list must be different (different number, different type, different order of parameters, etc.)
  - The return types of the methods may or may not be the same.
  - Different return types alone are not enough for method overloading.
- Theory of implementation: when the method name is the same, the compiler will match the number of parameters, parameter types, etc. of the calling method one by one to select the corresponding method, if the matching fails, the compiler will report an error.

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

## 4. Passing parameters on the command line

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

## 5. Variable parameters

- Since JDK 1.5, java supports passing variable parameters of the same type to a method.
- In method declarations, an ellipsis (...) is added after the type of the specified parameter.
- Only one variable parameter can be specified in a method, and it must be the last parameter of the method.
  - Any normal parameters must be declared before

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

## 6. Recursion Explained

- Recursion: method A calling method A
- Recursion can be used to solve complex problems with simple programs.
- It usually transforms a large and complex problem into a smaller problem similar to the original one. Recursive strategies require only a small number of programs to describe the multiple repetitions of computations needed to solve the problem, which greatly reduces the amount of code in the program.
- The power of recursion lies in the ability to define an infinite set of objects with a finite number of statements
- The recursive structure consists of two parts:

  - Recursion header: when not to call its own method
    - Without the head, the program would be stuck in a dead loop.
  - The body of the recursion: when it needs to call its own methods.

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