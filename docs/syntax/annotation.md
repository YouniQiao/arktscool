---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 注解

注解（Annotation）是一种语言特性，它通过添加元数据来改变应用声明的语义。
注解的声明和使用如下所示：

**示例：**

```typescript
// 注解的声明：
@interface ClassAuthor {
  authorName: string
}

// 注解的使用：
@ClassAuthor({authorName: "Bob"})
class MyClass {
  // ...
}
```

- 使用@interface声明注解。
- 注解`ClassAuthor`需要将元信息添加到类声明中。
- 注解必须放置在声明之前。
- 注解可以包含上述示例中所示的参数。

对于要使用的注解，其名称必须以符号`@`（例如：@MyAnno）为前缀。符号`@`和名称之间不允许有空格和行分隔符。

```typescript
ClassAuthor({authorName: "Bob"}) // 编译错误：注解需要'@'为前缀
@ ClassAuthor({authorName: "Bob"}) // 编译错误：符号`@`和名称之间不允许有空格和行分隔符
```

如果在使用位置无法访问注解名称，则会发生编译错误。
注解声明可以导出并在其他文件中使用。

多个注解可以应用于同一个声明（注解间的先后顺序不影响使用）。

```typescript
@MyAnno()
@ClassAuthor({authorName: "John Smith"})
class MyClass {
  // ...
}
```

注解不是Typescript中的特性，只能在`.ets/.d.ets`文件中使用。

