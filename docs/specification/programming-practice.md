# 编程实践

本文参考业界标准和实践，结合ArkTS语言特点，提供编码指南，以提高代码的规范性、安全性和性能。

## 规则来源

ArkTS在保持TypeScript基本语法风格的基础上，进一步强化静态检查和分析。本文部分规则筛选自《[OpenHarmony应用TS&JS编程指南](https://gitcode.com/openharmony/docs/blob/master/zh-cn/contribute/OpenHarmony-Application-Typescript-JavaScript-coding-guide.md)》，为ArkTS语言新增的语法添加了规则，旨在提高代码可读性、执行性能。


## 总体原则

规则分为两个级别：要求和建议。

**要求**：表示原则上应该遵从。本文所有内容目前均为针对ArkTS的要求。

**建议**：表示该条款属于最佳实践，可结合实际情况考虑是否纳入。

## 编程实践

### 建议添加类属性的可访问修饰符

**【级别】建议**

**【描述】**

ArkTS提供了`private`, `protected`和`public`可访问修饰符。默认情况下，属性的可访问修饰符为`public`。选取适当的可访问修饰符可以提升代码的安全性和可读性。注意：如果类中包含`private`属性，无法通过对象字面量初始化该类。

**【反例】**

```
class C {
  count: number = 0

  getCount(): number {
    return this.count
  }
}
```

**【正例】**

```
class C {
  private count: number = 0

  public getCount(): number {
    return this.count
  }
}
```

### 不建议省略浮点数小数点前后的0

**【级别】建议**

**【描述】**

ArkTS中，浮点值包含一个小数点，不要求小数点之前或之后必须有一个数字。在小数点前面和后面都添加数字可以提高代码的可读性。

**【反例】**

```
const num = .5;
const num = 2.;
const num = -.7;
```

**【正例】**

```
const num = 0.5;
const num = 2.0;
const num = -0.7;
```

### 判断变量是否为`Number.NaN`时必须使用`Number.isNaN()`方法

**【级别】要求**

**【描述】**

在ArkTS中，`Number.NaN`是`Number`类型的一个特殊值。它被用来表示非数值，这里的数值是指在IEEE浮点数算术标准中定义的双精度64位格式的值。
在ArkTS中，`Number.NaN`的独特之处在于它不等于任何值，包括其本身。与`Number.NaN`进行比较时，结果是令人困惑的：`Number.NaN !== Number.NaN` 和 `Number.NaN != Number.NaN` 的值都是 `true`。
因此，必须使用`Number.isNaN()`函数来测试一个值是否是`Number.NaN`。

**【反例】**

```
if (foo == Number.NaN) {
  // ...
}

if (foo != Number.NaN) {
  // ...
}
```

**【正例】**

```
if (Number.isNaN(foo)) {
  // ...
}

if (!Number.isNaN(foo)) {
  // ...
}
```

### 数组遍历优先使用`Array`对象方法

**【级别】要求**

**【描述】**

对于数组遍历，应该优先使用Array对象方法，如：`forEach(), map(), every(), filter(), find(), findIndex(), reduce(), some()`。

**【反例】**

```
const numbers = [1, 2, 3, 4, 5];
// 依赖已有数组来创建新的数组时，通过for遍历，生成一个新数组
const increasedByOne: number[] = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}
```

**【正例】**

```
const numbers = [1, 2, 3, 4, 5];
// better: 使用map方法是更好的方式
const increasedByOne: number[] = numbers.map(num => num + 1);
```

### 不要在控制性条件表达式中执行赋值操作

**【级别】要求**

**【描述】**

控制性条件表达式用于 `if`、`while`、`for` 以及 `?:` 等条件判断语句中。
在控制性条件表达式中执行赋值容易导致意外行为，且降低代码的可读性。

**【反例】**

```
// 在控制性判断中赋值不易理解
if (isFoo = false) {
  // ...
}
```

**【正例】**

```
const isFoo = false; // 在上面赋值，if条件判断中直接使用
if (isFoo) {
  // ...
}
```

### 在`finally`代码块中，不要使用`return`、`break`、`continue`或抛出异常，避免`finally`块非正常结束

**【级别】要求**

**【描述】**

在`finally`代码块中，直接使用`return`、`break`、`continue`、`throw`语句或调用方法时未处理异常，会导致`finally`代码块无法正常结束。`finally`代码块异常结束会影响`try`或`catch`代码块中异常的抛出，也可能影响方法的返回值。因此，必须确保`finally`代码块正常结束。

**【反例】**

```
function foo() {
  try {
    // ...
    return 1;
  } catch (err) {
    // ...
    return 2;
  } finally {
    return 3;
 }
}
```

**【正例】**

```
function foo() {
  try {
    // ...
    return 1;
  } catch (err) {
    // ...
    return 2;
  } finally {
    console.info('XXX!');
  }
}
```

### 避免使用`ESObject`

**【级别】建议**

**【描述】**

`ESObject`主要用于ArkTS和TS/JS的跨语言调用场景中的类型标注。在非跨语言调用场景中使用`ESObject`标注类型，会引入不必要的跨语言调用，导致额外的性能开销。

**【反例】**

```
// lib.ets
export interface I {
  sum: number
}

export function getObject(value: number): I {
  let obj: I = { sum: value };
  return obj
}

// app.ets
import { getObject } from 'lib'
let obj: ESObject = getObject(123);
```

**【正例】**

```
// lib.ets
export interface I {
  sum: number
}

export function getObject(value: number): I {
  let obj: I = { sum: value };
  return obj
}

// app.ets
import { getObject, I } from 'lib'
let obj: I = getObject(123);
```

### 使用`T[]`表示数组类型

**【级别】建议**

**【描述】**

ArkTS提供了两种数组类型的表示方式：`T[]`和`Array<T>`。建议所有数组类型均使用`T[]`表示，以提高代码可读性。

**【反例】**

```
let x: Array<number> = [1, 2, 3];
let y: Array<string> = ['a', 'b', 'c'];
```

**【正例】**

```
// 统一使用T[]语法
let x: number[] = [1, 2, 3];
let y: string[] = ['a', 'b', 'c'];
```
