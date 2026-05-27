#### 目录

- [1. 概述](#1__2)
- [2. 运行时数据区域](#2__15)
- - [2.1 程序计数器](#21__24)
  - [2.2 Java 虚拟机栈](#22_Java__42)
  - - [栈](#_65)
  - [2.3 本地方法栈](#23__71)
  - [2.4 Java 堆](#24_Java__85)
  - [2.5 方法区](#25__100)
  - [2.6 运行时常量池](#26__114)
  - [2.7 直接内存](#27__145)
- [3. HotSpot 虚拟机对象](#3_HotSpot__254)
- - [3.1 对象的创建](#31__256)
  - [3.2 对象的内存布局](#32__304)
  - [3.3 对象的访问定位](#33__338)

## 1. 概述

- 对于 C 、C++ 程序开发人员

  - 既拥有每一个对象的 “所有权”
  - 又担负着每一个对象生命开始到终结的维护责任
- 对于 Java 程序开发人员

  - 在虚拟机自动内存管理机制的帮助下，不再需要为每一个 new 操作去配对 delete / free 代码，不容易出现内存泄露和内存溢出问题

## 2. 运行时数据区域

- Java 虚拟机在执行 Java 程序的过程中会把它所管理的内存划分为若干个不同的数据区域

![Java 虚拟机运行时数据区](https://i-blog.csdnimg.cn/blog_migrate/eff7fff91b678d966e2d7460522f1a73.jpeg#pic_center)

### 2.1 程序计数器

- **程序计数器（Program Counter Register）** 是一块较小的内存空间

  - **当前**线程所执行的字节码的行号指示器
- 在 Java 虚拟机的概念模型里，字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令
- 它是程序控制流的指数其，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成
- **”线程私有“的内存**：为了线程切换后能恢复到正确的执行位置，每条线程有需要有一个独立的程序计数器，各条线程之间计数器互不影响，独立存储的内存区域
- 如果线程正在执行的是一个 Java 方法，这个计数器记录的是正在执行的虚拟机字节码指令的地址
- 如果线程正在执行的是一个本地（Native）方法，这个计数器值则应为空（Undefined）

### 2.2 Java 虚拟机栈

- **Java 虚拟机栈（Java Virtual Machine Stack）**

  - **线程私有**
  - 生命周期与线程相同
- 虚拟机栈描述的是 **Java 方法**执行的线程内存模型

  - 每个方法被执行的时候，Java 虚拟机都会同步创建一个\*\*栈帧（Stack Frame）\*\*用于存储局部变量表、操作数栈、动态连接、方法出口等信息
  - 每一个方法被调用直至执行完毕的过程，就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程
- 局部变量表存储

  - 基本数据类型（boolean 、byte 、char 、short 、int 、float 、long 、double）
  - 对象引用（reference 类型，它并不等同于对象本身，可能是一个指向对象起始地址的引用指针，也可能是指向一个代表对象的句柄或者其他与此对象相关的位置）
  - returnAddress 类型（指向了一条字节码指令的地址）
- 这些数据类型在局部变量表中的存储空间以局部变量\*\*槽（Slot）\*\*来表示，其中 64 位长度的 long 和 double 类型的数据会占用 2 个变量槽，其余的数据类型只占用 1 个
- 局部变量表所需的内存空间在编译期间完成分配，当进入方法时，这个方法需要在栈帧中分配的局部变量空间 ”大小“ （变量槽的数量）是完全确定的，在方法运行期间不会改变局部变量表的大小

#### 栈

- ”栈“ 通常指的是虚拟机栈，或者更多形况下只是指虚拟机栈中局部变量表部分

### 2.3 本地方法栈

- **本地方法栈（Native Method Stacks）**

  - 作用与虚拟机栈相似
  - 为虚拟机使用到的本地（Native）方法服务
- 具体的虚拟机可以根据需要实现它，甚至有的 Java 虚拟机（HotSport 虚拟机）直接将本地方法栈和虚拟机栈合二为一

### 2.4 Java 堆

- **Java 堆（Java Heap）** 是虚拟机所管理的内存中最大的块

  - 是被所有线程共享的一块内存区域，在虚拟机启动时创建
  - 此内存区域的唯一目的就是**存放对象实例**，Java 世界里 **“几乎”** 所有的对象实例都在这里分配内存
  - 是垃圾收集器管理的内存区域
  - 可以划分出多个线程私有的分配缓冲区（Thread Local Allocation Buffer，TLAB），以提升对象分配时的效率

    - **无论从什么角度，无论如何划分，都不会改变 Java 堆中存储内容的共性，无论是哪个区域、存储的都只能是对象的实例，将 Java 堆细分的目的只是为了更好地回收内存，或者更快地分配内存**
  - 可以处于物理上不连续的内存空间中，但在逻辑上它应该被视为连续的
  - 既可以被实现成固定大小的，也可以是可扩展的

### 2.5 方法区

- **方法区（Method Area）** 是各个线程共享的内存区域

  - 用于存储已被虚拟机加载的类型信息、常量、静态变量、即时编译器编译后的代码缓存等数据
  - 不需要连续的内存
  - 可以选择固定大小或者可扩展
  - 可以选择不实现垃圾收集

    - 内存回收目标主要是针对常量池的回收和对类型的卸载

### 2.6 运行时常量池

- **运行时常量池（Runtime Constant Pool）** 是方法区的一部分
- Class 文件包含

  - 类的版本
  - 字段
  - 方法
  - 接口
  - 等描述信息
  - 常量池表（Constant Pool Table）

    - 存放编译器生成的各种字面量与符号应用
    - 这部分内容将在类加载后存放到方法区的运行时常量池中
- Java 虚拟机对于 Class 文件每一部分（包括常量池）的格式有严格规定，但对于运行时常量池并没有任何细节的要求
- 运行时常量池对于 Class 文件常量池的另一重要特征

  - 具备动态性
  - 不要求常量一定只有编译器才能产生
  - 并非置入 Class 文件中常量池的内容才能进入方法区运行2.7 时常量池，**运行期间也可以将新的常量放入池中**

### 2.7 直接内存

- **直接内存（Direct Memory）** 不是虚拟机运行时数据区的一部分，也不是被定义的内存区域

  - 堆外内存
  - 使用 Native 函数库直接分配
  - 通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作
  - 在一些场景中显著提高性能
    - 避免了在 Java 堆和 Native 堆中来回复制数据
- 补充：[直接内存](https://blog.csdn.net/leaf_0303/article/details/78961936?ops_request_misc=%7B%22request%5Fid%22%3A%22164791581516780366576521%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=164791581516780366576521&biz_id=0&spm=1018.2226.3001.4187)

  - **直接内存（堆外内存）与堆内存比较**

    - 直接内存申请空间耗费更高的性能，当频繁申请到一定量时尤为明显
    - 直接内存 IO 读写的性能要优于普通的堆内存，在多次读写操作的情况下差异明显

    ```java
    import java.nio.ByteBuffer;

    /**
     * 直接内存 与  堆内存的比较
     * @author BlackOrnate
     */
    public class JVM_Test {

        public static void main(String[] args) {
            allocateCompare();   //分配比较
            operateCompare();    //读写比较
        }

        /**
         * 直接内存 和 堆内存的 分配空间比较
         *
         * 结论： 在数据量提升时，直接内存相比非直接内的申请，有很严重的性能问题
         *
         */
        public static void allocateCompare(){
            int time = 10000000;    //操作次数

            long st = System.currentTimeMillis();
            for (int i = 0; i < time; i++) {

                //ByteBuffer.allocate(int capacity)   分配一个新的字节缓冲区。
                ByteBuffer buffer = ByteBuffer.allocate(2);      //非直接内存分配申请
            }
            long et = System.currentTimeMillis();

            System.out.println("在进行"+time+"次分配操作时，堆内存 分配耗时:" + (et-st) +"ms" );

            long st_heap = System.currentTimeMillis();
            for (int i = 0; i < time; i++) {
                //ByteBuffer.allocateDirect(int capacity) 分配新的直接字节缓冲区。
                ByteBuffer buffer = ByteBuffer.allocateDirect(2); //直接内存分配申请
            }
            long et_direct = System.currentTimeMillis();

            System.out.println("在进行"+time+"次分配操作时，直接内存 分配耗时:" + (et_direct-st_heap) +"ms" );

        }

        /**
         * 直接内存 和 堆内存的 读写性能比较
         *
         * 结论：直接内存在直接的IO 操作上，在频繁的读写时 会有显著的性能提升
         *
         */
        public static void operateCompare(){
            int time = 1000000000;

            ByteBuffer buffer = ByteBuffer.allocate(2*time);
            long st = System.currentTimeMillis();
            for (int i = 0; i < time; i++) {

                //  putChar(char value) 用来写入 char 值的相对 put 方法
                buffer.putChar('a');
            }
            buffer.flip();
            for (int i = 0; i < time; i++) {
                buffer.getChar();
            }
            long et = System.currentTimeMillis();

            System.out.println("在进行"+time+"次读写操作时，非直接内存读写耗时：" + (et-st) +"ms");

            ByteBuffer buffer_d = ByteBuffer.allocateDirect(2*time);
            long st_direct = System.currentTimeMillis();
            for (int i = 0; i < time; i++) {

                //  putChar(char value) 用来写入 char 值的相对 put 方法
                buffer_d.putChar('a');
            }
            buffer_d.flip();
            for (int i = 0; i < time; i++) {
                buffer_d.getChar();
            }
            long et_direct = System.currentTimeMillis();

            System.out.println("在进行"+time+"次读写操作时，直接内存读写耗时:" + (et_direct - st_direct) +"ms");
        }
    }
    ```

## 3. HotSpot 虚拟机对象

### 3.1 对象的创建

- 虚拟机视角

  - 检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已被加载、解析和初始化过

    - 如果没有，则执行相应的类加载过程（第7章补充）
  - 虚拟机将为新生对象分配内存

    - 对象所需内存的大小在类加载完成后便可完全确定，为对象分配空间的任务实际上便等同于把一块确定大小的内存块从 Java 堆中划分出来

      - **指针碰撞（Bump The Pointer）**：Java 堆中内存是规整的

        - 被使用过的内存和空闲的内存被一个作为分界点指示器的指针分隔
        - 分配内存时，将指针向空闲的内存空间移动与对象大小相等的距离
      - **空闲列表（Free List）**：Java 堆中内存不是规整的

        - 虚拟机维护一个列表，记录哪些内存款是可用的
        - 分配内容时，从列表中找到一块足够大的空间划分给对象实例，并更新列表上的记录
      - Java 堆是否规整由所采用的垃圾收集器是否带有 **空间压缩整理（Compact）** 的能力决定
    - 并发情况下修改指针引发问题的解决方案

      - 对分配内存空间的动作进行同步处理
      - 把内存分配的动作按照线程划分在不同的空间之中进行，即每个线程在 Java 堆中预先分配一小块内存，称为**本地线程分配缓冲（Thread Local Allocation Buffer，TLAB）**，哪个线程要分匹配内存，就在哪个线程的本地缓冲区中分配，只有本地缓冲区用完了，分配新的缓冲区时才需要同步锁定
  - 虚拟机对对象进行必要的设置

    - 对象是哪个类的实例
    - 如何才能找到类的元数据信息
    - 对象的哈希码
    - 对象的 GC 分代年龄
    - 等
    - 这些信息存放在对象的对象头中
- Java 程序视角

  - 构造函数，即 Class 文件中的 < init >() 方法
    - new 指令之后会接着执行 < init >() 方法，按照程序员的意愿对对象进行初始化
    - 此时真正可用的对象才算完全创建出来

### 3.2 对象的内存布局

- **对象头（Header）**

  - 对象自身的运行时数据

    - 哈希码（HashCode）
    - GC 分代年龄
    - 锁状态标志
    - 线程持有的锁
    - 偏向线程 ID
    - 偏向时间戳
    - 等
  - 类型指针，即对象指向它的类型元数据的指针

    - Java 虚拟机通过这个指针来确定该对象是哪个类的实例
    - 并不是所有的虚拟机实现都必须在对象数据上保留类型指针
  - 如果 Java 对象是一个数组，那在对象头中还必须有一块用于记录数组长度的数据

    - 虚拟机可以通过 Java 对象的元数据信息确定 Java 对象的大小
- **实例数据（Instance Data）**

  - 对象真正存储的有效信息，即在程序代码中所定义的各种类型的字段内容
    - 无论是从父类继承下来，还是在子类中定义的字段都必须记录起来
    - 存储顺序会受到虚拟机分配策略参数和字段在 Java 源码中定义顺序的影响
- **对齐填充（Padding）**

  - 并不是必然存在的，也没有特别的含义，仅仅起着占位符的作用

### 3.3 对象的访问定位

- Java 程序通过栈上的 reference 数据来操作堆上的具体对象
- 访问方式

  - 句柄访问

    ![句柄访问](https://i-blog.csdnimg.cn/blog_migrate/538815cb5884581a112aee10905c3c22.jpeg#pic_center)

    - Java 堆中可能会划分出一块内存来作为句柄池
    - reference 中存储的就是对象的句柄地址
    - 句柄中包含了对象实例数据和类型数据各自具体的地址信息
    - 优点：reference 中存储的是稳定句柄地址，在对象被移动（垃圾收集）时只会改变句柄中的实例数据指针，而 reference 本身不需要被修改
  - 直接指针访问

    ![直接指针访问](https://i-blog.csdnimg.cn/blog_migrate/b70c4fd655cac440bbd32284add6519c.jpeg#pic_center)

    - Java 堆中对象的内存布局必须考虑如何放置访问类型数据的相关信息
    - reference 中存储的就是对象的地址
    - 优点：速度块，节省了一次指针定位的时间开销