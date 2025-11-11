# 基础知识

TODO:
1.自动类型推断


## 声明变量

ArkTS使用let声明变量。

``` typescript 

let hi: string = 'hello';
hi = 'hello, world';

```

## 声明常量

ArkTS使用const声明常量。

``` typescript 

const hello:string = 'hello';

```


## 数据类型

### `Number`类型

ArkTS提供`number`和`Number`类型，任何整数和浮点数都可以被赋给此类型的变量。

数字字面量包括整数字面量和十进制浮点数字面量。

整数字面量包括以下类别：

* 由数字序列组成的十进制整数。例如：`0`、`117`、`-345`
* 以0x（或0X）开头的十六进制整数，可以包含数字（0-9）和字母a-f或A-F。例如：`0x1123`、`0x00111`、`-0xF1A7`
* 以0o（或0O）开头的八进制整数，只能包含数字（0-7）。例如：`0o777`
* 以0b（或0B）开头的二进制整数，只能包含数字0和1。例如：`0b11`、`0b0011`、`-0b11`

浮点字面量包括以下：

* 十进制整数，可为有符号数（即，前缀为“+”或“-”）；
* 小数点（“.”）
* 小数部分（由十进制数字字符串表示）
* 以“e”或“E”开头的指数部分，后跟有符号（即，前缀为“+”或“-”）或无符号整数。

示例：

```typescript
let n1 = 3.14;
let n2 = 3.141592;
let n3 = .5;
let n4 = 1e2;

function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

factorial(n1)  //  7.660344000000002 
factorial(n2)  //  7.680640444893748 
factorial(n3)  //  1 
factorial(n4)  //  9.33262154439441e+157 
```

### `Boolean`类型

`boolean`类型由`true`和`false`两个逻辑值组成。

通常在条件语句中使用`boolean`类型的变量：

```typescript
let isDone: boolean = false;

// ...

if (isDone) {
  console.log ('Done!');
}
```

### `String`类型

`string`代表字符序列；可以使用转义字符来表示字符。

字符串字面量由单引号（'）或双引号（"）之间括起来的零个或多个字符组成。字符串字面量还有一特殊形式，是用反向单引号（\`）括起来的模板字面量。

```typescript
let s1 = 'Hello, world!\n';
let s2 = 'this is a string';
let a = 'Success';
let s3 = `The result is ${a}`;
```

### `Void`类型

`void`类型用于指定函数没有返回值。
此类型只有一个值，同样是`void`。由于`void`是引用类型，因此它可以用于泛型类型参数。

```typescript
class Class<T> {
  //...
}
let instance: Class <void>
```

### `Object`类型

`Object`类型是所有引用类型的基类型。任何值，包括基本类型的值（它们会被自动装箱），都可以直接被赋给`Object`类型的变量。`object`类型则用于表示除非基本类型外的类型。

### `Array`类型

`array`，即数组，是由可赋值给数组声明中指定的元素类型的数据组成的对象。
数组可由数组复合字面量（即用方括号括起来的零个或多个表达式的列表，其中每个表达式为数组中的一个元素）来赋值。数组的长度由数组中元素的个数来确定。数组中第一个元素的索引为0。

以下示例将创建包含三个元素的数组：

```typescript
let names: string[] = ['Alice', 'Bob', 'Carol'];
```

### `Enum`类型

`enum`类型，又称枚举类型，是预先定义的一组命名值的值类型，其中命名值又称为枚举常量。
使用枚举常量时必须以枚举类型名称为前缀。

```typescript
enum ColorSet { Red, Green, Blue }
let c: ColorSet = ColorSet.Red;
```

常量表达式可以用于显式设置枚举常量的值。

```typescript
enum ColorSet { White = 0xFF, Grey = 0x7F, Black = 0x00 }
let c: ColorSet = ColorSet.Black;
```

### `Union`类型

`union`类型，即联合类型，是由多个类型组合成的引用类型。联合类型包含了变量可能的所有类型。

```typescript
class Cat {
  name: string = 'cat';
  // ...
}
class Dog {
  name: string = 'dog';
  // ...
}
class Frog {
  name: string = 'frog';
  // ...
}
type Animal = Cat | Dog | Frog | number;
// Cat、Dog、Frog是一些类型（类或接口）

let animal: Animal = new Cat();
animal = new Frog();
animal = 42;
// 可以将类型为联合类型的变量赋值为任何组成类型的有效值
```

