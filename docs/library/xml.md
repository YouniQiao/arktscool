# XML

## XML概述

XML（可扩展标记语言）是一种用于描述数据的标记语言，提供通用的数据传输和存储方式。XML不预定义标记，因此更加灵活，适用于广泛的应用领域。

XML文档由元素（element）、属性（attribute）和内容（content）组成。

- 元素指的是标记对，包含文本、属性或其他元素。

- 属性提供了有关元素的其他信息。

- 内容则是元素包含的数据或子元素。


XML使用XML Schema或DTD（文档类型定义）定义文档结构，开发人员可以利用这些机制创建自定义规则，以验证XML文档的格式是否符合预期规范。

:::tip

- XML标签必须成对出现，生成开始标签就要生成结束标签。
- XML标签对大小写敏感，开始标签与结束标签大小写要一致。

:::

XML支持命名空间、实体引用、注释和处理指令，灵活适应各种数据需求。

以下是一个简单的XML样例及对应说明，更多XML的接口和具体使用，请见[@ohos.xml](../reference/apis-arkts/js-apis-xml.md)。

```XML
<!-- 声明 -->
<?xml version="1.0" encoding="utf-8"?>
<!-- 处理指令 -->
<?xml-stylesheet type="text/css" href="style.css"?>
<!-- 元素、属性及属性值 -->
<note importance="high">
    <title>Happy</title>
    <!-- 实体引用 -->
    <todo>&amp;</todo>
    <!-- 命名空间的声明及统一资源标识符 -->
    <h:table xmlns:h="http://www.w3.org/TR/html4/">
        <h:tr>
            <h:td>Apples</h:td>
            <h:td>Bananas</h:td>
        </h:tr>
    </h:table>
</note>
```


## XML生成


XML模块提供`XmlSerializer`及`XmlDynamicSerializer`类来生成XML数据，使用`XmlSerializer`需传入固定长度的`ArrayBuffer`或`DataView`对象作为输出缓冲区，用于存储序列化后的XML数据。
`XmlDynamicSerializer`类动态扩容，程序根据实际生成的数据大小自动创建`ArrayBuffer`。

调用不同的方法写入不同的内容，如startElement(name: string)写入元素开始标记，setText(text: string)写入标签值。

使用XmlSerializer生成XML示例如下：

1. 引入模块。

   ```ts
   import { xml, util } from '@kit.ArkTS';
   ```

2. 创建缓冲区，构造XmlSerializer对象。可以基于ArrayBuffer构造XmlSerializer对象，也可以基于DataView构造XmlSerializer对象。

   方式1：基于ArrayBuffer构造XmlSerializer对象

   ```ts
   let arrayBuffer: ArrayBuffer = new ArrayBuffer(2048); // 创建一个2048字节的缓冲区
   let serializer: xml.XmlSerializer = new xml.XmlSerializer(arrayBuffer); // 基于ArrayBuffer构造XmlSerializer对象
   ```

   方式2：基于DataView构造XmlSerializer对象

   ```ts
   let arrayBuffer: ArrayBuffer = new ArrayBuffer(2048); // 创建一个2048字节的缓冲区
   let dataView: DataView = new DataView(arrayBuffer); // 创建一个DataView
   let serializer: xml.XmlSerializer = new xml.XmlSerializer(dataView); // 基于DataView构造XmlSerializer对象
   ```

3. 调用XML元素生成函数。

   ```ts
   serializer.setDeclaration(); // 写入XML的声明
   serializer.startElement('bookstore'); // 写入元素开始标记
   serializer.startElement('book'); // 嵌套元素开始标记
   serializer.setAttributes('category', 'COOKING'); // 写入属性及其属性值
   serializer.startElement('title');
   serializer.setAttributes('lang', 'en');
   serializer.setText('Everyday'); // 写入标签值
   serializer.endElement(); // 写入结束标记
   serializer.startElement('author');
   serializer.setText('Giana');
   serializer.endElement();
   serializer.startElement('year');
   serializer.setText('2005');
   serializer.endElement();
   serializer.endElement();
   serializer.endElement();
   ```

4. 使用Uint8Array操作ArrayBuffer，并调用TextDecoder对Uint8Array解码后输出。

   ```ts
   let uint8Array: Uint8Array = new Uint8Array(arrayBuffer); // 使用Uint8Array读取arrayBuffer的数据
   let textDecoder: util.TextDecoder = util.TextDecoder.create(); // 调用util模块的TextDecoder类
   let result: string = textDecoder.decodeToString(uint8Array); // 对uint8Array解码
   console.info(result);
   ```

   输出结果如下：

   ```
   <?xml version="1.0" encoding="utf-8"?><bookstore>
     <book category="COOKING">
       <title lang="en">Everyday</title>
       <author>Giana</author>
       <year>2005</year>
     </book>
   </bookstore>
   ```

