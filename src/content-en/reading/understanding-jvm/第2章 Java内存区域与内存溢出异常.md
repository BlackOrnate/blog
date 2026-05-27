#### Catalog

- [1. Overview](#1__2)
- [2. Runtime Data Area](#2__15)
- [2.1 Program Counter](#21__24)
  - [2.2 Java Virtual Machine Stack](#22_Java__42)
  - [Stack](#_65)
  - [2.3 Native Method Stack](#23__71)
  - [2.4 Java Heap](#24_Java__85)
  - [2.5 Method Area](#25__100)
  - [2.6 Runtime Constant Pool](#26__114)
  - [2.7 Direct Memory](#27__145)
- [3. HotSpot Virtual Machine Objects](#3_HotSpot__254)
- [3.1 Object creation](#31__256)
  - [3.2 Memory layout of objects](#32__304)
  - [3.3 Access localization of objects](#33__338)

## 1. Overview

- For C and C++ program developers

  - have the "ownership" of each object.
  - They are also responsible for maintaining each object from the beginning to the end of its life.
- For Java program developers

  - With the help of the virtual machine's automatic memory management mechanism, there is no longer a need to pair delete/free code for each new operation, and memory leaks and overflows are less likely to occur.

## 2. Runtime Data Areas

- During the execution of a Java program, the Java Virtual Machine divides the memory it manages into a number of different data areas

! [Java Virtual Machine Runtime Data Area](https://i-blog.csdnimg.cn/blog_migrate/eff7fff91b678d966e2d7460522f1a73.jpeg#pic_center)

### 2.1 Program Counters

- The **Program Counter Register** is a small piece of memory.

  - ** a line number indicator of the bytecode currently being executed by a ** thread.
- In the conceptual model of the Java Virtual Machine, the bytecode interpreter works by changing the value of this counter to select the next bytecode instruction to be executed.
- It is the index of the program's flow of control. Basic functions such as branching, looping, jumping, exception handling, thread resumption, and so on, all depend on this counter.
- **"Thread-private" memory**: In order to recover to the correct execution position after thread switching, each thread needs to have an independent program counter, and the counters between threads do not affect each other and are stored independently of each other in the memory area.
- If the thread is executing a Java method, this counter records the address of the virtual machine bytecode instruction being executed.
- If the thread is executing a Native method, the counter value is Undefined.

### 2.2 The Java Virtual Machine Stack

- The Java Virtual Machine Stack.

  - **Thread private
  - Lifecycle is the same as a thread
- The virtual machine stack describes the memory model of the thread in which a **Java method** executes.

  - Each time a method is executed, the Java Virtual Machine creates a \*\**Stack Frame\*\*\*to store local variable tables, operand stacks, dynamic connections, method exits, and so on.
  - Each method is called until the process of execution is completed, corresponds to a stack frame in the virtual machine stack from the process of entry to exit the stack
- Local Variable Table Storage

  - Basic data types (boolean, byte, char, short, int, float, long, double).
  - object reference (reference type, it is not the same as the object itself, may be a reference pointer to the starting address of the object, may also point to a handle on behalf of the object or other related to the location of the object)
  - The returnAddress type (which points to the address of a bytecode instruction).
- The storage space for these data types in the local variable table is represented by the local variable \*\*slot\*\*, of which the 64-bit long and double types occupy 2 slots, and the rest of the data types occupy only 1 slot.
- The memory space required for the local variable table is allocated during compilation, when entering a method, the "size" of the local variable space (number of slots) that the method needs to allocate in the stack frame is completely determined, and the size of the local variable table does not change during the method's runtime

#### stack

- "Stack" usually refers to the virtual machine stack, or more often just the local variable table part of the virtual machine stack.

### 2.3 Local Method Stack

- Native Method Stacks

  - Acts similarly to the VM stacks
  - Serve native methods used by the VM.
- It can be implemented by a specific VM as needed, and some Java VMs (HotSport VM) even combine the Native Method Stacks and the VM Stacks into a single stack.

### 2.4 The Java Heap

- The **Java Heap** is the largest block of memory managed by the virtual machine.

  - It is an area of memory that is shared by all threads and is created when the virtual machine starts.
  - The sole purpose of this memory area is to **store object instances**, and in the Java world **"almost "** all object instances are allocated here.
  - This is the memory area managed by the garbage collector.
  - Multiple Thread Local Allocation Buffers (TLAB) can be carved out to improve efficiency when allocating objects.

    - No matter what angle, no matter how to divide, will not change the commonality of the content stored in the Java heap, no matter which area, the storage can only be an instance of the object, the purpose of the Java heap subdivided only for better recovery of memory, or faster allocation of memory **.
  - can be in a physically non-contiguous memory space, but logically it should be treated as contiguous
  - can be implemented as either fixed-sized or scalable

### 2.5 Method Area

- The **Method Area** is an area of memory shared by all threads.

  - It is used to store data such as type information, constants, static variables, and on-the-fly compiler-compiled code caches that have been loaded by the virtual machine.
  - Does not require contiguous memory.
  - Can be fixed-sized or scalable
  - Can choose not to implement garbage collection

    - Memory reclamation targets are mainly for the reclamation of the constant pool and the unloading of types.

### 2.6 Runtime Constant Pools

- The **Runtime Constant Pool** is part of the method area.
- The Class file contains

  - the version of the class
  - fields
  - Methods
  - Interfaces
  - Descriptive information
  - Constant Pool Table

    - Stores the various literals and symbols generated by the compiler.
    - This section is stored in the runtime constant pool in the method area after the class is loaded.
- The Java Virtual Machine has strict rules about the format of each part of the Class file (including the Constant Pool), but does not require any details about the Runtime Constant Pool.
- Another important feature of the runtime pool for the Class file constant pool is that

  - Dynamic
  - Constants are not required to be generated only by the compiler.
  - It is not necessary for the contents of the pool to be placed in the Class file in order for it to enter the method area. 2.7 Runtime Constant Pooling, **New constants can be placed in the pool during runtime

### 2.7 Direct memory

- Direct Memory is not part of the virtual machine's runtime data area, nor is it a defined area of memory.

  - Off-heap memory
  - Directly allocated using the Native library
  - Operates with a DirectByteBuffer object stored in the Java heap as a reference to this memory
  - Significant performance improvements in some scenarios
    - Avoids copying data back and forth between the Java heap and the Native heap.
- Supplementary: [Direct Memory](https://blog.csdn.net/leaf_0303/article/details/78961936?ops_request_misc=%7B%22request%5Fid%22%3A% 22164791581516780366576521%22%2C%22scm%22%3A%2220140713.130102334... %22%7D&request_id=164791581516780366576521&biz_id=0&spm=1018.2226.3001.4187)

  - **Direct memory (off-heap memory) versus heap memory**

    - Direct memory requests for space consume more performance, especially when requested frequently up to a certain amount
    - Direct memory IO reads and writes outperform regular heap memory, with the difference being noticeable in the case of multiple reads and writes

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

## 3. HotSpot Virtual Machine Objects

### 3.1 Object creation

- Virtual Machine Perspective

  - Check that the arguments to this instruction locate a symbolic reference to a class in the constant pool, and check that the class represented by the symbolic reference has been loaded, parsed, and initialized.

    - If not, the appropriate class loading process is performed (Chapter 7 Supplement)
  - The virtual machine allocates memory for the newborn object

    - The size of the memory required for the object is fully determined after the class is loaded, and the task of allocating space for the object is effectively the same as dividing the Java heap into a fixed-size chunk of memory.

      - **Bump The Pointer**: memory in the Java heap is regularized

        - Used memory and free memory are separated by a pointer that acts as a demarcation point indicator.
        - When allocating memory, the pointer is moved a distance equal to the size of the object to the free memory space.
      - **Free List**: memory in the Java heap is not regular

        - The virtual machine maintains a list of which memory is available
        - When allocating content, it finds a large enough chunk of space from the list to allocate to an object instance, and updates the record on the list
      - The regularity of the Java heap is determined by the ability of the garbage collector used to **Compact** the memory.
    - Solution to a problem caused by modifying a pointer in a concurrent situation

      - Synchronizing the allocation of memory space
      - The action of allocating memory space is divided into different spaces according to threads, i.e., each thread is pre-allocated a small block of memory in the Java heap, which is called the **Thread Local Allocation Buffer (TLAB)**, and whichever thread wants to match the memory is allocated in the local buffer of whichever thread, and the new buffer is allocated only when the local buffer is exhausted, and then the new buffer is allocated. Only when the local buffer runs out and a new buffer is allocated is synchronization locking required.
  - The virtual machine makes the necessary settings for the object

    - Which class the object is an instance of
    - How to find metadata information about the class
    - The object's hash code
    - The GC generation age of the object
    - The object's hash code, the object's GC generation age, etc.
    - This information is stored in the object's header
- Java Program Perspective

  - The constructor, the < init >() method in the Class file.
    - The new instruction is followed by the < init >() method, which initializes the object as the programmer wishes.
    - At this point, the actual usable object is created.

### 3.2 Memory Layout of Objects

- **Object header **

  - Runtime data for the object itself

    - Hash code (HashCode)
    - GC generation age
    - Lock status flags
    - Locks held by threads
    - Bias Thread ID
    - Preferred thread ID
    - etc.
  - Type pointer, i.e., a pointer to the object's type metadata.

    - The Java Virtual Machine uses this pointer to determine which class the object is an instance of.
    - Not all virtual machine implementations must keep the type pointer on the object data
  - If the Java object is an array, there must also be a piece of data in the object header that records the length of the array

    - The virtual machine can determine the size of a Java object from its metadata information.
- ** Instance Data

  - The valid information that the object actually stores, i.e., the contents of the various types of fields defined in the program code.
    - Fields that are inherited from a parent class or defined in a child class must be recorded.
    - The order of storage is affected by the virtual machine's allocation policy parameters and the order in which fields are defined in the Java source code.
- **Alignment Padding

  - does not necessarily exist and has no special meaning, but merely serves as a placeholder

### 3.3 Access Locality of Objects

- A Java program operates on a specific object on the heap through reference data on the stack.
- The access method

  - Handle access

    ! [handle access](https://i-blog.csdnimg.cn/blog_migrate/538815cb5884581a112aee10905c3c22.jpeg#pic_center)

    - The Java heap may be partitioned into a pool of handles.
    - A reference is the address of an object's handle.
    - The handle contains information about the address of the object's instance data and type data.
    - Advantage: reference stores a stable handle address, so when the object is moved (garbage collected), only the pointer to the instance data in the handle is changed, and the reference itself does not need to be modified.
  - Direct pointer access

    direct pointer access [direct pointer access](https://i-blog.csdnimg.cn/blog_migrate/b70c4fd655cac440bbd32284add6519c.jpeg#pic_center)

    - The memory layout of objects in the Java heap must take into account how information about the type of data being accessed is placed.
    - The address of the object is stored in reference
    - Advantages: block speed, saves the time overhead of a single pointer location