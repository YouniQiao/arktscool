---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 数据类型

## 基本类型和引用类型

基本数据类型包括`number`、`string`等简单类型，它们可以准确地表示单一的数据类型。对基本类型的存储和访问都是直接的，比较时直接比较其值。

引用类型包括对象、数组和函数等复杂数据结构。这些类型通过引用访问数据，对象和数组可以包含多个值或键值对，函数则可以封装可执行的代码逻辑。引用类型在内存中通过指针访问数据，修改引用会影响原始数据。

## number类型

ArkTS提供`number`类型，任何整数和浮点数都可以被赋给此类型的变量。

数字字面量包括整数字面量和十进制浮点数字面量。

整数字面量包括以下类别：

* 十进制整数，由数字序列组成。例如：`0`、`117`、`-345`。
* 十六进制整数，以0x（或0X）开头，包含数字（0-9）和字母a-f或A-F。例如：`0x1123`、`0x00111`、`-0xF1A7`。
* 八进制整数，以0o（或0O）开头，只能包含数字（0-7）。例如：`0o777`。
* 二进制整数，以0b（或0B）开头，只能包含数字0和1。例如：`0b11`、`0b0011`、`-0b11`。

浮点数字面量包括以下部分：

* 十进制整数，可为有符号数（前缀为“+”或“-”）。
* 小数点（“.”）。
* 小数部分（由十进制数字字符串表示）。
* 指数部分，以“e”或“E”开头，后跟有符号（前缀为“+”或“-”）或无符号整数。

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

`number`类型在表示大整数（即超过-9007199254740991~9007199254740991）时会造成精度丢失。在开发时可以按需使用`BigInt`类型来确保精度：

```typescript
let bigInt: BigInt = BigInt('999999999999999999999999999999999999999999999999999999999999');
console.info('bigInt:' + bigInt.toString());
```

## boolean类型

`boolean`类型由`true`和`false`两个逻辑值组成。

通常在条件语句中使用`boolean`类型的变量：

```typescript
let isDone: boolean = false;

// ...

if (isDone) {
  console.info('Done!');
}
```

## string类型

`string`类型代表字符序列，可以使用转义字符来表示字符。

字符串字面量由单引号（'）或双引号（"）之间括起来的零个或多个字符组成。字符串字面量还有一特殊形式，是用反向单引号（\`）括起来的模板字面量。

```typescript
let s1 = 'Hello, world!\n';
let s2 = "this is a string";
let a = 'Success';
let s3 = `The result is ${a}`;
```

## void类型

`void`类型用于指定函数没有返回值。
此类型只有一个值，同样是`void`。由于`void`是引用类型，因此它可以用于泛型类型参数。

```typescript
class Class<T> {
  //...
}
let instance: Class <void>
```

## Object类型

`Object`类型是所有引用类型的基类型。任何值，包括基本类型的值，都可以直接被赋给`Object`类型的变量（基本类型值会被自动装箱）。`Object`类型用于表示除基本类型外的类型。

```typescript
let o1: Object = 'Alice';
let o2: Object = ['a','b'];
let o3: Object = 1;
```

## array类型

`array`类型，即数组，是由可赋值给数组声明中指定的元素类型的数据组成的对象。
数组可由数组复合字面量赋值。数组复合字面量是用方括号括起来的零个或多个表达式列表，每个表达式为数组中的一个元素。数组的长度由数组中元素的个数确定。数组中第一个元素的索引为0。

以下示例将创建包含三个元素的数组：

```typescript
let names: string[] = ['Alice', 'Bob', 'Carol'];
```

## enum类型

`enum`类型，即枚举类型，是预先定义的一组命名值的值类型，其中命名值又称为枚举常量。
使用枚举常量时必须以枚举类型名称为前缀。

```typescript
enum ColorSet { Red, Green, Blue }
let c: ColorSet = ColorSet.Red;
```

常量表达式用于显式设置枚举常量的值。

```typescript
enum ColorSet { White = 0xFF, Grey = 0x7F, Black = 0x00 }
let c: ColorSet = ColorSet.Black;
```

## Union类型

`Union`类型，即联合类型，是由多个类型组合成的引用类型。联合类型包含了变量可能的所有类型。

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
type Animal = Cat | Dog | Frog | number | string | null | undefined;
// Cat、Dog、Frog是一些类型（类或接口）

let animal: Animal = new Cat();
animal = new Frog();
animal = 42;
animal = 'dog';
animal = undefined;
// 可以将类型为联合类型的变量赋值为任何组成类型的有效值
```

可以使用不同机制获取联合类型中的特定类型值。

示例：

```typescript
class Cat { sleep () {}; meow () {} }
class Dog { sleep () {}; bark () {} }
class Frog { sleep () {}; leap () {} }

type Animal = Cat | Dog | Frog;

function foo(animal: Animal) {
  if (animal instanceof Frog) {  // 判断animal是否是Frog类型
    animal.leap();  // animal在这里是Frog类型
  }
  animal.sleep(); // Animal具有sleep方法
}
```

## Aliases类型

`Aliases`类型为匿名类型（如数组、函数、对象字面量或联合类型）提供名称，或为已定义的类型提供替代名称。

```typescript
// 二维数组类型
type Matrix = number[][];
const gameBoard: Matrix = [
  [1, 0],
  [0, 1]
];

// 函数类型
type Handler = (s: string, no: number) => string;
const repeatString: Handler = (str, times) => {
  return str.repeat(times);
};
console.info(repeatString("abc", 3)); // "abcabcabc"

// 泛型函数类型
type Predicate<T> = (x: T) => boolean;
const isEven: Predicate<number> = (num) => num % 2 === 0;

// 可为空的对象类型
type NullableObject = Object | null;
class cat {}
let animalData: NullableObject = new cat();
let emptyData: NullableObject = null;
```