使用`XmlDynamicSerializer`生成XML示例如下：

1. 引入模块。

   ```ts
   import { xml, util } from '@kit.ArkTS';
   ```

2. 调用XML元素生成函数。

   ```ts
   let DySerializer = new xml.XmlDynamicSerializer('utf-8');
   DySerializer.setDeclaration(); // 写入XML的声明
   DySerializer.startElement('bookstore'); // 写入元素开始标记
   DySerializer.startElement('book'); // 嵌套元素开始标记
   DySerializer.setAttributes('category', 'COOKING'); // 写入属性及其属性值
   DySerializer.startElement('title');
   DySerializer.setAttributes('lang', 'en');
   DySerializer.setText('Everyday'); // 写入标签值
   DySerializer.endElement(); // 写入结束标记
   DySerializer.startElement('author');
   DySerializer.setText('Giana');
   DySerializer.endElement();
   DySerializer.startElement('year');
   DySerializer.setText('2005');
   DySerializer.endElement();
   DySerializer.endElement();
   DySerializer.endElement();
   let arrayBuffer = DySerializer.getOutput();
   ```

4. 使用Uint8Array操作ArrayBuffer，并调用TextDecoder对Uint8Array解码后输出。

   ```ts
   let uint8Array: Uint8Array = new Uint8Array(arrayBuffer);
   let result: string = util.TextDecoder.create().decodeToString(uint8Array);
   console.info(result);
   ```

   输出结果如下：

   ```
   <?xml version="1.0" encoding="utf-8"?>
   <bookstore>
     <book category="COOKING">
       <title lang="en">Everyday</title>
       <author>Giana</author>
       <year>2005</year>
     </book>
   </bookstore>
   ```


## XML解析

