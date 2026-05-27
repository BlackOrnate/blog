#### 目录

- [1. Error和Exception](#1_ErrorException_2)
- [2. 捕获和抛出异常](#2__29)
- [3. 自定义异常](#3__81)

## 1. Error和Exception

- 异常：程序运行中出现不期而至的各种情况，如：无法找到文件、网络连接失败、非法参数等
- 异常发生在程序运行期间，影响了正常程序的执行流程
- 三种异常：
  - 检查性异常：用户错误或问题引起的异常，程序员无法预见，编译时不能简单忽略
  - 运行时异常：程序员避免的异常，编译时可以忽略
  - 错误：错误不是异常，而是脱离程序员控制的问题，错误在代码中通常被忽略，编译也无法检查出，如：栈溢出等
- 异常处理框架（异常体系结构）
  - Java把异常当作对象处理，并定义一个基类java. lang. Throwable作为所有异常的超类
  - 在Java API中已经定义了许多异常类，这些异常类分为两大类，错误Error和异常Exception
- Error
  - Error类对象由Java虚拟机生成并抛出，大多数错误与代码编写者所执行的操作无关
  - Java虚拟机运行错误（Virtual Machine Error），当JVM不在有继续执行操作所需的内存资源时，将出现Out Of Memory Error。这些异常发生时，Java虚拟机（JVM）一般会选择线程终止
  - 发生在虚拟机试图执行应用时，如类定义错误（No Class Def Found Error）、链接错误（Linkage Error）。这些错误不可查，因为它们在应用程序的控制和处理能力之外，并且绝大多数是程序运行时不允许出现的状况
- Exception
  - 在Exception分支中有一个重要的子类Runtime Exception（运行时异常）
    - Array Index Out Of Bounds Exception（数组下标越界异常）
    - Null Pointer Exception（空指针异常）
    - Arithmetic Exception（算术异常）
    - Missing Resource Exception（丢失资源）
    - Class Not Found Exception（找不到类）等异常，这些异常是不检查异常，程序中可以选择捕获处理，也可以不处理
  - 这些异常一般是由程序逻辑错误引起的，程序应该从逻辑角度尽可能避免这类异常的发生
- Error和Exception区别：
  - Error通常是灾难性错误，程序无法控制和处理，当出现这些异常时，Java虚拟机（JVM）一般会终止线程
  - Exception通常可以被程序处理，并且在程序中应该尽可能去处理这些异常

## 2. 捕获和抛出异常

- Ctrl + Alt + T：快速调出异常
- 抛出异常
- 捕获异常
- 异常处理5个关键字：try、catch、finally、throw、throws
- 注意：

  - 处理运行时异常时，采用逻辑去合理规避同时辅助 try - catch 处理
  - 在多重 catch 块后面，可以添加catch(Exception)来处理可能会被遗漏的异常
  - 对于不确定的代码，也可以添加 try - catch，处理潜在的异常
  - 尽量去处理异常，只是调用 print Stack Trace() 去打印输出
  - 具体如何处理异常，要根据不同的业务需求和异常类型去决定
  - 尽量添加finally语句块去释放占用的资源

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

## 3. 自定义异常

- 用户自定义异常类，只需继承Exception类即可
- 步骤：
  - 创建自定义异常类
  - 在方法中通过throw关键字抛出异常对象
  - 如果在当前抛出异常的方法中处理异常，可以使用try-catch语句获取并处理；否则在方法的声明处通过throws关键字指明要抛出给方法调用者的异常，继续进行下一步操作
  - 在出现异常方法的调用者中捕获并处理异常

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