> **注意**
> 
> 应用开发中，在[release模式下构建](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-build-har#section19788284410)源码HAR，并同时开启混淆时，由于编译产物为JS文件，而在JS中没有注解的实现机制，因此会在编译过程中被移除，导致无法通过注解实现AOP插桩。
> 
> 为避免因此引起的功能异常，禁止在JS HAR(编译产物中存在JS的HAR包)中使用注解。
> 
> 如果需要在release模式并且开启混淆的情况下构建含有注解的HAR包，可以构建[字节码HAR](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-build-har#section16598338112415)。

## 用户自定义注解

**从API version 20及之后版本，支持用户自定义注解。**

**用户自定义注解的声明**

`用户自定义注解`的定义与`interface`的定义类似，其中的`interface`关键字以符号`@`为前缀。

注解字段仅限于下面列举的类型：

* number
* boolean
* string
* 枚举
* 以上类型的数组
  
  > **说明：**
  > - 如果使用其他类型用作注解字段的类型，则会发生编译错误。
  > - 注解字段类型不支持BigInt。

注解字段的默认值必须使用常量表达式来指定。

常量表达式的场景如下所示：

* 数字字面量
* 布尔字面量
* 字符串字面量
* 枚举值（需要在编译时确定值）
* 以上常量组成的数组
  
  > **说明：**
  > 
  > 如果枚举值不能在编译时确定，会编译报错。
  
  ```typescript
  // a.ts
  export enum X {
  x = foo(); // x不是编译时能确定的常量
  }
  ```
```typescript
// b.ets
import {X} from './a';

@interface Position {
  data: number = X.x; // 编译错误：注解字段的默认值必须使用常量表达式
}

```
注解必须定义在顶层作用域（top-level），否则会出现编译报错。

注解的名称不能与注解定义所在作用域内可见的其他实体名称相同，否则会出现编译报错。

注解不支持类型Typescript中的合并，否则会出现编译报错。
```typescript
namespace ns {
  @interface MataInfo { // 编译错误：注解必须定义在顶层作用域
    // ...
  }
}

@interface Position {
  // ...
}

class Position { // 编译错误：注解的名称不能与注解定义所在作用域内可见的其他实体名称相同
  // ...
}

@interface ClassAuthor {
  name: string;
}

@interface ClassAuthor { // 编译错误：注解的名称不能与注解定义所在作用域内可见的其他实体名称相同
  data: string;
}
```

注解不是类型，把注解当类型使用时会出现编译报错（例如：对注解使用类型别名）。

```typescript
@interface Position {}
type Pos = Position; // 编译错误：注解不是类型
```

注解不支持在类的getter和setter方法中添加，若添加注解会编译报错。

```typescript
@interface ClassAuthor {
  authorName: string;
}

@ClassAuthor({authorName: "John Smith"})
class MyClass {
  private _name: string = "Bob";

  @ClassAuthor({authorName: "John Smith"}) // 编译错误：注解不支持在类的getter和setter方法添加
  get name() {
    return this._name;
  }

  @ClassAuthor({authorName: "John Smith"}) // 编译错误：注解不支持在类的getter和setter方法添加
  set name(authorName: string) {
    this._name = authorName;
  }
}
```

**用户自定义注解的使用**
注解声明示例如下：

```typescript
@interface ClassPreamble {
  authorName: string;
  revision: number = 1;
}
@interface MyAnno {}
```

当前仅允许对`class declarations`和`method declarations`使用注解，对类和方法可以同时使用同一个注解。

注解用法示例如下：

```typescript
@ClassPreamble({authorName: "John", revision: 2})
class C1 {
  // ...
}

@ClassPreamble({authorName: "Bob"}) // revision的默认值为1
class C2 {
  // ...
}

@MyAnno() // 对类和方法可以同时使用同一个注解
class C3 {
  @MyAnno()
  foo() {}
  @MyAnno()
  static bar() {}
}
```

注解中的字段顺序不影响使用。

```typescript
@ClassPreamble({authorName: "John", revision: 2})
// the same as:
@ClassPreamble({revision: 2, authorName: "John"})
```

使用注解时，必须给所有没有默认值的字段赋值，否则会发生编译错误。

> **说明：**
> 
> 赋值应当与注解声明的类型一致，所赋的值与注解字段默认值的要求一样，只能使用常量表达式。

```typescript
@ClassPreamble() // 编译错误：authorName字段未定义
class C1 {
  // ...
}
```

如果注解中定义了数组类型的字段，则使用数组字面量来设置该字段的值。

```typescript
@interface ClassPreamble {
  authorName: string;
  revision: number = 1;
  reviewers: string[];
}

@ClassPreamble(
  {
    authorName: "Alice",
    reviewers: ["Bob", "Clara"]
  }
)
class C3 {
  // ...
}
```

如果不需要定义注解字段，可以省略注解名称后的括号。

```typescript
@MyAnno
class C4 {
  // ...
}
```

**导入和导出注解**
注解也可以被导入导出。针对导出，当前仅支持在定义时的导出，即`export @interface`的形式。

**示例：**

```typescript
export @interface MyAnno {}
```

针对导入，当前仅支持`import {}`和`import * as`两种方式。

**示例：**

```typescript
// a.ets
export @interface MyAnno {}
export @interface ClassAuthor {}

// b.ets
import { MyAnno } from './a';
import * as ns from './a';

@MyAnno
@ns.ClassAuthor
class C {
  // ...
}
```

- 不允许在import中对注解进行重命名。
  
  ```typescript
  import { MyAnno as Anno } from './a'; // 编译错误：不允许在import中对注解进行重命名
  ```
  
  不允许对注解使用任何其他形式的 import/export，这会导致编译报错。

- 由于注解不是类型，因此禁止使用`type`符号进行导入和导出。
  
  ```typescript
  import type { MyAnno } from './a'; // 编译错误：注解不允许使用'type'符号进行导入和导出
  ```

- 如果仅从模块导入注解，则不会触发模块的副作用。
  
  ```typescript
  // a.ets
  export @interface Anno {}
  ```

```typescript
export @interface ClassAuthor {}

console.info("hello");

// b.ets
import { Anno } from './a';
import * as ns from './a';

// 仅引用了Anno注解，不会导致a.ets的console.info执行
class X {
  // ...
}
```
**.d.ets文件中的注解**
注解可以出现在.d.ets文件中。
可以在.d.ets文件中用环境声明（ambient declaration）来声明注解。
```typescript
ambientAnnotationDeclaration:
  'declare' userDefinedAnnotationDeclaration
  ;
```

**示例：**

```typescript
// a.d.ets
export declare @interface ClassAuthor {}
```

上述声明中：

- 不会引入新的注解定义，而是提供注解的类型信息。
- 注解需定义在其他源代码文件中。
- 注解的环境声明和实现需要完全一致，包括字段的类型和默认值。
  
  ```typescript
  // a.d.ets
  export declare @interface NameAnno{name: string = ""}
  ```

```typescript
// a.ets
export @interface NameAnno{name: string = ""} // ok

```
环境声明的注解和class类似，也可以被import使用。
```typescript
// a.d.ets
export declare @interface MyAnno {}

// b.ets
import { MyAnno } from './a';

@MyAnno
class C {
  // ...
}
```

**编译器自动生成的.d.ets文件**

当编译器根据ets代码自动生成.d.ets文件时，存在以下2种情况。

1. 当注解定义被导出时，源代码中的注解定义会在.d.ets文件中保留。
   
   ```typescript
   // a.ets
   export @interface ClassAuthor {}
   
   @interface MethodAnno { // 没导出
     data: number;
   }
   
   // a.d.ets 编译器生成的声明文件
   export declare @interface ClassAuthor {}
   ```

2. 当下面所有条件成立时，源代码中实体的注解实例会在.d.ets文件中保留。

   2.1 注解的定义被导出（import的注解也算作被导出）。

   2.2 如果实体是类，则类被导出。

   2.3 如果实体是方法，则类被导出，并且方法不是私有方法。
   
   ```typescript
   // a.ets
   import { ClassAuthor } from './author';
   
   export @interface MethodAnno {
     data: number = 0;
   }
   
   @ClassAuthor
   class MyClass {
     @MethodAnno({data: 123})
     foo() {}
   
     @MethodAnno({data: 456})
     private bar() {}
   }
   
   // a.d.ets 编译器生成的声明文件
   import {ClassAuthor} from "./author";
   
   export declare @interface MethodAnno {
     data: number = 0;
   }
   
   @ClassAuthor
   export declare class MyClass {
     @MethodAnno({data: 123})
     foo(): void;
   
     bar; // 私有方法不保留注解
   }
   ```

**开发者生成的.d.ets文件**

开发者生成的.d.ets文件中的注解信息不会自动应用到实现的源代码中。

**示例：**

```typescript
// b.d.ets 开发者生成的声明文件
@interface ClassAuthor {}

@ClassAuthor // 声明文件中有注解
class C {
  // ...
}

// b.ets 开发者对声明文件实现的源代码
@interface ClassAuthor {}

// 实现文件中没有注解
class C {
  // ...
}
```

在最终编译产物中，class C没有注解。

**重复注解和继承**
同一个实体不能重复使用同一注解，否则会导致编译错误。

```typescript
@MyAnno({name: "123", value: 456})
@MyAnno({name: "321", value: 654}) // 编译错误：不允许重复注释
class C {
  // ...
}
```

子类不会继承基类的注解，也不会继承基类方法的注解。

**注解和抽象类、抽象方法**
不支持对抽象类或抽象方法使用注解，否则将导致编译错误。

```typescript
@MyAnno // 编译错误：不允许在抽象类和抽象方法上使用注解
abstract class C {
  @MyAnno
  abstract foo(): void; // 编译错误：不允许在抽象类和抽象方法上使用注解
}
```
