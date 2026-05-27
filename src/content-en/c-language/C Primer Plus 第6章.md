## 1. while statement

```
while (expression)
{
	statement
}
```

- A statement can be a simple sentence ending in a semicolon or a compound statement enclosed in parentheses.
- The expression part mostly uses relational expressions
- If the expression is true (not 0), the statement part is executed once, and then the expression is judged again.
- If expression is true (non-zero), the statement part is executed once, and then expression is judged again.
- Each loop is called an iteration.

### 1.1 Terminating a while loop

- When constructing a while loop, the value of the test expression must change, and the expression must eventually be false.
- Otherwise, the loop will not terminate

### 1.2 When to terminate a loop

- The decision to terminate the loop is made only when the test condition is evaluated.

### 1.3 while: entry condition loop

- A while loop is a conditional loop that uses an entry condition.
- Entry condition: a condition is satisfied to enter the loop body

### 1.4 Syntax highlights

- Only the individual statements (simple or compound) that follow the test condition are part of the loop.

```c
int i = 0

while (i < 3)
    printf("%d", i);
	i++;
// 无限循环（infinite loop）

while (i++ < 5);
    printf("%d", i);
// 只会输出一次
// 测试条件后面的单独分号是空语句（null statement）
```

## 2. Compare sizes with relational operators and expressions

- While loops often rely on test expressions for comparisons, which are called relational expressions, and the operator that appears in the middle of a relational expression is called a relational operator.

| operator | meaning |
| --- | --- | < | less than
| < | less than |
| > | greater than |
| <= | Less than or equal to |
| >= | Greater than or equal to |
| == | equals |
Equal to | ! == | not equal |

- When comparing characters, the relational operator compares machine character codes (ANSII).
- **Strings cannot be compared using relational operators

### 2.1 What is true

- An expression that is true has a value of 1.
- The value of a false expression is 0.

```c
int i;
int j;

i = (3 > 2);
j = (3 < 2);

printf("true = %d, flase = %d\n", i, j);
// true = 1, flase = 0
```

### 2.2 Other truth values

- All non-zero values are considered true
- Only 0 is considered false

```c
int i = 5;

while (i)
{
    printf("%d\n", i);
    i--;
}
```

### 2.3 Problems with truth values

- Don't make the mistake of using == (equals) and = (assignment)
- Relational operators are used to form relational expressions
- Relational expressions have a value of 1 when they are true and a value of 0 when they are false.
- Statements that normally use relational expressions as test conditions (while and if) can use any expression as a test condition, with non-zero being true and zero being false.

### 2.4 The new \_Bool type

- C99 has a new \_Bool type for Boolean variables.
- The \_Bool type can only store 1 (true) or 0 (false).
- If other non-zero values are assigned to a variable of type \_Bool, the variable will be set to 1.
- C99 provides the stdbool.h header file, which makes bool an alias for \_Bool, defining true and false as symbolic constants of 1 and 0, respectively

### 2.5 Priority and Relational Operators

| Operators (highest to lowest priority) | Combining Laws |
| --- | --- |
| () | left to right |
| -, +, ++, -, sizeof | | right to left |
| \*, /, % | left to right |
| +, - | left to right |
| <, >, <=, >= | From left to right |
| ==, ! = = | from left to right |
| = = | From right to left |

## 3. Indeterminate and counting loops

- indefinite loop: the number of times the loop is to be executed is not known until the test expression is false.
- counting loop: know how many times to repeat the loop before executing it.

## 4. for loops

- The for loop combines initialization, testing, and updating.

```
for(初始化; 测试条件; 执行更新)
{
    简单句 / 复合句
}
```

- Initialization: executed only once at the beginning of the for loop.
- Test condition: evaluates the expression before executing the loop; if the expression is false, the loop ends.
- Execute update: evaluate at the end of each loop
- The expressions in parentheses are also called control expressions.

### 4.1 Utilizing the Flexibility of for

- Decrementing the counter with the decrement operator

