# 代码风格

本文参考业界标准和实践，结合ArkTS语言特点，提供编码指南，以提高代码的规范性、安全性和性能。

## 规则来源

ArkTS在保持TypeScript基本语法风格的基础上，进一步强化静态检查和分析。本文部分规则筛选自《[OpenHarmony应用TS&JS编程指南](https://gitcode.com/openharmony/docs/blob/master/zh-cn/contribute/OpenHarmony-Application-Typescript-JavaScript-coding-guide.md)》，为ArkTS语言新增的语法添加了规则，旨在提高代码可读性、执行性能。


## 总体原则

规则分为两个级别：要求和建议。

**要求**：表示原则上应该遵从。本文所有内容目前均为针对ArkTS的要求。

**建议**：表示该条款属于最佳实践，可结合实际情况考虑是否纳入。

## 命名

### 为标识符取一个好名字，提高代码可读性

**【描述】**

好的标识符命名应遵循以下原则：
 - 清晰表达意图，避免使用单个字母或非标准缩写命名。
 - 使用正确的英文单词并符合英文语法，不要使用中文拼音。
 - 确保语句清晰，避免歧义。

### 类名、枚举名、命名空间名采用UpperCamelCase风格

**【级别】建议**

**【描述】**

类采用首字母大写的驼峰命名法。
类名通常是名词或名词短语，例如Person、Student、Worker。不应使用动词，也应该避免类似Data、Info这样的模糊词。

**【正例】**
```
// 类名
class User {
  username: string

  constructor(username: string) {
    this.username = username;
  }

  sayHi() {
    console.info('hi' + this.username);
  }
}

// 枚举名
enum UserType {
  TEACHER = 0,
  STUDENT = 1
};

// 命名空间
namespace Base64Utils {
  function encrypt() {
    // todo encrypt
  }

  function decrypt() {
    // todo decrypt
  }
};
```

### 变量名、方法名、参数名采用lowerCamelCase风格

**【级别】建议**

**【描述】**

函数的命名通常是动词或动词短语，采用小驼峰命名。示例如下：
1.   load + 属性名()
2.   put + 属性名()
3.   is + 布尔属性名()
4.   has + 名词/形容词()
5.   动词()
6.   动词 + 宾语()
变量名通常是名词或名词短语，采用小驼峰命名，便于理解。

**【正例】**
```
let msg = 'Hello world';

function sendMsg(msg: string) {
  // todo send message
}

let userName = 'Zhangsan';

function findUser(userName: string) {
  // todo find user by user name
}
```

### 常量名、枚举值名采用全部大写，单词间使用下划线隔开

**【级别】建议**

**【描述】**

常量命名，应该由全大写单词与下划线组成，单词间用下划线分割。常量命名要尽量表达完整的语义。

**【正例】**

```
const MAX_USER_SIZE = 10000;

enum UserType {
  TEACHER = 0,
  STUDENT = 1
};
```

### 避免使用否定的布尔变量名，布尔型的局部变量或方法需加上表达是非意义的前缀

**【级别】建议**

**【描述】**

布尔型的局部变量建议加上表达是非意义的前缀，比如is，也可以是has、can、should等。但是，当使用逻辑非运算符，并出现双重否定时，会出现理解问题，比如!isNotError，难以理解。因此，应避免定义否定的布尔变量名。

**【反例】**

```
let isNoError = true;
let isNotFound = false;

function empty() {}
function next() {}
```

**【正例】**

```
let isError = false;
let isFound = true;

function isEmpty() {}
function hasNext() {}
```

## 格式

### 使用空格缩进，禁止使用tab字符

**【级别】建议**

**【描述】**

只允许使用空格(space)进行缩进。

建议大部分场景优先使用2个空格，换行导致的缩进优先使用4个空格。
不允许插入制表符Tab。当前几乎所有的集成开发环境（IDE）和代码编辑器都支持配置将Tab键自动扩展为2个空格输入，应在代码编辑器中配置使用空格进行缩进。

**【正例】**

```
class DataSource {
  id: number = 0
  title: string = ''
  content: string = ''
}

const dataSource: DataSource[] = [
  {
    id: 1,
    title: 'Title 1',
    content: 'Content 1'
  },
  {
    id: 2,
    title: 'Title 2',
    content: 'Content 2'
  }

];

function test(dataSource: DataSource[]) {
  if (!dataSource.length) {
    return;
  }

  for (let data of dataSource) {
    if (!data || !data.id || !data.title || !data.content) {
      continue;
    }
    // some code
  }

  // some code
}
```

### 行宽不超过120个字符

**【级别】建议**

**【描述】**

代码行宽不宜过长，否则不利于阅读。

控制行宽可以间接引导程序员缩短函数和变量的命名，减少嵌套层数，精炼注释，从而提升代码可读性。
建议每行字符数不超过120个，除非需要显著增加可读性（超过120个），且不会隐藏信息。
例外：如果一行注释包含了超过120个字符的命令或URL，则可以保持一行，以方便复制、粘贴和通过grep查找；预处理的error信息在一行便于阅读和理解，即使超过120个字符。

### 条件语句和循环语句的实现建议使用大括号

**【级别】建议**

**【描述】**

在`if`、`for`、`do`、`while`等语句的执行体加大括号`{}`是一种最佳实践，因为省略大括号可能导致错误，并且降低代码的清晰度。

**【反例】**

```
let condition = true;
if (condition) 
  console.info('success');
for (let idx = 0; idx < 5; ++idx) 
  console.info('', idx);
```

**【正例】**

```
let condition = true;
if (condition) {
  console.info('success');
}
for (let idx = 0; idx < 5; ++idx) {
  console.info('', idx);
}
```

### `switch`语句的`case`和`default`需缩进一层

**【级别】建议**

**【描述】**

`switch`的`case`和`default`要缩进一层（2个空格）。开关标签之后换行的语句，需再缩进一层（2个空格）。

**【正例】**

```
switch (condition) {
  case 0: {
    doSomething();
    break;
  }
  case 1: {
    doOtherthing();
    break;
  }
  default:
    break;
}
```

### 表达式换行需保持一致性，运算符放行末

**【级别】建议**

**【描述】**

当语句过长或可读性不佳时，需要在合适的地方进行换行。
换行时将操作符放在行末，表示“未结束，后续还有”，保持与常用的格式化工具的默认配置一致。

**【正例】**

```
// 假设条件语句超出行宽
if (userCount > MAX_USER_COUNT ||
  userCount < MIN_USER_COUNT) {
  doSomething();
}
```

### 多个变量定义和赋值语句不允许写在一行

**【级别】要求**

**【描述】**

每个语句的变量声明都应只声明一个变量。
这种方式更便于添加变量声明，无需考虑将分号改为逗号，以免引入错误。此外，每个语句只声明一个变量，使用调试器逐个调试也很方便，而不是一次跳过所有变量。

**【反例】**

```
let maxCount = 10, isCompleted = false;
let pointX, pointY;
pointX = 10; pointY = 0;
```

**【正例】**

```
let maxCount = 10;
let isCompleted = false;
let pointX = 0;
let pointY = 0;
```

### 空格应该突出关键字和重要信息，避免不必要的空格

**【级别】建议**

**【描述】**

空格应该突出关键字和重要信息。总体建议如下：
1.   `if`, `for`, `while`, `switch`等关键字与左括号`(`之间加空格。
2.   在函数定义和调用时，函数名称与参数列表的左括号`(`之间不加空格。
3.   关键字`else`或`catch`与其之前的大括号`}`之间加空格。
4.   任何打开大括号(`{`)之前加空格，有两个例外：
a)   在作为函数的第一个参数或数组中的第一个元素时，对象之前不用加空格，例如：`foo({ name: 'abc' })`。
b)   在模板中，不用加空格，例如：`abc${name}`。
5.   二元操作符(`+` `-` `*` `=` `<` `>` `<=` `>=` `===` `!==` `&&` `||`)前后加空格；三元操作符(`? :`)符号两侧均加空格。
6.   数组初始化中的逗号和函数中多个参数之间的逗号后加空格。
7.   在逗号(`,`)或分号(`;`)之前不加空格。
8.   数组的中括号(`[]`)内侧不要加空格。
9.   不要出现多个连续空格。在某行中，多个空格若不是用来作缩进的，通常是个错误。

