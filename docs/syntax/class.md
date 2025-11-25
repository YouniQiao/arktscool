---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 类

类声明引入一个新类型，并定义其字段、方法和构造函数。

在以下示例中，定义了`Person`类，该类具有字段`name`和`surname`、构造函数和方法`fullName`：

```typescript
class Person {
  name: string = '';
  surname: string = '';
  constructor (n: string, sn: string) {
    this.name = n;
    this.surname = sn;
  }
  fullName(): string {
    return this.name + ' ' + this.surname;
  }
}
```

定义类后，可以使用关键字`new`创建实例：

```typescript
let p = new Person('John', 'Smith');
console.info(p.fullName());
```

或者，可以使用对象字面量创建实例：

```typescript
class Point {
  x: number = 0;
  y: number = 0;
}
let p: Point = {x: 42, y: 42};
```

## 字段

字段是直接在类中声明的某种类型的变量。

类可以具有实例字段或者静态字段。

### 实例字段

实例字段存在于类的每个实例上。每个实例都有自己的实例字段集合。

要访问实例字段，需要使用类的实例。

```typescript
class Person {
  name: string = '';
  age: number = 0;
  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  getName(): string {
    return this.name;
  }
}

let p1 = new Person('Alice', 25);
p1.name; // Alice
let p2 = new Person('Bob', 28);
p2.getName(); // Bob
```

### 静态字段

使用关键字`static`将字段声明为静态。静态字段属于类本身，类的所有实例共享一个静态字段。

要访问静态字段，需要使用类名：

```typescript
class Person {
  static numberOfPersons = 0;
  constructor() {
     // ...
     Person.numberOfPersons++;
     // ...
  }
}

Person.numberOfPersons;
```

### 字段初始化

为了减少运行时错误并提升执行性能，
ArkTS要求所有字段在声明时或构造函数中显式初始化，与标准TS的`strictPropertyInitialization`模式相同。

以下代码在ArkTS中不合法。

```typescript
class Person {
  name: string; // undefined

  setName(n: string): void {
    this.name = n;
  }

  getName(): string {
    // 开发者使用"string"作为返回类型，这隐藏了name可能为"undefined"的事实。
    // 更合适的做法是将返回类型标注为"string | undefined"，以告诉开发者这个API所有可能的返回值。
    return this.name;
  }
}

let jack = new Person();
// 假设代码中没有对name赋值，即没有调用"jack.setName('Jack')"
jack.getName().length; // 运行时异常：name is undefined
```

在ArkTS中，开发者应该这样写代码。

```typescript
class Person {
  name: string = '';

  setName(n: string): void {
    this.name = n;
  }

  // 类型为'string'，不可能为"null"或者"undefined"
  getName(): string {
    return this.name;
  }
}


let jack = new Person();
// 假设代码中没有对name赋值，即没有调用"jack.setName('Jack')"
jack.getName().length; // 0, 没有运行时异常
```

接下来的代码示例展示了当`name`的值可能为`undefined`时，如何正确编写代码。

```typescript
class Person {
  name?: string; // 可能为`undefined`

  setName(n: string): void {
    this.name = n;
  }

  // 编译时错误：name可以是"undefined"，所以这个API的返回值类型不能仅定义为string类型
  getNameWrong(): string {
    return this.name;
  }

  getName(): string | undefined { // 返回类型匹配name的类型
    return this.name;
  }
}

let jack = new Person();
// 假设代码中没有对name赋值，即没有调用"jack.setName('Jack')"

// 编译时错误：编译器认为下一行代码有可能会访问undefined的属性，报错
jack.getName().length;  // 编译失败

jack.getName()?.length; // 编译成功，没有运行时错误
```

### getter和setter

setter和getter可用于提供对类属性的受控访问。

在以下示例中，setter用于禁止将`_age`属性设置为无效值：

```typescript
class Person {
  name: string = '';
  private _age: number = 0;
  get age(): number { return this._age; }
  set age(x: number) {
    if (x < 0) {
      throw Error('Invalid age argument');
    }
    this._age = x;
  }
}

let p = new Person();
p.age; // 输出0
p.age = -42; // 设置无效age值会抛出错误
```

在类中可以定义getter或者setter。

## 方法

方法属于类。类可以定义实例方法或者静态方法。静态方法属于类本身，只能访问静态字段。而实例方法既可以访问静态字段，也可以访问实例字段，包括类的私有字段。

