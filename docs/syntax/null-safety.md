---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 空安全

默认情况下，ArkTS中的所有类型都不允许为空，这类似于TypeScript的(`strictNullChecks`)模式，但规则更严格。

在下面的示例中，所有行都会导致编译时错误：

```typescript
let x: number = null;    // 编译时错误
let y: string = null;    // 编译时错误
let z: number[] = null;  // 编译时错误
```

可以为空值的变量定义为联合类型`T | null`。

```typescript
let x: number | null = null;
x = 1;    // ok
x = null; // ok
if (x != null) { /* do something */ }
```

## 非空断言运算符

后缀运算符`!`可用于断言其操作数为非空。

当应用于可空类型的值时，编译时类型会变为非空类型。例如，类型从`T | null`变为`T`：

```typescript
class A {
  value: number = 0;
}

function foo(a: A | null) {
  a.value;   // 编译时错误：无法访问可空值的属性
  a!.value;  // 编译通过，如果运行时a的值非空，可以访问到a的属性；如果运行时a的值为空，则发生运行时异常
}
```

## 空值合并运算符

空值合并二元运算符`??`用于检查左侧表达式的求值是否等于`null`或者`undefined`。如果是，则表达式的结果为右侧表达式；否则，结果为左侧表达式。

换句话说，`a ?? b`等价于三元运算符`(a != null && a != undefined) ? a : b`。

在以下示例中，`getNick`方法返回已设置的昵称。如果未设置，则返回空字符串。

```typescript
class Person {
  // ...
  nick: string | null = null;
  getNick(): string {
    return this.nick ?? '';
  }
}
```

## 可选链

访问对象属性时，如果属性是`undefined`或`null`，可选链运算符返回`undefined`。

```typescript
class Person {
  nick: string | null = null;
  spouse?: Person

  setSpouse(spouse: Person): void {
    this.spouse = spouse;
  }

  getSpouseNick(): string | null | undefined {
    return this.spouse?.nick;
  }

  constructor(nick: string) {
    this.nick = nick;
    this.spouse = undefined;
  }
}
```

**说明**：`getSpouseNick`的返回类型必须为`string | null | undefined`，因为该方法在某些情况下会返回`null`或`undefined`。

可选链可以任意长，可以包含任意数量的`?.`运算符。

在以下示例中，如果`Person`实例的`spouse`属性不为空，并且`spouse`的`nick`属性也不为空时，输出`spouse.nick`。否则，输出`undefined`。

```typescript
class Person {
  nick: string | null = null;
  spouse?: Person;

  constructor(nick: string) {
    this.nick = nick;
    this.spouse = undefined;
  }
}

let p: Person = new Person('Alice');
p.spouse?.nick; // undefined
```
