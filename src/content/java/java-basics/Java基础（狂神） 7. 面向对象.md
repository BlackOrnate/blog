#### 目录

- [1. 什么是面向对象](#1__2)
- [2. 方法的定义](#2__21)
- [3. 方法的调用](#3__34)
- [4. 类与对象的创建](#4__118)
- [5. 构造器详解](#5__158)
- [6. 创建对象内存分析](#6__195)
- [7. 类与对象回顾](#7__234)
- [8. 封装详解](#8__261)
- [9. 继承](#9__313)
- [10. super详解](#10_super_356)
- [11. 方法重写](#11__431)
- [12. 多态](#12__505)
- [13. instanceof 和类型转换](#13_instanceof__566)
- [14.static关键字详解](#14static_629)
- [15.抽象类](#15_706)
- [16.接口的定义与实现](#16_742)
- [17. N种内部类](#17_N_826)

## 1. 什么是面向对象

- 面向过程思想
  - 面向过程适合处理一些较为简单的问题
- 面向对象思想
  - 面向对象适合处理复杂的问题，适合处理需要多人协作的问题
- 对于描述复杂的事物，为了从宏观上把握，从整体上合理分析，我们需要使用面向对象的思路来分析整个系统。但是，具体到微观操作，仍然需要面向过程的思路去处理
- 面向对象编程：OOP（Object - Oriented Programming）
- 面向对象编程的本质就是：以类的方式组织代码，以对象的组织（封装）数据
- 抽象
- 三大特性：
  - 封装
  - 继承
  - 多态
- 从认识论角度考虑是先有对象后有类。对象是具体的事物。类是抽象的，是对对象的抽象
- 从代码运行角度考虑是先有类后有对象。类是对象的模板

## 2. 方法的定义

- 修饰符
- 返回类型
- break 和 return 的区别
  - break：跳出switch，结束循环
  - return：结束方法，返回一个结果
- 方法名：注意规范，驼峰命名法
- 参数列表：(参数类型, 参数名)，… （可变长参数）
- 异常抛出

## 3. 方法的调用

- 静态方法
- 非静态方法
- 形参和实参
- 值传递和引用传递
- this关键字

```java
public class Test {
    public static void main(String[] args) {
        demo1.say(); // abc

        // 实际参数和形式参数的类型要对应
        System.out.println(demo1.add(1, 2)); // 3

        // 实例化非静态类 new
        // 对象类型 对象名 = 对象值;
        demo2 demo2 = new demo2();
        demo2.say(); // def

        // 值传递
        int A = 1;
        System.out.println(A); // 1
        Test.change1(A);
        System.out.println(A); // 1

        // 引用传递：对象作为参数，本质是值传递
        Change change = new Change();
        System.out.println(change.a); // 0
        Test.change2(change);
        System.out.println(change.a); // 10
    }

    public static void change1(int a) {
        a = 10;
    }

    public static void change2(Change change) {
        change.a = 10;
    }
}

class Change {
    int a; // 0
}
```

```java
public class demo1 {
    // 静态方法
    public static void say() {
        System.out.println("abc");
    }

    // 类实例化之后才会存在
    public void a() {
        b();
        // 静态方法可以被非静态方法调用，但非静态方法不能被静态方法调用
    }

    // 与类一起加载
    public static void b() {

    }

    // a和b均是形参
    public static int add(int a, int b) {
        return a + b;
    }
}
```

```java
public class demo2 {
    // 非静态方法
    public void say() {
        System.out.println("def");
    }
}
```

## 4. 类与对象的创建

```java
public class Test {
    public static void main(String[] args) {
        // 类是抽象的，需要实例化
        // 类实例化后会返回一个自己的对象
        // demo1和demo2就是demo类的具体实例
        demo demo1 = new demo();
        demo demo2 = new demo();

        demo1.name = "demo1";
        demo1.age = 1;

        demo2.name = "demo2";
        demo2.age = 2;

        System.out.println(demo1.name);
        System.out.println(demo1.age);
        System.out.println(demo2.name);
        System.out.println(demo2.age);
    }
}
```

```java
public class demo {
    // 属性：字段
    String name;
    int age;

    // 方法
    public void study() {
        System.out.println(this.name + "abc");
    }
}
```

## 5. 构造器详解

- Alt + Insert：生成构造器，即构造方法

```java
public class Test {
    public static void main(String[] args) {
        // new 实例化了一个对象
        demo demo1 = new demo();
        System.out.println(demo1.name); // abc

        demo demo2 = new demo("qwe");
        System.out.println(demo2.name); // qwe
    }
}
```

```java
public class demo {
    // 一个类从创建开始就有构造器，即构造方法
    String name;

    // 使用new关键字，本质是在调用构造器
    // 用来初始化值
    public demo() {
        this.name = "abc";
    }

    // 有参构造
    public demo(String name) {
        this.name = name;
    }
}
```

## 6. 创建对象内存分析

```java
public class Test {
    public static void main(String[] args) {
        demo demo1 = new demo();
        demo1.name = "abc";
        demo1.age = 1;
        demo1.shout();

        System.out.println(demo1.name);
        System.out.println(demo1.age);
    }
}
```

```java
public class demo {
    public String name;
    public int age;

    // 无参构造
    public void shout() {
        System.out.println("shout");
    }
}
```

- 对象基于类创建
- 静态方法与类一起加载
- 非静态方法在对象实例化之后才开始加载
- 对象在栈中创建
- 对象指向堆中所创建的方法和属性
- 对象的方法和属性都在堆中
- 方法区存放类和静态方法
- 方法区是堆中特殊的区域

## 7. 类与对象回顾

- 类与对象
  - 类是一个模板：抽象
  - 对象是一个具体的实例
- 方法
  - 定义、调用
- 对应的引用
  - 引用类型，基本类型
  - 对象是通过引用来操作的：栈—>堆
- 属性：字段，Field，成员变量
  - 默认初始化：
    - 数字 ：0，0.0
    - char ：u0000
    - boolean ：false
    - 引用 ：null
  - 修饰符 属性类型 属性名 = 属性值
- 对象的创建和使用
  - 必须使用new关键字创造对象，构造器
  - 对象的属性 对象名.属性名
  - 对象的方法 对象名.方法名()
- 类
  - 静态的属性 属性
  - 动态的行为 方法

## 8. 封装详解

- 程序设计要追求”高内聚，低耦合“

  - 高内聚：类的内部数据操作细节自己完成，不允许外部干涉
  - 低耦合：仅暴露少量的方法给外部使用
- 封装(数据的隐藏)

  - 通常，应禁止直接访问一个对象中的数据的实际表示，而通过操作接口来访问，这称为信息的隐藏
- 属性私有，get/set
- get/set 也可以进行方法重载
- 封装的作用：

  - 提高程序的安全性，保护数据
  - 隐藏代码的实现细节
  - 统一接口
  - 提高系统的可维护性
- Alt + Insert：生成get、set方法

```java
public class Test {
    public static void main(String[] args) {
        demo demo1 = new demo();
        demo1.setName("abc");
        System.out.println(demo1.getName());
    }
}
```

```java
public class demo {

    // 属性私有
    private String name; // 姓名
    private int age; // 年龄
    private char sex; // 性别

    // 提供一些 public 的get、set方法，进而操作属性
    // get 获取数据
    public String getName() {
        return this.name;
    }

    // set 给数据赋值
    public void setName(String name) {
        this.name = name;
    }

}
```

## 9. 继承

- 继承的本质是对某一批类的抽象，从而实现对现实世界更好的建模
- extends：扩展，子类是父类的扩展
- Java中类只有单继承，没有多继承
- 继承是类与类之间的一种关系。除此之外，类与类之间的关系还有依赖、组合、聚合等
- 继承关系的两个类，一个为子类（派生类），一个为父类（基类）。子类继承父类，使用关键字extends来表示
- 子类和父类之间，从意义上讲应该是具有”is a“的关系
- 若子类继承父类，那么子类的构造方法需与父类的构造方法相同
- 选中java类，ctrl + h可以查看类中的层次结构
- object类

```java
// 子类继承父类，便会拥有父类的全部属性和方法(私有无法被继承)
public class DemoSon extends DemoFather {

}
```

```java
// 在Java中，所有的类，都默认直接或者间接继承object类
public class DemoFather {

    public int money = 100;

    public void say() {
        System.out.println("say");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        DemoSon demoSon = new DemoSon();
        System.out.println(demoSon.money);
        demoSon.say();
    }
}
```

## 10. super详解

- super注意：

  - super调用父类的构造方法，必须在构造方法的第一个
- super必须只能出现在子类的方法或者构造方法中

  - super和this不能同时调用构造方法
- super与this做对比：

  - 代表的对象不同：
    - this：本身调用这个对象
    - super：代表父类对象的调用
  - 前提：
    - this：没有继承也可以使用
    - super：只能在继承条件才可以使用
  - 构造方法：
    - this()：本类的构造
    - super()：父类的构造

```java
public class DemoSon extends DemoFather {

    public DemoSon() {
        // 调用了父类的无参构造
        super(); // 调用父类的构造器，必须要在子类的第一行
        System.out.println("DemoSon的无参构造");
    }

    private String name = "abc";

    public void print() {
        System.out.println("DemoSon");
    }

    public void testPrint() {
        print();
        this.print();
        super.print();
    }

    public void testName(String name) {
        System.out.println(name);
        System.out.println(this.name);
        System.out.println(super.name);
    }

}
```

```java
public class DemoFather {

    public DemoFather() {
        System.out.println("DemoFather的无参构造");
    }

    protected String name = "ABC";

    public void print() {
        System.out.println("DemoFather");
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        DemoSon demoSon = new DemoSon();
        demoSon.testName("123");
        demoSon.testPrint();
    }
}
```

## 11. 方法重写

- Alt + Insert：快速添加重写方法
- 方法重写：需要有继承关系，子类重写父类的方法

  - 方法名必须相同
  - 参数列表必须相同
  - 修饰符：范围可以扩大，但是不能缩小
    - public > protected > default > private
  - 抛出的异常：范围可以缩小，但是不能扩大
    - ClassNotFoundException > Exception
  - 子类方法和父类必须一致，方法体不同
- 方法重写的原因：父类的功能，子类不一定能够满足
- 不能被重写的方法：

  - static 方法，属于类，不属于实例
  - final 常量
  - private 方法

```java
public class Test {
    // 静态方法与非静态方法的区别很大
    public static void main(String[] args) {

        DemoSon demoSon = new DemoSon();

        // 父类的引用指向了子类
        DemoFather demoFather = new DemoSon(); // 子类重写了父类的方法

        // 静态方法 // 方法的调用只与左边定义的数据类型有关
        demoSon.print1();
        // DemoSon

        demoFather.print1();
        // DemoFather

        // 非静态方法：重写
        demoSon.print2();
        // DemoSon

        demoFather.print2();
        // DemoSon
    }
}
```

```java
// 重写都是方法的重写，与属性无关
public class DemoFather {
    public static void print1() {
        System.out.println("DemoFather");
    }

    public void print2() {
        System.out.println("DemoFather");
    }
}
```

```java
// 继承
public class DemoSon extends DemoFather {
    public static void print1() {
        System.out.println("DemoSon");
    }

    @Override // 注解
    public void print2() {
        System.out.println("DemoSon");
    }
}
```

## 12. 多态

- 同一方法可以根据发送对象的不同而采用多种不同的行为方式
- 一个对象的实际类型是确定的，但可以指向对象的引用的类型有很多
- 多态存在的条件：
  - 有继承关系
  - 子类重写父类方法
  - 父类引用指向子类对象
- 注意：
  - 多态是方法的多态，属性没有多态性
  - 父类与子类，有联系，没有联系会出现类型转换异常，ClassCastException

```java
public class Test {
    public static void main(String[] args) {

        // 一个对象的实际类型是确定的
        // 可以指向的引用类型是不确定的
        // 父类的引用指向子类的类型

        // 子类能调用的方法都是自己的或者继承父类的
        // 父类虽然被子类继承，但是不能调用子类独有的方法
        DemoSon demoSon = new DemoSon();
        DemoFather demoFather = new DemoSon();
        Object demoSon3 = new DemoSon();

        demoSon.print1(); // 子类重写父类的方法，执行子类方法
        // DemoSon print1
        demoFather.print1();
        // DemoSon print1

        // 对象主要根据左边类型执行对应的方法，与右边的关系不大
        demoSon.print2();
        ((DemoSon) demoFather).print2(); // 子类重写父类的方法，执行子类的方法
    }
}
```

```java
public class DemoFather {
    public void print1() {
        System.out.println("DemoFather print1");
    }
}
```

```java
public class DemoSon extends DemoFather {
    @Override // 注解
    public void print1() {
        System.out.println("DemoSon print1");
    }

    public void print2() {
        System.out.println("DemoSon print2");
    }
}
```

## 13. instanceof 和类型转换

```java
public class Test {
    public static void main(String[] args) {
        DemoSon demoSon1 = new DemoSon();
        DemoFather demoSon2 = new DemoSon();
        DemoFather demoFather1 = new DemoFather();

        System.out.println(demoSon1 instanceof DemoFather);
        // true

        System.out.println(demoSon1 instanceof DemoSon);
        // true

        System.out.println(demoSon2 instanceof DemoFather);
        // true

        System.out.println(demoSon2 instanceof DemoSon);
        // true

        System.out.println(demoFather1 instanceof DemoSon);
        // false

        // 类型转化：父 子
        // 高                           低
        DemoFather demoFather = new DemoSon();

        // 将对象转换为子类类型，便可以使用子类种特有的方法
        DemoSon demoFather2 = (DemoSon) demoFather;
        demoFather2.print2();
        // DemoSon print2

        ((DemoSon) demoFather2).print2();
        // DemoSon print2

    }
}
```

```java
public class DemoFather {
    public void print1() {
        System.out.println("DemoFather print1");
    }
}
```

```java
public class DemoSon extends DemoFather {
    @Override // 注解
    public void print1() {
        System.out.println("DemoSon print1");
    }

    public void print2() {
        System.out.println("DemoSon print2");
    }
}
```

## 14.static关键字详解

```java
public class Test {
    private static int age; // 静态变量，在静态方法区中
    private String name; // 非静态变量

    public static void print1() {
        System.out.println(age);
    }

    public void print2() {
        System.out.println(age);
    }

    public static void main(String[] args) {
        Test test = new Test();
        System.out.println(test.name); // null

        System.out.println(test.age); // 0

        System.out.println(age); // 0
        System.out.println(Test.age); // 0

        Test.print1(); // 0
        print1(); // 0

        test.print2(); // 0
    }
}
```

```java
// 静态导入包

import static java.lang.Math.random;
import static java.lang.Math.PI;

public class Demo {
    // 赋初始值
    {
        // 代码块（匿名代码块）
        System.out.println("匿名代码块");
    }

    // 只执行一次
    static {
        // 静态代码块
        System.out.println("静态代码块");
    }

    public Demo() {
        System.out.println("构造方法");
    }

    public static void main(String[] args) {
        Demo demo1 = new Demo();
        /*
         * 静态代码块
         * 匿名代码块
         * 构造方法
         */
        Demo demo2 = new Demo();
        /*
         * 匿名代码块
         * 构造方法
         */

        System.out.println(Math.random());
        System.out.println(random());
        System.out.println(PI);
    }
}
```

## 15.抽象类

- abstract修饰符可以用来修饰方法，也可以修饰类，如果修饰方法，那么该方法就是抽象方法；如果修饰类，那么该类就是抽象类
- 抽象类中可以没有抽象方法，但是有抽象方法的类一定要声明为抽象类
- 抽象类，不能使用new关键字来创建对象，它是用来让子类继承的
- 抽象方法，只有方法的声明，没有方法的实现，它是用来让子类实现的
- 子类继承抽象类，那么就必须要实现抽象类没有实现的抽象方法，否则该子类也要声明为抽象类
- 存在意义：提高开发效率

```python
// abstract 抽象类
public abstract class DemoFather {
    // 约束,需要补充方法的执行
    public void print1() {

    }

    // abstract，抽象方法，只有方法名称，没有方法实现
    public abstract void print2();

    public DemoFather() {

    }
}
```

```java
// 抽象类的所有方法必须需要子类实现，除非子类也为抽象类
public class DemoSon extends DemoFather {
    @Override
    public void print2() {

    }
}
```

## 16.接口的定义与实现

- 普通类：只有具体实现
- 抽象类：拥有具体实现和规范（抽象方法）
- 接口：只有规范（抽象方法），约束和实现分离，面向接口编程
- 接口就是规范，定义的是一组规则
- **接口的本质就是契约**
- 面向对象（OOP）的精髓，是对对象的抽象，最能体现这一点的就是接口，我们讨论设计模式都只针对具备了抽象能力的语言（C++，Java，C#等），是因为设计模式所研究的，实际上就是如何合理的去抽象
- 接口的作用：

  - 约束
  - 定义方法，让不同类实现
  - 方法：public abstract
  - 常量：public static final
  - 接口不能被实例化，接口没有构造方法
  - implements可以实现多个接口
  - 实现接口需要重写接口中的方法
- 声明类的关键字：class
- 声明接口的关键字：interface
- extends：单继承
- 接口可以多继承

```java
// 一个类可以通过implements来实现接口
// 实现了接口的类，需要重写接口中的方法
// 接口可以进行多继承
public class Test implements Demo1, Demo2 {

    @Override
    public void add(String name) {

    }

    @Override
    public void delete(String name) {

    }

    @Override
    public void print(String name) {

    }

    @Override
    public void Lier_X() {

    }
}
```

```java
// interface：定义的关键字，接口都需要有实现类
public interface Demo1 {
    // 常量，public static final
    int age = 18;

    // 接口中所有定义的方法都是抽象的，public abstract
    void add(String name);

    void delete(String name);

    void print(String name);
}
```

```java
public interface Demo2 {
    void Lier_X();
}
```

## 17. N种内部类

- 内部类就是在一个类的内部再定义一个类
- 成员内部类

```java
public class Test {
    public static void main(String[] args) {
        // new，实例化外部类
        Outer outer = new Outer();

        // 通过外部类实例化内部类
        Outer.Inner inner = outer.new Inner();

        outer.print(); // Outer print
        inner.print(); // Inner print

        inner.get_age(); // 10
    }
}
```

```java
public class Outer {
    private int age = 10;

    public void print() {
        System.out.println("Outer print");
    }

    // 成员内部类
    public class Inner {
        public void print() {
            System.out.println("Inner print");
        }

        // 获取外部类的私有属性
        public void get_age() {
            System.out.println(age);
        }
    }
}
```

- 静态内部类

```java
public class Test {
    public static void main(String[] args) {
        Outer outer = new Outer();

        Outer.Inner inner = new Outer.Inner();

        outer.print(); // Outer print
        inner.print(); // Inner print

        inner.get_age(); // 10
    }
}
```

```java
public class Outer {
    static int age = 10;

    public void print() {
        System.out.println("Outer print");
    }

    // 静态内部类
    public static class Inner {
        public void print() {
            System.out.println("Inner print");
        }

        public void get_age() {
            System.out.println(age);
        }
    }
}
```

- 局部内部类

```java
public class Outer {
    int age = 10;

    public void print() {
        System.out.println("Outer print");

        // 局部内部类
        class Inner {
            public void print() {
                System.out.println("Inner print");
            }
        }
    }
}
```

- 匿名内部类

```java
public class Test {
    public static void main(String[] args) {
        Demo_Class demo_class = new Demo_Class();
        demo_class.print_class();
        // Demo_Class print

        // 匿名内部类，不用将实例保存到变量中
        new Demo_Class().print_class();
        // Demo_Class print

        new Demo_Interface() {

            @Override
            public void print_interface() {
                System.out.println("Demo_Interface print");
            }
        }.print_interface();
        // Demo_Interface print
    }
}

class Demo_Class {
    public void print_class() {
        System.out.println("Demo_Class print");
    }
}

interface Demo_Interface {
    void print_interface();
}
```