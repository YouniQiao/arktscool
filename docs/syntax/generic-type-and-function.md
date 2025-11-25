---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 泛型类型和函数

泛型类型和函数使代码能够以类型安全的方式操作多种数据类型，而无需为每种类型编写重复的逻辑。

## 泛型类和接口

类和接口可以定义为泛型，将参数添加到类型定义中。如以下示例中的类型参数`Element`：

```typescript
class CustomStack<Element> {
  public push(e: Element):void {
    // ...
  }
}
```

要使用类型CustomStack，必须为每个类型参数指定类型实参：

```typescript
let s = new CustomStack<string>();
s.push('hello');
```

编译器在使用泛型类型和函数时会确保类型安全。参见以下示例：

```typescript
let s = new CustomStack<string>();
s.push(55); // 将会产生编译时错误
```

## 泛型约束

泛型类型的类型参数可以被限制只能取某些特定的值。例如，`MyHashMap<Key, Value>`这个类中的`Key`类型参数必须具有`hash`方法。

```typescript
interface Hashable {
  hash(): number;
}
class MyHashMap<Key extends Hashable, Value> {
  public set(k: Key, v: Value) {
    let h = k.hash();
    // ...其他代码...
  }
}
```

在上面的例子中，`Key`类型扩展了`Hashable`，`Hashable`接口的所有方法都可以为key调用。

## 泛型函数

使用泛型函数可编写更通用的代码。比如返回数组最后一个元素的函数：

```typescript
function last(x: number[]): number {
  return x[x.length - 1];
}
last([1, 2, 3]); // 3
```

如果需要为任何数组定义相同的函数，使用类型参数将该函数定义为泛型：

```typescript
function last<T>(x: T[]): T {
  return x[x.length - 1];
}
```

现在，该函数可以与任何数组一起使用。

在函数调用中，类型实参可以显式或隐式设置：

```typescript
// 显式设置的类型实参
let res: string = last<string>(['aa', 'bb']);
let res: number = last<number>([1, 2, 3]);

// 隐式设置的类型实参
// 编译器根据调用参数的类型来确定类型实参
let res: number = last([1, 2, 3]);
```

## 泛型默认值

泛型类型的类型参数可以设置默认值，这样无需指定实际类型实参，直接使用泛型类型名称即可。以下示例展示了类和函数的这一特性。

```typescript
class SomeType {}
interface Interface <T1 = SomeType> { }
class Base <T2 = SomeType> { }
class Derived1 extends Base implements Interface { }
// Derived1在语义上等价于Derived2
class Derived2 extends Base<SomeType> implements Interface<SomeType> { }

function foo<T = number>(): void {
  // ...
}
foo();
// 此函数在语义上等价于下面的调用
foo<number>();
```
