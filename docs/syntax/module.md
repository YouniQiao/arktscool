---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 模块

程序可划分为多组编译单元或模块。

每个模块都有其自己的作用域，即在模块中创建的任何声明（变量、函数、类等）在该模块之外都不可见，除非它们被显式导出。

与此相对，必须首先将另一个模块导出的变量、函数、类、接口等导入到当前模块中。

## 导出

可以使用关键字`export`导出顶层的声明。

未导出的声明名称被视为私有名称，只能在声明该名称的模块中使用。

```typescript
export class Point {
  x: number = 0;
  y: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
export let Origin = new Point(0, 0);
export function Distance(p1: Point, p2: Point): number {
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}
```

导出默认导出的对象

```typescript
class Demo{
  constructor(){
  }
}
export default new Demo();
```

## 导入

### 静态导入

导入声明用于导入从其他模块导出的实体，并在当前模块中提供其绑定。导入声明由两部分组成：

* 导入路径，用于指定导入的模块；
* 导入绑定，用于定义导入的模块中的可用实体集和使用形式（限定或不限定使用）。

导入绑定可以有几种形式。

假设模块的路径为“./utils”，并且导出了实体“X”和“Y”。

导入绑定`* as A`表示绑定名称“A”，通过`A.name`可访问从导入路径指定的模块导出的所有实体：

```typescript
import * as Utils from './utils';
Utils.X // 表示来自Utils的X
Utils.Y // 表示来自Utils的Y
```

导入绑定`{ ident1, ..., identN }`表示将导出的实体与指定名称绑定，该名称可以用作简单名称：

```typescript
import { X, Y } from './utils';
X // 表示来自utils的X
Y // 表示来自utils的Y
```

如果标识符列表定义了`ident as alias`，则实体`ident`将绑定在名称`alias`下：

```typescript
import { X as Z, Y } from './utils';
Z // 表示来自Utils的X
Y // 表示来自Utils的Y
X // 编译时错误：'X'不可见
```

### 动态导入


在应用开发的有些场景中，如果希望根据条件导入模块或者按需导入模块，可以使用动态导入代替静态导入。
import()语法被称为动态导入（dynamic import），是一种类似函数的表达式，用于动态导入模块。调用这种方式，会返回一个promise。
如下例所示，import(modulePath)可以加载模块并返回一个promise，该promise resolve为一个包含其所有导出的模块对象。该表达式可以在代码中的任意位置调用。

```typescript
// Calc.ts
export function add(a:number, b:number):number {
  let c = a + b;
  console.info('Dynamic import, %d + %d = %d', a, b, c);
  return c;
}

// Index.ts
import("./Calc").then((obj: ESObject) => {
  console.info(obj.add(3, 5));  
}).catch((err: Error) => {
  console.error("Module dynamic import error: ", err);
});
```

如果在异步函数中，可以使用let module = await import(modulePath)。

```typescript
// say.ts
export function hi() {
  console.info('Hello');
}
export function bye() {
  console.info('Bye');
}
```

那么，可以像下面这样进行动态导入：

```typescript
async function test() {
  let ns = await import('./say');
  let hi = ns.hi;
  let bye = ns.bye;
  hi();
  bye();
}
```

<!--RP2--><!--RP2End-->

## 顶层语句

顶层语句是指在模块最外层编写的语句，不被任何函数、类或块级作用域包裹。这些语句包括变量声明、函数声明和表达式。