可以用不同的机制获取联合类型中特定类型的值。
示例：

```typescript
class Cat { sleep () {}; meow () {} }
class Dog { sleep () {}; bark () {} }
class Frog { sleep () {}; leap () {} }

type Animal = Cat | Dog | Frog;

function foo(animal: Animal) {
  if (animal instanceof Frog) {
    animal.leap();  // animal在这里是Frog类型
  }
  animal.sleep(); // Animal具有sleep方法
}
```

### `Aliases`类型

`Aliases`类型为匿名类型（数组、函数、对象字面量或联合类型）提供名称，或为已有类型提供替代名称。

```typescript
type Matrix = number[][];
type Handler = (s: string, no: number) => string;
type Predicate <T> = (x: T) => boolean;
type NullableObject = Object | null;
```

## 运算符

### 赋值运算符

赋值运算符`=`，使用方式如`x=y`。

复合赋值运算符将赋值与运算符组合在一起，其中`x op = y`等于`x = x op y`。

复合赋值运算符列举如下：`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`、`&=`、`|=`、`^=`。

### 比较运算符

| 运算符| 说明                                                 |
| -------- | ------------------------------------------------------------ |
| `===`    | 如果两个操作数严格相等（对于不同类型的操作数认为是不相等的），则返回true。 |
| `!==`    | 如果两个操作数严格不相等（对于不同类型的操作数认为是不相等的），则返回true。 |
| `==`     | 如果两个操作数相等，则返回true。 |
| `!=`     | 如果两个操作数不相等，则返回true。    |
| `>`      | 如果左操作数大于右操作数，则返回true。 |
| `>=`     | 如果左操作数大于或等于右操作数，则返回true。 |
| `<`      | 如果左操作数小于右操作数，则返回true。    |
| `<=`     | 如果左操作数小于或等于右操作数，则返回true。 |

### 算术运算符

一元运算符为`-`、`+`、`--`、`++`。

二元运算符列举如下：

| 运算符| 说明             |
| -------- | ------------------------ |
| `+`      | 加法                |
| `-`      | 减法             |
| `*`      | 乘法          |
| `/`      | 除法                |
| `%`      | 除法后余数|

### 位运算符

| 运算符 | 说明                                                 |
| --------- | ------------------------------------------------------------ |
| `a & b`   | 按位与：如果两个操作数的对应位都为1，则将这个位设置为1，否则设置为0。|
| `a \| b`  | 按位或：如果两个操作数的相应位中至少有一个为1，则将这个位设置为1，否则设置为0。|
| `a ^ b`   | 按位异或：如果两个操作数的对应位不同，则将这个位设置为1，否则设置为0。|
| `~ a`     | 按位非：反转操作数的位。               |
| `a << b`  | 左移：将a的二进制表示向左移b位。|
| `a >> b`  | 算术右移：将a的二进制表示向右移b位，带符号扩展。|
| `a >>> b` | 逻辑右移：将a的二进制表示向右移b位，左边补0。|

### 逻辑运算符

| 运算符  | 说明|
| ---------- | ----------- |
| `a && b`   | 逻辑与 |
| `a \|\| b` | 逻辑或 |
| `! a`      | 逻辑非 |


## 语句

### `If`语句

`if`语句用于需要根据逻辑条件执行不同语句的场景。当逻辑条件为真时，执行对应的一组语句，否则执行另一组语句（如果有的话）。
`else`部分也可能包含`if`语句。

`if`语句如下所示：

```typescript
if (condition1) {
  // 语句1
} else if (condition2) {
  // 语句2
} else {
  // else语句
}
```

条件表达式可以是任何类型。但是对于`boolean`以外的类型，会进行隐式类型转换：

```typescript
let s1 = 'Hello';
if (s1) {
  console.log(s1); // 打印“Hello”
}

let s2 = 'World';
if (s2.length != 0) {
  console.log(s2); // 打印“World”
}
```

### `Switch`语句

使用`switch`语句来执行与`switch`表达式值匹配的代码块。

`switch`语句如下所示：

