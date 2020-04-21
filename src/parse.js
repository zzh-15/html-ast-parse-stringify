const ncname = `([a-zA-Z0-9\\-])+`
const attribute = `^\\s+(?<name>([a-zA-Z0-9\\-]+))(=(?<value>((("[\\s\\S]*?")|('[\\s\\S]*?')))))?`
const startTagOpen = new RegExp(`^<(?<tag>${ncname})`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/(?<name>${ncname})[^>]*>`)
const doctypeTag = /^<!DOCTYPE [^>]+>/i
const textNode = /^(?<value>([^<]*))/
const commentTag = /^<!--[\s\S]*-->/

let selfClosing = /^(br|hr|img|link|base|area|input|source)$/

module.exports = function parse(html) {
  let current = 0
  const stack = []
  const length = html.length
  const ast = {
    type: 'root',
    childrens: []
  }
  while (current < length) {

    if (html.match(doctypeTag)) {
      parseDoctype()
      continue
    }

    if (html.match(endTag)) {
      parseEndTag()
      continue
    }

    if (html.match(startTagOpen)) {
      parseStartTagOpen()
      continue
    }

    if (html.match(commentTag)) {
      parseComment()
      continue
    }

    if (html.match(textNode)) {
      parseText()
      continue
    }
    throw new TypeError(`I dont know what this character : ${current}:${html[current]} `)
  }

  if (stack.length > 0) {
    throw new TypeError('The label is not closed correctly')
  }

  function advance(n) {
    current += n
    html = html.substring(n)
  }

  function nodeInsert(node) {
    if (stack.length === 0) {
      ast.childrens.push(node)
    } else {
      stack[stack.length - 1].childrens.push(node)
    }
  }

  function parseStartTagOpen() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        type: 'tag',
        name: start.groups.tag,
        attrs: [],
        childrens: []
      }
      advance(start[0].length)
      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        if (attr.groups.value) {
          let value = attr.groups.value
          value = value.substr(0, value.length - 1)
          value = value.substr(1, value.length - 1)
          match.attrs.push({
            name: attr.groups.name,
            value: value
          })
        } else {
          match.attrs.push({
            name: attr.groups.name,
            value: true
          })
        }
        advance(attr[0].length)
      }

      if (end) {
        if (!(selfClosing.test(match.name))) {
          stack.push(match)
        } else {
          nodeInsert(match)
        }
        advance(end[0].length)
      }
    }
  }

  function parseEndTag() {
    let end = html.match(endTag)
    if (end) {
      advance(end[0].length)
      if (stack[stack.length - 1].name === end.groups.name) {
        const node = stack.pop()
        nodeInsert(node)
      } else {
        throw new TypeError('The label is not closed correctly')
      }
    }
  }

  function parseText() {
    let text = html.match(textNode)
    if (text) {
      const node = {
        type: 'text',
        value: text.groups.value
      }
      node.value = node.value.replace(/[\r\n]+/, '')
      if (!!node.value) {
        nodeInsert(node)
      }
      advance(text[0].length)
    }
  }

  function parseComment() {
    let comment = html.match(commentTag)
    if (comment) {
      advance(comment[0].length)
    }
  }

  function parseDoctype() {
    let doctype = html.match(doctypeTag)
    if (doctype) {
      advance(doctype[0].length)
      ast.childrens.push({
        type: 'doctype',
        value: doctype[0]
      })
    }
  }
  return ast
}