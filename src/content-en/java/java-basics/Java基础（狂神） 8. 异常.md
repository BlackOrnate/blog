#### Catalog

- [1. Error and Exception](#1_ErrorException_2)
- [2. Catching and Throwing Exceptions](#2__29)
- [3. Customizing Exceptions](#3__81)

## 1. Error and Exception

- Exceptions: Various situations that occur unexpectedly during the running of a program, e.g., file cannot be found, network connection fails, illegal parameters, etc.
- Exceptions occur during program operation and affect the normal program execution process
- Three kinds of exceptions:
  - Checking exceptions: exceptions caused by user errors or problems that cannot be foreseen by the programmer and cannot be simply ignored during compilation
  - Runtime exceptions: exceptions avoided by the programmer, which can be ignored during compilation.
  - Errors: Errors are not exceptions, but problems that are out of the programmer's control. Errors are usually ignored in the code and cannot be checked by compilation, e.g., stack overflow, etc.
- Exception Handling Framework (Exception Architecture)
  - Java treats exceptions as objects and defines a base class java. lang. Throwable as a superclass for all exceptions.
  - In the Java API has defined a number of exception classes, these exception classes are divided into two categories, error Error and exception Exception
- Error
  - Error class objects are generated and thrown by the Java Virtual Machine, and most errors are independent of the action performed by the code writer.
  - Java Virtual Machine Error (Virtual Machine Error), when the JVM does not have the memory resources needed to continue the execution of the operation, the Out Of Memory Error will occur. these exceptions occur, the Java Virtual Machine (JVM) will generally choose the thread termination
  - Occurs when the virtual machine attempts to execute the application, such as No Class Def Found Error, Linkage Error. These errors are not traceable because they are outside of the application's control and processing capabilities, and most of them are conditions that are not allowed to occur while the program is running.
- Exception
  - In the Exception branch there is an important subclass of Runtime Exception
    - Array Index Out Of Bounds Exception
    - Null Pointer Exception
    - Arithmetic Exception
    - Missing Resource Exception
    - Class Not Found Exception (can not find the class) and other exceptions, these exceptions are not checked exceptions, the program can choose to catch and handle, or not handle
  - These exceptions are generally caused by program logic errors, the program should be from a logical point of view to avoid the occurrence of such exceptions as far as possible
- Error and Exception difference:
  - Error is usually a catastrophic error, the program can not control and handle, when these exceptions occur, the Java Virtual Machine (JVM) will generally terminate the thread
  - Exception can usually be handled by the program, and in the program should be handled as much as possible to deal with these exceptions

## 2. Catching and Throwing Exceptions

- Ctrl + Alt + T: Quickly pulling out exceptions.
- Throwing Exceptions
- Catching Exceptions
- The 5 keywords of exception handling: try, catch, finally, throw, throws
- Attention:

  - When handling runtime exceptions, use logic to rationally avoid and supplement try-catch handling.
  - After multiple catch blocks, you can add catch(Exception) to handle exceptions that may be missed.
  - For uncertain code, add a try-catch to handle potential exceptions.
  - Try to handle exceptions as best you can, and just call print Stack Trace() to print out the output.
  - How to handle exceptions depends on the business requirements and the type of exception.
  - Try to add a finally block to free up resources.

```java
public class Demo {
    public static void main(String[] args) {
        int a = 1;
        int b = 0;

        // 捕获多个异常，需要从小到大

        try { // try：监控区域
            new Demo().demo(a, b);

            System.out.println(a / b);

        } catch (Error error) { // catch(异常类型)：捕获异常
            System.out.println("Error");

        } catch (Exception exception) {
            System.out.println("Exception");

        } catch (Throwable throwable) {
            System.out.println("Throwable");

        } finally {
            System.out.println("finally");

        }
    }

    // 方法中无法处理这个异常时，可以在方法上抛出异常
    public void demo(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException(); // throw 主动抛出异常，可以不通过执行发生错误的代码，在方法中使用
        }
    }
}
```

## 3. Custom exceptions

- User-defined exception class, simply inherit from Exception class
- Steps:
  - Create a custom exception class.
  - Throw the exception object in the method using the throw keyword.
  - If the exception is handled in the method that currently throws the exception, use a try-catch statement to catch and handle the exception; otherwise, specify the exception to be thrown to the caller of the method with the throws keyword in the declaration of the method, and proceed to the next step.
  - Catch and handle the exception in the caller of the method in which the exception occurs

```java
public class Demo {
    public static void main(String[] args) {
        try {
            demo(1);
            demo(11);
        } catch (DemoException e) {
            System.out.println(e);
        }
    }

    // 可能会存在异常的方法
    static void demo(int a) throws DemoException {
        System.out.println(a);

        if (a > 10) {
            throw new DemoException(a); // 抛出
        }

        System.out.println("finish");
    }
}
```

```java
// 自定义异常类
public class DemoException extends Exception {
    // 传递数字
    private int input;

    public DemoException(int a) {
        input = a;
    }

    // toString：异常的打印信息
    @Override
    public String toString() {
        return "DemoException{" +
                "input=" + input +
                '}';
    }
}
```