```typescript
switch (expression) {
  case label1: // 如果label1匹配，则执行
    // ...
    // 语句1
    // ...
    break; // 可省略
  case label2:
  case label3: // 如果label2或label3匹配，则执行
    // ...
    // 语句23
    // ...
    break; // 可省略
  default:
    // 默认语句
}
```

如果`switch`表达式的值等于某个label的值，则执行相应的语句。

如果没有任何一个label值与表达式值相匹配，并且`switch`具有`default`子句，那么程序会执行`default`子句对应的代码块。

`break`语句（可选的）允许跳出`switch`语句并继续执行`switch`语句之后的语句。

如果没有`break`语句，则执行`switch`中的下一个label对应的代码块。

### 条件表达式

条件表达式由第一个表达式的布尔值来决定返回其它两个表达式中的哪一个。

示例如下：

```typescript
condition ? expression1 : expression2
```

如果`condition`的为真值（转换后为`true`的值），则使用`expression1`作为该表达式的结果；否则，使用`expression2`。

示例：

```typescript
let isValid = Math.random() > 0.5 ? true : false;
let message = isValid ? 'Valid' : 'Failed';
```

### `For`语句

`for`语句会被重复执行，直到循环退出语句值为`false`。

`for`语句如下所示：

```typescript
for ([init]; [condition]; [update]) {
  statements
}
```

`for`语句的执行流程如下：

1、 执行`init`表达式（如有）。此表达式通常初始化一个或多个循环计数器。  
2、 计算`condition`。如果它为真值（转换后为`true`的值），则执行循环主体的语句。如果它为假值（转换后为`false`的值），则`for`循环终止。  
3、 执行循环主体的语句。  
4、 如果有`update`表达式，则执行该表达式。  
5、 回到步骤2。  

示例：

```typescript
let sum = 0;
for (let i = 0; i < 10; i += 2) {
  sum += i;
}
```

### `For-of`语句

使用`for-of`语句可遍历数组或字符串。示例如下：

```typescript
for (forVar of expression) {
  statements
}
```

示例：

```typescript
for (let ch of 'a string object') {
  /* process ch */
}
```

### `While`语句

只要`condition`为真值（转换后为`true`的值），`while`语句就会执行`statements`语句。示例如下：

```typescript
while (condition) {
  statements
}
```

示例：

```typescript
let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}
```

### `Do-while`语句

如果`condition`的值为真值（转换后为`true`的值），那么`statements`语句会重复执行。示例如下：

```typescript
do {
  statements
} while (condition)
```

示例：

```typescript
let i = 0;
do {
  i += 1;
} while (i < 10)
```

### `Break`语句

使用`break`语句可以终止循环语句或`switch`。

示例：

```typescript
let x = 0;
while (true) {
  x++;
  if (x > 5) {
    break;
  }
}
```

如果`break`语句后带有标识符，则将控制流转移到该标识符所包含的语句块之外。

示例：

```typescript
let x = 1;
label: while (true) {
  switch (x) {
    case 1:
      // statements
      break label; // 中断while语句
  }
}
```

### `Continue`语句

`continue`语句会停止当前循环迭代的执行，并将控制传递给下一个迭代。

示例：

```typescript
let sum = 0;
for (let x = 0; x < 100; x++) {
  if (x % 2 == 0) {
    continue;
  }
  sum += x;
}
```

### `Throw`和`Try`语句

`throw`语句用于抛出异常或错误：

```typescript
throw new Error('this error')
```

`try`语句用于捕获和处理异常或错误：

```typescript
try {
  // 可能发生异常的语句块
} catch (e) {
  // 异常处理
}
```

下面的示例中`throw`和`try`语句用于处理除数为0的错误：

```typescript
class ZeroDivisor extends Error {}

function divide (a: number, b: number): number{
  if (b == 0) throw new ZeroDivisor();
  return a / b;
}

function process (a: number, b: number) {
  try {
    let res = divide(a, b);
    console.log('result: ' + res);
  } catch (x) {
    console.log('some error');
  }
}
```

支持`finally`语句：

```typescript
function processData(s: string) {
  let error: Error | null = null;

  try {
    console.log('Data processed: ' + s);
    // ...
    // 可能发生异常的语句
    // ...
  } catch (e) {
    error = e as Error;
    // ...
    // 异常处理
    // ...
  } finally {
    if (error != null) {
      console.log(`Error caught: input='${s}', message='${error.message}'`);
    }
  }
}
```