### 实例方法

以下示例说明了实例方法的工作原理。

`calculateArea`方法计算矩形面积：

```typescript
class RectangleSize {
  private height: number = 0;
  private width: number = 0;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
  calculateArea(): number {
    return this.height * this.width;
  }
}
```

必须通过类的实例调用实例方法：

```typescript
let square = new RectangleSize(10, 10);
square.calculateArea(); // 输出：100
```

### 静态方法

使用关键字 `static` 声明静态方法。静态方法属于类，只能访问静态字段。

静态方法定义了类作为一个整体的公共行为。

必须通过类名调用静态方法：

```typescript
class Cl {
  static staticMethod(): string {
    return 'this is a static method.';
  }
}
console.info(Cl.staticMethod());
```

### 继承

一个类可以继承另一个类（称为基类），并使用以下语法实现多个接口：

```typescript
class [extends BaseClassName] [implements listOfInterfaces] {
  // ...
}
```

继承类继承基类的字段和方法，但不继承构造函数。继承类可以新增定义字段和方法，也可以覆盖其基类定义的方法。

基类也称为“父类”或“超类”。继承类也称为“派生类”或“子类”。

示例：

```typescript
class Person {
  name: string = '';
  private _age = 0;
  get age(): number {
    return this._age;
  }
}
class Employee extends Person {
  salary: number = 0;
  calculateTaxes(): number {
    return this.salary * 0.42;
  }
}
```

包含`implements`子句的类必须实现列出的接口中定义的所有方法，但使用默认实现定义的方法除外。

```typescript
interface DateInterface {
  now(): string;
}
class MyDate implements DateInterface {
  now(): string {
    // 在此实现
    return 'now';
  }
}
```

### 父类访问

关键字`super`可用于访问父类的实例字段、实例方法和构造函数。在实现子类功能时，可以通过该关键字从父类中获取所需接口：

```typescript
class RectangleSize {
  protected height: number = 0;
  protected width: number = 0;

  constructor (h: number, w: number) {
    this.height = h;
    this.width = w;
  }

  draw() {
    /* 绘制边界 */
  }
}
class FilledRectangle extends RectangleSize {
  color = ''
  constructor (h: number, w: number, c: string) {
    super(h, w); // 父类构造函数的调用
    this.color = c;
  }

  draw() {
    super.draw(); // 父类方法的调用
    // super.height -可在此处使用
    /* 填充矩形 */
  }
}
```

### 方法重写

子类可以重写其父类中定义的方法的实现。重写的方法必须具有与原始方法相同的参数类型和相同或派生的返回类型。

```typescript
class RectangleSize {
  // ...
  area(): number {
    // 实现
    return 0;
  }
}
class Square extends RectangleSize {
  private side: number = 0;
  area(): number {
    return this.side * this.side;
  }
}
```

### 方法重载签名

通过重载签名，指定方法的不同调用。具体方法为，为同一个方法写入多个同名但签名不同的方法头，方法实现紧随其后。

```typescript
class C {
  foo(x: number): void;            /* 第一个签名 */
  foo(x: string): void;            /* 第二个签名 */
  foo(x: number | string): void {  /* 实现签名 */
  }
}
let c = new C();
c.foo(123);     // OK，使用第一个签名
c.foo('aa'); // OK，使用第二个签名
```

如果两个重载签名的名称和参数列表均相同，则为错误。

## 构造函数

类声明可以包含用于初始化对象状态的构造函数。

构造函数定义如下：

```typescript
constructor ([parameters]) {
  // ...
}
```

如果未定义构造函数，则会自动创建具有空参数列表的默认构造函数，例如：

```typescript
class Point {
  x: number = 0;
  y: number = 0;
}
let p = new Point();
```

在这种情况下，默认构造函数使用字段类型的默认值初始化实例中的字段。

### 派生类的构造函数

构造函数函数体的第一条语句可以使用关键字`super`来显式调用直接父类的构造函数。

```typescript
class RectangleSize {
  constructor(width: number, height: number) {
    // ...
  }
}
class Square extends RectangleSize {
  constructor(side: number) {
    super(side, side);
  }
}
```

### 构造函数重载签名

可以通过编写重载签名，指定构造函数的不同调用方式。具体方法是，为同一个构造函数写入多个同名但签名不同的构造函数头，构造函数实现紧随其后。

