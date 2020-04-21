# html-ast-parse-stringify
将html解析并转化为ast

## 安装
---
```
npm install html-ast-parse-stringify --save
```

## 使用
---
```javascript
const { parse, stringify } = require('html-ast-parse-stringify')

let html = '<div class="red"><p>Hello, World</p></div>'

let ast = parse(html)

console.log(ast)

/*
{
	"type": "root",
	"childrens": [{
		"type": "tag",
		"name": "div",
		"attrs": [{
			"name": "class",
			"value": "red"
		}],
		"childrens": [{
			"type": "tag",
			"name": "p",
			"attrs": [],
			"childrens": [{
				"type": "text",
				"value": "Hello, World"
			}]
		}]
	}]
}
*/

console.log(stringify(ast))
// <div class="red"><p>Hello, World</p></div>
```
## AST节点类型
---

### 标签
* `type`: 节点类型(tag)
* `name`: 标签名
* `attrs`: 属性数组
* `childrens`: 子节点数组

### 文本
* `type`: 节点类型(text)
* `value`: 文本值

### DOCTYPE

* `type`: 节点类型(doctype)
* `value`: 类型声明内容

## 注意事项
1. 除 `<br>`、`<hr>`、`<img>`、`<link>`、`<base>`、`<area>`、`<input>`、`<source>`等标签外，所有的标签必须严格闭合。
2. 无法解析`<script>`

## license
MIT