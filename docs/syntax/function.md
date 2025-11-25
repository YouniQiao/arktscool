---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 函数

## 函数声明

函数声明引入一个函数，包含其名称、参数列表、返回类型和函数体。

以下示例是一个简单的函数和它的语法语义说明：

1.参数类型标注：x: string, y: string 显式声明参数类型为字符串类型。

2.返回值类型：: string 指定函数返回值为字符串类型。

```typescript
function add(x: string, y: string): string {
  let z: string = `${x} ${y}`;
  return z;
}
```

在函数声明中，必须为每个参数标记类型。如果参数为可选参数，那么允许在调用函数时省略该参数。函数的最后一个参数可以是rest参数。

## 可选参数

可选参数的格式可为`name?: Type`。

```typescript
function hello(name?: string) {
  if (name == undefined) {
    console.info('Hello!');
  } else {
    console.info(`Hello, ${name}!`);
  }
}
```

可选参数的另一种形式为设置的参数默认值。如果在函数调用中这个参数被省略了，则会使用此参数的默认值作为实参。

```typescript
function multiply(n: number, coeff: number = 2): number {
  return n * coeff;
}
multiply(2);  // 返回2*2
multiply(2, 3); // 返回2*3
```

## Rest参数

函数的最后一个参数可以是rest参数，格式为`...restArgs`。rest参数允许函数接收一个由剩余实参组成的数组，类型为任意指定类型，用于处理不定数量的参数输入。

```typescript
function sum(...numbers: number[]): number {
  let res = 0;
  for (let n of numbers)
    res += n;
  return res;
}

sum(); // 返回0
sum(1, 2, 3); // 返回6
```

## 返回类型

如果可以从函数体内推断出函数返回类型，则可在函数声明中省略标注返回类型。

```typescript
// 显式指定返回类型
function foo(): string { return 'foo'; }

// 推断返回类型为string
function goo() { return 'goo'; }
```

不需要返回值的函数的返回类型可以显式指定为`void`或省略标注。这类函数不需要返回语句。

以下示例中两种函数声明方式都是有效的：

```typescript
function hi1() { console.info('hi'); }
function hi2(): void { console.info('hi'); }
```

## 函数的作用域

函数中定义的变量和其他实例仅可以在函数内部访问，不能从外部访问。

如果函数中定义的变量与外部作用域中已有实例同名，则函数内的局部变量定义将覆盖外部定义。

```typescript
let outerVar = 'I am outer ';

function func() {
    let outerVar = 'I am inside';
    console.info(outerVar); // 输出: I am inside
}

func();
```

## 函数调用

调用函数以执行其函数体，实参值会赋值给函数的形参。

如果函数定义如下：

```typescript
function join(x: string, y: string): string {
  let z: string = `${x} ${y}`;
  return z;
}
```

则此函数的调用需要包含两个`string`类型的参数：

```typescript
let x = join('hello', 'world');
console.info(x); // 输出: hello world
```

## 函数类型

函数类型通常用于定义回调函数：

```typescript
type trigFunc = (x: number) => number // 这是一个函数类型

function do_action(f: trigFunc) {
  f(3.141592653589); // 调用函数
}

do_action(Math.sin); // 将函数作为参数传入
```

## 箭头函数（又名Lambda函数）

函数可以定义为箭头函数，例如：

```typescript
let sum = (x: number, y: number): number => {
  return x + y;
}
```

箭头函数的返回类型可以省略，此时返回类型从函数体推断。

表达式可以指定为箭头函数，使表达更简短，因此以下两种表达方式是等价的：

```typescript
let sum1 = (x: number, y: number) => { return x + y; }
let sum2 = (x: number, y: number) => x + y
```

## 闭包

闭包是由函数及声明该函数的环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。

在下例中，`f`函数返回了一个闭包，它捕获了`count`变量，每次调用`z`，`count`的值会被保留并递增。

```typescript
function f(): () => number {
  let count = 0;
  let g = (): number => { count++; return count; };
  return g;
}

let z = f();
z(); // 返回：1
z(); // 返回：2
```

## 函数重载

可以通过编写重载，指定函数的不同调用方式。具体方法是，为同一个函数写入多个同名但签名不同的函数头，函数实现紧随其后。

```typescript
function foo(x: number): void;            /* 第一个函数定义 */
function foo(x: string): void;            /* 第二个函数定义 */
function foo(x: number | string): void {  /* 函数实现 */
}

foo(123);     //  OK，使用第一个定义
foo('aa'); // OK，使用第二个定义
```

不允许重载函数有相同的名字和参数列表，否则将导致编译错误。
