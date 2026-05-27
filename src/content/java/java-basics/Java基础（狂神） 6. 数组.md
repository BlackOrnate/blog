#### 目录

- [1. 什么是数组](#1__2)
- [2. 数组的声明和创建](#2__11)
- [3. 三种初始化及内存分析](#3__37)
- [4. 数组边界](#4__74)
- [5. 数组的使用](#5__81)
- [6. 多维数组](#6__135)
- [7. Arrays类](#7_Arrays_149)
- [8. 冒泡排序](#8__186)
- [9. 稀疏数组](#9__221)

## 1. 什么是数组

- 定义：
  - 数组是相同类型数据的有序集合
  - 数组描述的是相同类型的若干个数据，按照一定的先后次序排列组合而成
  - 其中，每一个数据称作一个数组元素，每个数组元素可以通过一个下标来访问它们

## 2. 数组的声明和创建

- 首先必须声明数组变量，才能在程序中使用数组

  ```
  dataType[] arrayRefar; // 首选方法
  或
  dataType arrayRefVar[]; // 效果相同，但不推荐
  ```
- Java语言使用new操作来创建数组

  ```
  dataType[] arrayRefVar = new dataType[arraySize];
  ```
- 数组的元素是通过索引访问的，数组索引从0开始
- 获取数组长度

  ```
  arrays.length
  ```

## 3. 三种初始化及内存分析

- Java内存分析：

  - 堆：
    - 存放new的对象和数组
    - 可以被所有的线程共享，不会存放别的对象引用
  - 栈：
    - 存放基本变量类型（会包含这个基本类型的具体数值）
    - 引用对象的变量（会存放这个引用在堆里面的具体地址）
  - 方法区：
    - 可以被所有的线程共享
    - 包含了所有的class和static变量
- 三种初始化：

  - 静态初始化：

    ```
    int[] a = {1,2,3};
    ABC[] abc = {new ABC(1,1), new ABC(2,2)};
    ```
  - 动态初始化（包含默认初始化）：

    ```
    int[] a = new int[2];
    a[0] = 1;
    a[1] = 2;
    ```
  - 默认初始化：

    数组是引用类型，它的元素相当于类的实例变量，因此数组一经分配空间，其中的每个元素也被按照实例变量同样的方式被隐式初始化

## 4. 数组边界

- 下标的合法区间为：[0, length-1]，如果越界会报错
- ArrayIndexOutOfBoundsException：数组下标越界异常

## 5. 数组的使用

- For循环：获取数据

  ```
  int max = arrays[0];

  for(int i = 0; i < arrays.length; i++){
      if(arrays[i] > max){
          max = arrays[i];
      }
  }
  ```
- For-Each循环：打印结果

  ```java
  for(int array:arrays){
      System.out.println(array);
  }
  ```
- 数组作方法入参：对数组进行操作

  ```java
  public static void main(String[] args){
      printArray(arrays);
  }

  public static void printArray(int[] arrays){
      for(inr i = 0; i < arrays.length; i++){
          System.out.print(arrays[i]);
      }
  }
  ```
- 数组作返回值：修改数组并返回新的数组

  ```java
  public static void main(String[] args){
      int[] reverse = new reverseArray(arrays);
  }

  public static int[] reverseArray(int[] arrays){
      int[] result = new int[arrays.length];
      
      for(int i = 0, j = result.length - 1; i < arrays.length; i++, j--){
          result[j] = arrays[i];
      }
  }
  ```

## 6. 多维数组

- 多维数组可以看成是数组的数组
- 二维数组

  ```
  int a[][] = new int[m][n];
  ```

  m行n列的数组

## 7. Arrays类

- 数组的工具类java.util.Arrays
- 由于数组对象本身没有许多方法供用户使用，但API中提供了工具类Arrays供用户使用，从而可以对数组对象进行一些基本的操作
- Arrays类中的方法都是static修饰的静态方法，在使用的时候可以直接使用类名进行调用，而“不用”使用对象来调用（是“不用”不是“不能”）
- 具有以下常用功能：
  - 给数组赋值：fill方法
  - 对数组排序：sort方法，升序排序
  - 比较数组：equals方法比较数组中元素值是否相等
  - 查找数组元素：通过binarySearch方法能对排序好的数组进行二分查找法操作

```java
import java.util.Arrays;

public class demo {
    public static void main(String[] args) {
        int[] a = {2,1,5,3,4};

        System.out.println(a);
        // [I@16b98e56

        System.out.println(Arrays.toString(a));
        // [2, 1, 5, 3, 4]

        Arrays.sort(a);
        System.out.println(Arrays.toString(a));
        // [1, 2, 3, 4, 5]

        Arrays.fill(a,0);
        System.out.println(Arrays.toString(a));
        // [0, 0, 0, 0, 0]
    }
}
```

## 8. 冒泡排序

```java
import java.util.Arrays;

public class demo {
    public static void main(String[] args) {
        int[] a = {2,1,5,3,4,6,7,8,2};

        for (int j = 1; j <= a.length - 1 ; j++){

            int x;
            boolean y = true;

            for (int i = a.length - 1; i >= j; i--){
                if (a[i] < a[i-1]){
                    x = a[i];
                    a[i] = a[i-1];
                    a[i - 1] = x;
                    y = false;
                }
            }

            if (y){
                break;
            }
        }

        System.out.println(Arrays.toString(a));
    }
}
```

## 9. 稀疏数组

- 当一个数组中大部分元素为0，或者为同一值得数组时，可以使用系数数组来保存该数组
- 稀疏数组得处理方式是：
  - 记录数组一共几行几列，有多少个不同值
  - 把具有不同值得元素和行列及值记录在一个小规模得数组中，从而缩小程序的规模

```java
public class demo {
    public static void main(String[] args) {
        int[][] a = new int[11][11];
        a[1][2] = 1;
        a[2][3] = 1;

        for (int[] i : a) {
            for (int i1 : i) {
                System.out.print(i1 + "\t");
            }
            System.out.println();
        }

        int sum = 0;
        for (int[] ints : a) {
            for (int anInt : ints) {
                if (anInt != 0) {
                    sum++;
                }
            }
        }
        System.out.println(sum);
        System.out.println("************");

        int[][] b = new int[sum + 1][3];
        b[0][0] = 11;
        b[0][1] = 11;
        b[0][2] = sum;

        int count = 0;
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                if (a[i][j] != 0) {
                    count++;
                    b[count][0] = i;
                    b[count][1] = j;
                    b[count][2] = a[i][j];
                }
            }
        }

        for (int[] ints : b) {
            System.out.println(ints[0] + "\t"
                    + ints[1] + "\t"
                    + ints[2] + "\t");
        }

        System.out.println("************");

        int[][] c = new int[b[0][0]][b[0][1]];

        for (int i = 1; i < b.length; i++){
            c[b[i][0]][b[i][1]] = c[i][2];
        }

        for (int[] i : a) {
            for (int i1 : i) {
                System.out.print(i1 + "\t");
            }
            System.out.println();
        }
    }
}
```