```c
for (int i = 5; i > 0; i--)
{
    printf("%d\n", i);
}
```

- Increment the counter.

```c
for (int i = 2; i < 10; i += 2)
{
    printf("%d\n", i);
}
```

- Counting Characters Instead of Numbers

```c
for (char c = 'a'; c < 'z'; c++)
{
    printf("c = %c = %d\n", c, c);
}
```

- Testing other conditions

```c
for (int i = 2; i * i < 10; i++)
{
    printf("%d\n", i);
}
```

- The incremental amount grows geometrically

```c
for (int i = 2; i < 10; i *= 2)
{
    printf("%d\n", i);
}
```

- Perform an update, using any legal expression

```c
int j = 0;

for (int i = 2; i < 10; j = (++i) * 2)
{
    printf("i = %d, j = %d\n", i, j);
}
```

- Omit one or more expressions (semicolons cannot be omitted)

```c
for (int i = 2; i < 10;)
{
    printf("%d\n", i);
    i++;
}
```

- Initialize, using printf()

```c
int i = 0;

for (printf("keep enter"); i != 6;)
{
    scanf("%d", &i);
}
```

- The behavior in the loop body can change the expression in the loop header

```c
int j = 0;

for (int i = 1; i < 10; i = i + j)
{
    j = i;
    printf("i = %d, j = %d\n", i, j);
}
```

## 5. Other assignment operators: +=, -=, \*=, /=, %=

| operators | meaning |
| --- | --- |
| += | i += 1 Equivalent to i = i + 1 |
| -= | i -= 1 Equivalent to i = i - 1 |
| \*= | i \*= 1 is equivalent to i = i \* 1 |
| /= | i /= 1 is equivalent to i = i / 1 | | %= | i %= | i %= | i %= 1 is equivalent to i = i - 1
| %= | i %= 1 is equivalent to i = i % 1 |

## 6. Comma operator

- Extend the flexibility of for loops to include more expressions in the loop header.

```c
int i = 0;
int j = 0;

for (i = 1, j = 1; i <= 9; i++, j = 1)
{
    while (j <= i) {
        printf("%d * %d = %2d   ", i, j, i * j);
        j++;
    }
    printf("\n");
}
```

- The comma operator is not limited to use in for loops, but this is where it is most commonly used
- Two other properties of the comma operator

  - The expression it separates is guaranteed to evaluate from left to right (the comma is a sequence point, so all the side effects of the items to the left of the comma occur before the program executes the items to the right of the comma)
  - the value of the entire comma expression is the value of the right-hand term

    ```c
    #include <stdio.h>

    int main() {

        int i = 0;
        int j = 0;

        i = 200, 500;
        printf("i = %d\n", i);
        // i = 200

        j = (200, 500);
        printf("j = %d\n", j);
        // j = 500
    }
    ```

## 7. exit conditional loop: do while

- Exit-condition loop: checks the test condition after each iteration of the loop, ensuring that the contents of the loop body are executed at least once.

```
do
    statement
while (expression);
```

- statement can be a simple statement or a compound statement.
- The do while loop executes the test condition after the loop body is executed, at least once.

## 8. How to select a loop

- Determine whether to use an entry or exit conditional loop
- Entry conditional loops are used more often
  - As a general rule, it is better to test the conditions before executing the loop.
  - Tests placed at the beginning of the loop are more readable.
  - In many applications, it is desirable to skip the entire loop if the test condition is not met at the beginning.
- When loops involve initializing and updating variables, for loops are more appropriate.
- In other cases, while loops are better.

## Nested loops

- A nested loop is a loop that contains another loop within it.
- Nested loops are often used to display data in rows and columns, where one loop processes all the columns in a row and another loop processes all the rows.

```c
for (int i = 9; i >= 1; i--) // 外层循环（outer loop）
{
    for (int j = 1; j <= i; j++) // 内层循环（inner loop）
    {
        printf("%d * %d = %2d ", j, i, i * j);
    }
    printf("\n");
}
```