**【反例】**

```
// if 和左括号 ( 之间没有加空格
if(isJedi) {
  fight();
}

// 函数名fight和左括号 ( 之间加了空格
function fight (): void {
  console.info('Swooosh!');
}
```

**【正例】**

```
// if 和左括号之间加一个空格
if (isJedi) {
  fight();
}

// 函数名fight和左括号 ( 之间不加空格
function fight(): void {
  console.info('Swooosh!');
}
```

**【反例】**

```
if (flag) {
  // ...
}else {  // else 与其前面的大括号 } 之间没有加空格
  // ...
}
```

**【正例】**

```
if (flag) {
  // ...
} else {  // else 与其前面的大括号 } 之间增加空格
  // ...
}
```

**【正例】**

```
function foo() {  // 函数声明时，左大括号 { 之前加个空格
  // ...
}

bar('attr', {  // 左大括号前加个空格
  age: '1 year',
  sbreed: 'Bernese Mountain Dog',
});
```

**【正例】**

```
const arr = [1, 2, 3];  // 数组初始化中的逗号后面加个空格，逗号前面不加空格
myFunc(bar, foo, baz);  // 函数的多个参数之间的逗号后加个空格，逗号前面不加空格
```

### 建议字符串使用单引号

**【级别】建议**

**【描述】**