```typescript
class C {
  constructor(x: number)             /* 第一个签名 */
  constructor(x: string)             /* 第二个签名 */
  constructor(x: number | string) {  /* 实现签名 */
  }
}
let c1 = new C(123);      // OK，使用第一个签名
let c2 = new C('abc');    // OK，使用第二个签名
```

如果两个重载签名的名称和参数列表均相同，则为错误。

## 可见性修饰符

类的方法和属性都可以使用可见性修饰符。

可见性修饰符包括：`private`、`protected`和`public`。默认可见性为`public`。

### Public（公有）

`public`修饰的类成员（字段、方法、构造函数）在程序的任何可访问该类的地方都是可见的。

### Private（私有）

`private`修饰的成员不能在声明该成员的类之外访问，例如：

```typescript
class C {
  public x: string = '';
  private y: string = '';
  set_y (new_y: string) {
    this.y = new_y; // OK，因为y在类本身中可以访问
  }
}
let c = new C();
c.x = 'a'; // OK，该字段是公有的
c.y = 'b'; // 编译时错误：'y'不可见
```

### Protected（受保护）

`protected`修饰符的作用与`private`修饰符非常相似，不同点是`protected`修饰的成员允许在派生类中访问，例如：

```typescript
class Base {
  protected x: string = '';
  private y: string = '';
}
class Derived extends Base {
  foo() {
    this.x = 'a'; // OK，访问受保护成员
    this.y = 'b'; // 编译时错误，'y'不可见，因为它是私有的
  }
}
```

## 对象字面量

对象字面量是一个表达式，可用于创建类实例并提供一些初始值。它在某些情况下更方便，可以用来代替`new`表达式。

对象字面量的表示方式是：封闭在花括号对({})中的'属性名：值'的列表。

```typescript
class C {
  n: number = 0;
  s: string = '';
}

let c: C = {n: 42, s: 'foo'};
```

ArkTS是静态类型语言，如上述示例所示，对象字面量只能在可以推导出该字面量类型的上下文中使用。其他正确的例子如下所示：

```typescript
class C {
  n: number = 0;
  s: string = '';
}

function foo(c: C) {}

let c: C

c = {n: 42, s: 'foo'};  // 使用变量的类型
foo({n: 42, s: 'foo'}); // 使用参数的类型

function bar(): C {
  return {n: 42, s: 'foo'}; // 使用返回类型
}
```

也可以在数组元素类型或类字段类型中使用：

```typescript
class C {
  n: number = 0;
  s: string = '';
}
let cc: C[] = [{n: 1, s: 'a'}, {n: 2, s: 'b'}];
```

### Record类型的对象字面量

泛型`Record<K, V>`用于将类型（键类型）的属性映射到另一个类型（值类型）。常用对象字面量来初始化该类型的值：

```typescript
let map: Record<string, number> = {
  'John': 25,
  'Mary': 21,
}

map['John']; // 25
```

类型`K`可以是字符串类型或数值类型(不包括BigInt)，而`V`可以是任何类型。

```typescript
interface PersonInfo {
  age: number;
  salary: number;
}
let map: Record<string, PersonInfo> = {
  'John': { age: 25, salary: 10},
  'Mary': { age: 21, salary: 20}
}
```

## 抽象类

带有`abstract`修饰符的类称为抽象类。抽象类可用于表示一组更具体的概念所共有的概念。

尝试创建抽象类的实例会导致编译错误：

```typescript
abstract class X {
  field: number;
  constructor(p: number) {
    this.field = p; 
  }
}

let x = new X(666)  //编译时错误：不能创建抽象类的具体实例
```

抽象类的子类可以是抽象类也可以是非抽象类。抽象父类的非抽象子类可以实例化。因此，执行抽象类的构造函数和该类非静态字段的字段初始化器：

```typescript
abstract class Base {
  field: number;
  constructor(p: number) { 
    this.field = p; 
  }
}

class Derived extends Base {
  constructor(p: number) {
    super(p); 
  }
}

let x = new Derived(666);
```

### 抽象方法

带有`abstract`修饰符的方法称为抽象方法，抽象方法可以被声明但不能被实现。

只有抽象类内才能有抽象方法，如果非抽象类具有抽象方法，则会发生编译时错误：

```typescript
class Y {
  abstract method(p: string)  //编译时错误：抽象方法只能在抽象类内。
}
```
