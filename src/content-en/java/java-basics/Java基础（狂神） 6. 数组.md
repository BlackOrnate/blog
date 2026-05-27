#### Catalog

- [1. What is an array](#1__2)
- [2. Declaring and creating arrays](#2__11)
- [3. Three types of initialization and memory analysis](#3__37)
- [4. Array boundaries](#4__74)
- [5. Using arrays](#5__81)
- [6. Multidimensional arrays](#6__135)
- [7. Arrays class](#7_Arrays_149)
- [8. Bubble Sort](#8__186)
- [9. Sparse arrays](#9__221)

## 1. What are arrays

- Definition:
  - An array is an ordered collection of data of the same type.
  - An array describes a number of pieces of data of the same type, arranged in a certain order.
  - Where each piece of data is called an array element, and each array element can be accessed with a subscript

## 2. Declaration and Creation of Arrays

- An array variable must first be declared in order to use an array in a program.

  ```
  dataType[] arrayRefar; // 首选方法
  或
  dataType arrayRefVar[]; // 效果相同，但不推荐
  ```
- The Java language uses the new operation to create arrays.

  ```
  dataType[] arrayRefVar = new dataType[arraySize];
  ```
- The elements of an array are accessed by index, starting at index 0.
- Getting the length of an array

  ```
  arrays.length
  ```

## 3. Three initializations and memory analysis

- Java memory analysis:

  - Heap:
    - Stores new objects and arrays.
    - It can be shared by all threads and does not hold references to other objects.
  - Stack:
    - Stack: Stores basic variable types (will contain the value of the basic type).
    - Variables that refer to objects (which hold the address of the reference in the heap).
  - Method area:
    - Can be shared by all threads.
    - Contains all class and static variables.
- Three types of initialization:

  - Static initialization:

    Static initialization: ```
    int[] a = {1,2,3};
    ABC[] abc = {new ABC(1,1), new ABC(2,2)};
    ```
  - Dynamic initialization (includes default initialization):

    ```
    int[] a = new int[2];
    a[0] = 1;
    a[1] = 2;
    ```
  - Default initialization:

    An array is a reference type whose elements are equivalent to instance variables of a class, so as soon as space is allocated for an array, each element is implicitly initialized in the same way as an instance variable.

## 4. Array boundaries

- The legal range for subscripts is [0, length-1], if it is exceeded, an error will be reported.
- ArrayIndexOutOfBoundsException: array subscript out of bounds exception.

## 5. Using arrays

- For loop: get data

  ```
  int max = arrays[0];

  for(int i = 0; i < arrays.length; i++){
      if(arrays[i] > max){
          max = arrays[i];
      }
  }
  ```
- For-Each loop: print the result

  ```java
  for(int array:arrays){
      System.out.println(array);
  }
  ```
- Arrays as method inputs: operate on arrays.

  ```java
  public static void main(String[] args){
      printArray(arrays);
  }

  public static void printArray(int[] arrays){
      for(inr i = 0; i < arrays.length; i++){
          System.out.print(arrays[i]);
      }
  }
  ``` Array as return value.
- Array as return value: modifies the array and returns the new array.

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

## 6. Multidimensional arrays

- Multidimensional arrays can be thought of as arrays of arrays
- Two-dimensional arrays

  ```
  int a[][] = new int[m][n];
  ```

  Array of m rows and n columns

## 7. Arrays class

- Tool class for arrays java.util.Arrays
- Since the array object itself does not have many methods available to the user, the API provides a utility class Arrays for the user to perform some basic operations on the array object.
- Arrays class methods are static modified static methods, in the use of the time you can directly use the class name to call, and "do not have to" use the object to call (is "do not have to" not "can not") ")
- It has the following common functions:
  - assigning values to arrays: the fill method
  - Sorting arrays: the sort method, in ascending order.
  - Comparison of arrays: equals method to compare the value of the elements in the array is equal or not
  - Find the elements of the array: binarySearch method can be sorted array binary search method operation

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

## 8. bubble sort

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

## 9. Sparse Arrays

- When most of the elements of an array are zero, or when the array is of the same value, you can use a coefficient array to preserve the array.
- Sparse arrays are handled in the following way:
  - Record the number of rows and columns in the array and the number of distinct values.
  - Record the elements, rows and columns with different values in a small array, thus reducing the size of the program.

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