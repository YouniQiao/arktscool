---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 接口

接口声明引入新类型。接口是定义代码协定的常见方式。

任何类的实例，只要实现了特定接口，即可通过该接口实现多态。

接口通常包含属性和方法的声明。

示例：

```typescript
interface Style {
  color: string; // 属性
}
interface AreaSize {
  calculateAreaSize(): number; // 方法的声明
  someMethod(): void;     // 方法的声明
}
```

实现接口的类示例：

```typescript
// 接口：
interface AreaSize {
  calculateAreaSize(): number; // 方法的声明
  someMethod(): void;     // 方法的声明
}

// 实现：
class RectangleSize implements AreaSize {
  private width: number = 0;
  private height: number = 0;
  someMethod(): void {
    console.info('someMethod called');
  }
  calculateAreaSize(): number {
    this.someMethod(); // 调用另一个方法并返回结果
    return this.width * this.height;
  }
}
```

## 接口属性

接口属性可以是字段、getter、setter或getter和setter组合的形式。

属性字段只是getter/setter对的便捷写法。以下表达方式是等价的：

```typescript
interface Style {
  color: string;
}
```

```typescript
interface Style {
  get color(): string;
  set color(x: string);
}
```

实现接口的类也可以使用以下两种方式：

```typescript
interface Style {
  color: string;
}

class StyledRectangle implements Style {
  color: string = '';
}
```

```typescript
interface Style {
  color: string;
}

class StyledRectangle implements Style {
  private _color: string = '';
  get color(): string { return this._color; }
  set color(x: string) { this._color = x; }
}
```

## 接口继承

接口可以继承其他接口，示例如下：

```typescript
interface Style {
  color: string;
}

interface ExtendedStyle extends Style {
  width: number;
}
```

继承接口包含被继承接口的所有属性和方法，还可以添加自己的属性和方法。

## 抽象类和接口

抽象类与接口都无法实例化。抽象类是类的抽象，抽象类用来捕捉子类的通用特性，接口是行为的抽象。在ArkTS语法中抽象类与接口的区别如下：

* 一个类只能继承一个抽象类，而一个类可以实现一个或多个接口；
  
  ```typescript
  // Bird类继承Animal抽象类并实现多个接口CanFly、CanSwim
  class Bird extends Animal implements CanFly, CanSwim {
  // ...  
  }
  ```

* 接口中不能含有静态代码块以及静态方法，而抽象类可以有静态代码块和静态方法；
  
  ```typescript
  interface MyInterface {
    // 错误：接口中不能包含静态成员
    static staticMethod(): void; 
  
    // 错误：接口中不能包含静态代码块
    static { console.info("static") }; 
  } 
  ```
```typescript
abstract class MyAbstractClass {
    // 正确：抽象类可以有静态方法
    static staticMethod(): void { console.info("static");}

    // 正确：抽象类可以有静态代码块
    static { console.info("static initialization block");}

}

```
* 抽象类里面可以有方法的实现，但是接口没有方法的实现，是完全抽象的；
```typescript
abstract class MyAbstractClass {
   // 正确：抽象类里面可以有方法的实现
   func(): void { console.info("func");}
}
interface MyInterface {
   // 错误：接口没有方法的实现，是完全抽象的
   func(): void { console.info("func");}
}
```

* 抽象类可以有构造函数，而接口不能有构造函数。
  
  ```typescript
  abstract class MyAbstractClass {
  constructor(){}  // 正确：抽象类可以有构造函数
  }
  interface MyInterface {
  constructor(); // 错误：接口中不能有构造函数
  }
  ```
