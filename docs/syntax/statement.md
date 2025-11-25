---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 语句

## If语句

`if`语句用于需要根据逻辑条件执行不同语句的场景。当逻辑条件为真时，执行对应的一组语句，否则执行另一组语句（如果有的话）。
`else`部分也可以包含`if`语句。

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

条件表达式可以是任何类型，非`boolean`类型会进行隐式类型转换：

```typescript
let s1 = 'Hello';
if (s1) {
  console.info(s1); // 打印“Hello”
}

let s2 = 'World';
if (s2.length != 0) {
  console.info(s2); // 打印“World”
}
```

## Switch语句

使用`switch`语句执行与`switch`表达式值匹配的代码块。

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

## 条件表达式

条件表达式根据第一个表达式的布尔值来返回其他两个表达式之一的结果。

示例如下：

```typescript
condition ? expression1 : expression2
```

如果`condition`的值为真值（转换后为`true`的值），则使用`expression1`作为该表达式的结果；否则，使用`expression2`作为该表达式的结果。

示例：

```typescript
let message = Math.random() > 0.5 ? 'Valid' : 'Failed';
```

`condition`如果是非bool值则会进行隐式转换。

示例：

```typescript
    console.info('a' ? 'true' : 'false'); // true
    console.info('' ? 'true' : 'false'); // false
    console.info(1 ? 'true' : 'false'); // true
    console.info(0 ? 'true' : 'false'); // false
    console.info(null ? 'true' : 'false'); // false
    console.info(undefined ? 'true' : 'false'); // false
```

## For语句

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
5、 返回步骤2。

示例：

```typescript
let sum = 0;
for (let i = 0; i < 10; i += 2) {
  sum += i;
}
```

## For-of语句

使用`for-of`语句可遍历数组、Set、Map、字符串等可迭代的类型。示例如下：

```typescript
for (forVar of IterableExpression) {
  // process forVar
}
```

示例：

```typescript
for (let ch of 'a string object') {
  console.info(ch);
}
```

## While语句

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

## Do-while语句

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

## Break语句

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

## Continue语句

`continue`语句会停止当前循环迭代的执行，并将控制传递给下一次迭代。

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

## Throw和Try语句

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
    console.info('result: ' + res);
  } catch (x) {
    console.error('some error');
  }
}
```

支持`finally`语句：

```typescript
function processData(s: string) {
  let error: Error | null = null;

  try {
    console.info('Data processed: ' + s);
    // ...
    // 可能发生异常的语句
    // ...
  } catch (e) {
    error = e as Error;
    // ...
    // 异常处理
    // ...
  } finally {
    // 无论是否发生异常都会执行的代码
    if (error != null) {
      console.error(`Error caught: input='${s}', message='${error.message}'`);
    }
  }
}
```