对于以XML作为载体传递的数据，实际使用中需要对相关的元素进行解析，一般包括[解析XML标签和标签值](#解析xml标签和标签值)、[解析XML属性和属性值](#解析xml属性和属性值)、[解析XML事件类型和元素信息](#解析xml事件类型和元素信息)三类操作。如在Web服务中，XML是SOAP（Simple Object Access Protocol）协议的基础，SOAP消息通常以XML格式封装，包含请求和响应参数，通过解析这些XML消息，Web服务可以处理来自客户端的请求并生成相应的响应。


XML模块提供XmlPullParser类用于解析XML文本，输入为包含XML数据的ArrayBuffer或DataView，输出为结构化的解析结果。


  **表1** XML解析选项，其详细介绍请参见[ParseOptions](../reference/apis-arkts/js-apis-xml.md#parseoptions)。

| 名称 | 类型 | 必填 | 说明 |
| -------- | -------- | -------- | -------- |
| supportDoctype | boolean | 否 | 是否解析文档类型，false表示不解析文档类型，true表示解析文档类型，默认false。 |
| ignoreNameSpace | boolean | 否 | 是否忽略命名空间，忽略命名空间后，将不会对其进行解析。true表示忽略命名空间，false表示不忽略命名空间，默认false。|
| tagValueCallbackFunction | (name: string, value: string) =&gt; boolean | 否 | 获取tagValue回调函数，打印XML标签及标签值。默认为undefined，表示不解析XML标签和标签值。 |
| attributeValueCallbackFunction | (name: string, value: string) =&gt; boolean | 否 | 获取attributeValue回调函数，打印XML属性及属性值。默认为undefined，表示不解析XML属性和属性值。 |
| tokenValueCallbackFunction | (eventType: EventType, value: ParseInfo) =&gt; boolean | 否 | 获取tokenValue回调函数，打印XML事件类型及parseInfo对应属性。默认为undefined，表示不解析XML事件类型。 |


:::tip

- 确保传入的XML数据符合标准格式。

- 目前不支持解析指定节点的值。

:::


### 解析XML标签和标签值

1. 引入模块。

    ```ts
    import { xml, util } from '@kit.ArkTS'; // 需要使用util模块函数对文本编码
    ```

2. 对XML文本编码后调用XmlPullParser。

   可以基于ArrayBuffer创建XmlPullParser对象，也可以基于DataView创建XmlPullParser对象（两种创建方式返回结果无区别）。

    ```ts
    let strXml: string =
    '<?xml version="1.0" encoding="utf-8"?>' +
      '<note importance="high" logged="true">' +
      '<title>Play</title>' +
      '<lens>Work</lens>' +
      '</note>';
    let textEncoder: util.TextEncoder = new util.TextEncoder();
    let arrBuffer: Uint8Array = textEncoder.encodeInto(strXml); // 对数据进行编码，防止中文字符乱码
    // 方式1：基于ArrayBuffer构造XmlPullParser对象
    let xmlParser: xml.XmlPullParser = new xml.XmlPullParser(arrBuffer.buffer as object as ArrayBuffer, 'UTF-8');
   
    // 方式2：基于DataView构造XmlPullParser对象
    // let dataView: DataView = new DataView(arrBuffer.buffer as object as ArrayBuffer);
    // let xmlParser: xml.XmlPullParser = new xml.XmlPullParser(dataView, 'UTF-8');
    ```

3. 自定义回调函数，本例直接打印出标签及标签值。

    ```ts
    function func(name: string, value: string): boolean {
      if (name == 'note') {
        console.info(name);
      }
      if (value == 'Play' || value == 'Work') {
        console.info('    ' + value);
      }
      if (name == 'title' || name == 'lens') {
        console.info('  ' + name);
      }
      return true; //true:继续解析 false:停止解析
    }
    ```

4. 设置解析选项，调用parseXml函数。

    ```ts
    let options: xml.ParseOptions = {supportDoctype:true, ignoreNameSpace:true, tagValueCallbackFunction:func};
    xmlParser.parseXml(options);
    ```

    输出结果如下所示：

    ```
    note
      title
        Play
      title
      lens
        Work
      lens
    note
    ```




### 解析XML属性和属性值

1. 引入模块。

    ```ts
    import { xml, util } from '@kit.ArkTS'; // 使用util模块对文本编码
    ```

2. 对XML文本编码后调用XmlPullParser。

    ```ts
    let strXml: string =
      '<?xml version="1.0" encoding="utf-8"?>' +
        '<note importance="high" logged="true">' +
        '    <title>Play</title>' +
        '    <title>Happy</title>' +
        '    <lens>Work</lens>' +
        '</note>';
    let textEncoder: util.TextEncoder = new util.TextEncoder();
    let arrBuffer: Uint8Array = textEncoder.encodeInto(strXml); // 对数据进行编码，防止中文字符乱码
    let xmlParser: xml.XmlPullParser = new xml.XmlPullParser(arrBuffer.buffer as object as ArrayBuffer, 'UTF-8');
    ```

3. 自定义回调函数，示例直接打印出属性及属性值。

    ```ts
    let str: string = '';
    function func(name: string, value: string): boolean {
      str += name + ' ' + value + ' ';
      return true; // true:继续解析 false:停止解析
    }
    ```

4. 设置解析选项，调用parseXml函数。

    ```ts
    let options: xml.ParseOptions = {supportDoctype:true, ignoreNameSpace:true, attributeValueCallbackFunction:func};
    xmlParser.parseXml(options);
    console.info(str); // 打印所有属性及其值
    ```

   输出结果如下所示：
   ```
   importance high logged true // note节点的属性及属性值
   ```


### 解析XML事件类型和元素信息

1. 引入模块。

    ```ts
    import { xml, util } from '@kit.ArkTS'; // 使用util模块函数对文本编码
    ```

2. 对XML文本编码后调用XmlPullParser。

    ```ts
    let strXml: string =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<note importance="high" logged="true">' +
      '<title>Play</title>' +
      '</note>';
    let textEncoder: util.TextEncoder = new util.TextEncoder();
    let arrBuffer: Uint8Array = textEncoder.encodeInto(strXml); // 对数据进行编码，防止中文字符乱码
    let xmlParser: xml.XmlPullParser = new xml.XmlPullParser(arrBuffer.buffer as object as ArrayBuffer, 'UTF-8');
    ```

3. 自定义回调函数，示例直接打印元素事件类型及元素深度。

    ```ts
    let str: string = '';
    function func(name: xml.EventType, value: xml.ParseInfo): boolean {
      str = name + ' ' + value.getDepth(); // getDepth 获取元素在XML文档中的当前深度
      console.info(str);
      return true; // true:继续解析 false:停止解析
    }
    ```

4. 设置解析选项，调用parseXml函数。

     ```ts
     let options: xml.ParseOptions = {supportDoctype:true, ignoreNameSpace:true, tokenValueCallbackFunction:func};
     xmlParser.parseXml(options);
     ```

   输出结果如下所示：

    ```
     0 0 // 0：<?xml version="1.0" encoding="utf-8"?> 对应事件类型START_DOCUMENT值为0  0：起始深度为0
     2 1 // 2：<note importance="high" logged="true"> 对应事件类型START_TAG值为2  1：深度为1
     2 2 // 2：<title>对应事件类型START_TAG值为2  2：深度为2
     4 2 // 4：Play对应事件类型TEXT值为4  2：深度为2
     3 2 // 3：</title>对应事件类型END_TAG值为3  2：深度为2
     3 1 // 3：</note>对应事件类型END_TAG值为3  1：深度为1（与<note对应>）
     1 0 // 1：对应事件类型END_DOCUMENT值为1  0：深度为0
    ```




### 场景示例

此处以调用所有解析选项为例，提供解析XML标签、属性和事件类型的开发示例。


```ts
import { xml, util } from '@kit.ArkTS';

let strXml: string =
  '<?xml version="1.0" encoding="UTF-8"?>' +
    '<book category="COOKING">' +
    '<title lang="en">Everyday</title>' +
    '<author>Giana</author>' +
    '</book>';
let textEncoder: util.TextEncoder = new util.TextEncoder();
let arrBuffer: Uint8Array = textEncoder.encodeInto(strXml);
let xmlParser: xml.XmlPullParser = new xml.XmlPullParser(arrBuffer.buffer as object as ArrayBuffer, 'UTF-8');
let str: string = '';

function tagFunc(name: string, value: string): boolean {
  str = name + value;
  console.info('tag-' + str);
  return true;
}

function attFunc(name: string, value: string): boolean {
  str = name + ' ' + value;
  console.info('attri-' + str);
  return true;
}

function tokenFunc(name: xml.EventType, value: xml.ParseInfo): boolean {
  str = name + ' ' + value.getDepth();
  console.info('token-' + str);
  return true;
}

let options: xml.ParseOptions = {
  supportDoctype: true,
  ignoreNameSpace: true,
  tagValueCallbackFunction: tagFunc,
  attributeValueCallbackFunction: attFunc,
  tokenValueCallbackFunction: tokenFunc
};
xmlParser.parseXml(options);
```

输出结果如下所示：

```
tag-
token-0 0
tag-book
token-2 1
attri-category COOKING
tag-title
token-2 2
attri-lang en
tag-Everyday
token-4 2
tag-title
token-3 2
tag-author
token-2 2
tag-Giana
token-4 2
tag-author
token-3 2
tag-book
token-3 1
tag-
token-1 0
```


## XML转换

将XML文本转换为JavaScript对象，便于处理和操作数据，适用于JavaScript应用程序。

语言基础类库提供ConvertXML类，将XML文本转换为JavaScript对象，输入为待转换的XML字符串及转换选项，输出为转换后的JavaScript对象。

以XML转换为JavaScript对象为例，说明如何获取标签值。

1. 引入所需的模块。

   ```ts
   import { convertxml } from '@kit.ArkTS';
   ```

2. 输入待转换的XML，设置转换选项。

   > **说明：**
   >
   > 请确保传入的XML文本符合标准格式，若包含“&”字符，请使用实体引用“\&amp;”替换。

   ```ts
   let xml: string =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    '    <title>Happy</title>' +
    '    <todo>Work</todo>' +
    '    <todo>Play</todo>' +
    '</note>';
   let options: convertxml.ConvertOptions = {
     // trim: false 转换后是否删除文本前后的空格，否
     // declarationKey: "_declaration" 转换后文件声明使用_declaration来标识
     // instructionKey: "_instruction" 转换后指令使用_instruction标识
     // attributesKey: "_attributes" 转换后属性使用_attributes标识
     // textKey: "_text" 转换后标签值使用_text标识
     // cdataKey: "_cdata" 转换后未解析数据使用_cdata标识
     // docTypeKey: "_doctype" 转换后文档类型使用_doctype标识
     // commentKey: "_comment" 转换后注释使用_comment标识
     // parentKey: "_parent" 转换后父类使用_parent标识
     // typeKey: "_type" 转换后元素类型使用_type标识
     // nameKey: "_name" 转换后标签名称使用_name标识
     // elementsKey: "_elements" 转换后元素使用_elements标识
     trim: false,
     declarationKey: "_declaration",
     instructionKey: "_instruction",
     attributesKey: "_attributes",
     textKey: "_text",
     cdataKey: "_cdata",
     doctypeKey: "_doctype",
     commentKey: "_comment",
     parentKey: "_parent",
     typeKey: "_type",
     nameKey: "_name",
     elementsKey: "_elements"
   }
   ```

3. 调用fastConvertToJSObject函数并打印结果。

   ```ts
   let conv: convertxml.ConvertXML = new convertxml.ConvertXML();
   let result: object = conv.fastConvertToJSObject(xml, options);
   let strRes: string = JSON.stringify(result); // 将js对象转换为json字符串，用于显式输出
   console.info(strRes);
   ```

   输出结果如下所示：

   ```json
   strRes:
   {"_declaration":{"_attributes":{"version":"1.0","encoding":"utf-8"}},"_elements":[{"_type":"element","_name":"note",
    "_attributes":{"importance":"high","logged":"true"},"_elements":[{"_type":"element","_name":"title","_parent":"note",
    "_elements":[{"_type":"text","_text":"Happy"}]},{"_type":"element","_name":"todo","_parent":"note","_elements":
    [{"_type":"text","_text":"Work"}]},{"_type":"element","_name":"todo","_parent":"note","_elements":[{"_type":"text",
    "_text":"Play"}]}]}]}
   ```
