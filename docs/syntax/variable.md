---
last_update:
  date: 2025-11-13
  author: 油腻樵夫
---

# 变量和常量

ArkTS通过声明引入变量、常量、类型和函数。

## 变量声明

使用关键字`let`声明的变量可以在程序执行期间具有不同的值。

```typescript
let hi: string = 'hello';
hi = 'hello, world';
```

## 常量声明

使用关键字`const`声明的常量为只读类型，只能被赋值一次。

```typescript
const hello: string = 'hello';
```

对常量重新赋值会造成编译时错误。

## 自动类型推断

如果变量或常量的声明包含初始值，开发者无需显式指定类型，因为ArkTS规范已列举了所有允许自动推断类型的场景。

以下示例中，两条声明语句都是有效的，两个变量都是`string`类型：

```typescript
let hi1: string = 'hello';
let hi2 = 'hello, world';
```