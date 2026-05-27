#### Catalog

- [1. What is Object Oriented](#1__2)
- [2. Defining Methods](#2__21)
- [3. Calling Methods](#3__34) [4.
- [4. Creating Classes and Objects](#4__118) [5.
- [5. Constructors explained](#5__158)
- [6. Creating Objects Memory Analysis](#6__195)
- [7. Classes and Objects Review](#7__234)
- [8. Encapsulation Explained](#8__261) [9. Inheritance](#8__261)
- [9. Inheritance](#9__313)
- [10. super] (#10_super_356)
- [11. Method overriding](#11__431) [12. Polymorphism](#12_Multimorphism)
- [12. polymorphism](#12__505)
- [13. instanceof and type conversion] (#13_instanceof__566)
- [14. The static keyword explained](#14static_629)
- [15. Abstract Classes](#15_706)
- [16. Interface definition and implementation](#16_742)
- [17. N Internal Classes](#17_N_826)

## 1. What is Object-Oriented

- Procedure-oriented thinking
  - Procedure-oriented thinking is good for simpler problems
- Object-oriented thinking
  - Object-oriented thinking is suitable for dealing with complex problems, suitable for dealing with problems that require the cooperation of many people.
- For the description of complex things, in order to grasp from the macro, from the overall reasonable analysis, we need to use object-oriented thinking to analyze the whole system. However, specific to the micro-operation, still need to deal with process-oriented thinking
- Object Oriented Programming: OOP (Object - Oriented Programming)
- The essence of object-oriented programming is: to class the way the organization of the code, the organization of the object (encapsulation) of the data
- Abstraction
- The three main characteristics of object-oriented programming are
  - Encapsulation
  - Inheritance
  - Polymorphism
- From an epistemological point of view it is the object that comes before the class. Objects are concrete things. Classes are abstractions of objects.
- Classes are abstractions of objects. Classes are templates for objects.

## 2. Definition of methods

- Modifiers
- Types of Returns
- Difference between break and return
  - break: breaks out of the switch and ends the loop.
  - return: end the method, return a result
- method name: note the specification, camel nomenclature
- Parameter list: (parameter type, parameter name), ... (variable length parameters)
- Exception Throwing

## 3. Calling methods

- Static methods
- Non-Static Methods
- Formal and Real Parameters
- Value and Reference Passing
- this keyword

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

## 4. Class and Object Creation

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

## 5. Constructors in detail

- Alt + Insert: generates the constructor, i.e. the constructor method

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

## 6. Creating Object Memory Analysis

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

- Objects are created based on classes
- Static methods are loaded with the class
- Non-static methods are loaded after the object is instantiated
- Objects are created on the stack
- Objects point to methods and properties created in the heap
- Objects have methods and properties on the heap
- The method area holds classes and static methods
- The method area is a special area of the heap

## 7. Classes and Objects Review

- Classes and Objects
  - A class is a template: an abstraction
  - An object is a concrete instance
- Methods
  - Definition, invocation
- Corresponding references
  - Reference type, basic type
  - Objects are manipulated by reference: stack -> heap
- Properties: Fields, Fields, Member Variables
  - Initialized by default:
    - Number : 0, 0.0
    - char : u0000
    - boolean : false
    - Reference: null
  - Modifiers Attribute Type Attribute Name = Attribute Value
- Object Creation and Usage
  - Objects must be created using the new keyword. constructor
  - Properties of an object Object name. Attribute name
  - Methods of the object Object name. Method name()
- Classes
  - Static properties Properties
  - Dynamic behavior Methods

## 8. Encapsulation Explained

- Program design should pursue "high cohesion, low coupling".

  - High cohesion: the internal data manipulation details of a class are done by the class itself, without external interference.
  - Low coupling: only a few methods are exposed for external use.
- Encapsulation (hiding of data)

  - In general, direct access to the actual representation of the data in an object should be prohibited and accessed through the manipulation interface, this is called information hiding
- Attributes are private, get/set
- get/set can also be method overloaded
- Encapsulation works:

  - Increase the security of the program, protect the data
  - Hides the details of the implementation of the code
  - Unifies interfaces.
  - Improve the maintainability of the system
- Alt + Insert: generate get, set methods

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

## 9. Inheritance

- Inheritance is essentially the abstraction of a certain set of classes to achieve better modeling of the real world
- extends: extends, subclasses are extensions of the parent class.
- There is only single inheritance of classes in Java, not multiple inheritance.
- Inheritance is a relationship between classes. In addition to this, there are other relationships between classes, such as dependencies, combinations, aggregations, etc.
- Two classes in an inheritance relationship, one is a child class (derived class) and one is a parent class (base class). A subclass inherits from its parent class using the keyword extends.
- The relationship between the child class and the parent class should be "is a" in the sense of "is a".
- If a subclass inherits from a parent class, then the constructor methods of the subclass must be the same as the constructor methods of the parent class.
- Select the java class, ctrl + h to see the hierarchy of the class.
- object class

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

## 10. super in detail

- super Notes:

  - super must be invoked in the first constructor method of the parent class.
- super must only appear in the methods or constructors of subclasses.

  - super and this cannot invoke constructor methods at the same time.
- Compare and contrast super with this:

  - The objects they represent are different:
    - this: calls this object itself
    - super: the call on behalf of the object of the parent class
  - This: can be used without inheritance:
    - this: can be used without inheritance
    - this: can be used without inheritance. super: can only be used under inheritance conditions.
  - Constructor methods:
    - this(): the constructor of this class.
    - super(): construct of the parent class.

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

## 11. method overrides

- Alt + Insert: Quickly add overridden methods.
- Method override: requires inheritance, subclass overrides parent class method.

  - The method name must be the same.
  - Parameter list must be the same
  - Modifiers: scope can be expanded but not reduced
    - public > protected > default > private
  - Thrown exceptions: can be narrowed, but not widened
    - ClassNotFoundException > Exception
  - Subclass methods must be the same as the parent class, with different method bodies.
- Reason for method overriding: parent class functionality may not be satisfied by child class.
- Methods that cannot be overridden:

  - static methods, belong to the class, not to the instance.
  - final constants
  - private methods

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

## 12. polymorphism

- The same method can behave in many different ways depending on the object to which it is sent
- The actual type of an object is determined, but there are many types of references that can point to the object
- Conditions for the existence of polymorphism:
  - There is an inheritance relationship
  - Subclasses override parent class methods.
  - Parent class references point to child class objects.
- Caution:
  - Polymorphism is the polymorphism of methods, attributes do not have polymorphism.
  - Parent class and child class, there is a connection, without the connection will be a type conversion exception, ClassCastException

ClassCastException.

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

## 13. instanceof and type conversion

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

## 14. static keyword in detail

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

## 15. Abstract Classes

- The abstract modifier can be used to modify a method or a class. If it modifies a method, then the method is an abstract method; if it modifies a class, then the class is an abstract class.
- Abstract classes can have no abstract methods, but classes with abstract methods must be declared as abstract classes.
- Abstract class, you can not use the new keyword to create objects, it is used to let the subclass inheritance
- Abstract methods, only the declaration of the method, not the implementation of the method, it is used to allow subclasses to realize the
- Subclasses inherit the abstract class, then they must implement the abstract methods that are not implemented in the abstract class, otherwise the subclass must also be declared as an abstract class.
- Significance: improve development efficiency

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

## 16. Interface definition and implementation

- Ordinary class: only concrete implementation
- Abstract class: has concrete implementation and specification (abstract methods)
- Interface: only specification (abstract methods), separation of constraints and implementation, interface-oriented programming
- Interfaces are specifications, defined as a set of rules
- The essence of an interface is a contract
- The essence of object-oriented (OOP), is the abstraction of the object, the most can reflect this is the interface, we are discussing the design patterns are only for the abstraction of the language (C++, Java, C#, etc.), because the design patterns studied, in fact, is how to reasonably go to abstraction
- The role of interfaces:

  - Constraints
  - Define methods for different classes to implement
  - Methods: public abstract
  - Constants: public static final
  - Interfaces cannot be instantiated, and interfaces have no constructor methods.
  - implements can realize more than one interface
  - Implementing an interface requires overriding the methods in the interface
- The keyword to declare a class: class
- The keyword for declaring an interface: interface
- extends: single inheritance
- Interfaces can be inherited from more than one source.

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

## 17. N internal classes

- An internal class is another class defined inside a class
- Member Internal Classes

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

- Static Internal Classes

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

- Local Internal Classes

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

- Anonymous inner class

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