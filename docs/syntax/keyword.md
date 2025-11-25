---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 关键字

## this

关键字`this`只能在类的实例方法中使用。

**示例**

```typescript
class A {
  count: string = 'a';
  m(i: string): void {
    this.count = i;
  }
}
```

使用限制：

* 不支持`this`类型
* 不支持在函数和类的静态方法中使用`this`

**示例**

```typescript
class A {
  n: number = 0;
  f1(arg1: this) {} // 编译时错误，不支持this类型
  static f2(arg1: number) {
    this.n = arg1;  // 编译时错误，不支持在类的静态方法中使用this
  }
}

function foo(arg1: number) {
  this.n = i;       // 编译时错误，不支持在函数中使用this
}
```

关键字`this`的指向:

* 调用实例方法的对象
* 正在构造的对象