为了保持代码一致性和可读性，建议使用单引号。

**【反例】**

```
let message = "world";
console.info(message);
```

**【正例】**

```
let message = 'world';
console.info(message);
```

### 对象字面量属性超过4个，需要都换行

**【级别】建议**

**【描述】**

对象字面量的属性应保持一致的格式：要么每个属性都换行，要么所有属性都在同一行。当对象字面量的属性超过4个时，建议统一换行。

**【反例】**

```
interface I {
  name: string
  age: number
  value: number
  sum: number
  foo: boolean
  bar: boolean
}

let obj: I = { name: 'tom', age: 16, value: 1, sum: 2, foo: true, bar: false }
```

**【正例】**

```
interface I {
  name: string
  age: number
  value: number
  sum: number
  foo: boolean
  bar: boolean
}

let obj: I = {
  name: 'tom',
  age: 16,
  value: 1,
  sum: 2,
  foo: true,
  bar: false
}
```

### 把`else`/`catch`放在`if`/`try`代码块关闭括号的同一行

**【级别】建议**

**【描述】**

编写条件语句时，建议将`else`放在`if`代码块关闭括号的同一行。同样，编写异常处理语句时，建议将`catch`放在`try`代码块关闭括号的同一行。

**【反例】**

```
if (isOk) {
  doThing1();
  doThing2();
}
else {
  doThing3();
}
```

**【正例】**

```
if (isOk) {
  doThing1();
  doThing2();
} else {
  doThing3();
}
```

**【反例】**

```
try {
  doSomething();
}
catch (err) {
  // 处理错误
}
```

**【正例】**

```
try {
  doSomething();
} catch (err) {
  // 处理错误
}
```

### 大括号`{`和语句在同一行

**【级别】建议**

**【描述】**

应保持一致的大括号风格。建议将大括号置于控制语句或声明语句的同一行。

**【反例】**

```
function foo()
{
  // ...
}
```

**【正例】**

```
function foo() {
  // ...
}
```
 