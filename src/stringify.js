let selfClosing = /^(br|hr|img|link|base|area|input|source)$/
module.exports =  function stringify(ast) {
  let html = ''
  if (ast.type === 'root') {
    ast.childrens.map(item => {
      html += stringify(item)
    })
  } else {
    if (ast.type === 'tag') {
      html += `<${ast.name}`
      if (ast.attrs.length > 0) {
        ast.attrs.map(item => {
          html += (typeof item.value === 'boolean') ? ` ${item.name}` : ` ${item.name}="${item.value}"`
        })
      }
      html += '>'
      if (ast.childrens.length > 0) {
        ast.childrens.map(item => {
          html += stringify(item)
        })
      }
      if (!(selfClosing.test(ast.name))) {
        html += `</${ast.name}>`
      }
    } else if (ast.type === 'text') {
      html += `${ast.value}`
    } else if (ast.type === 'doctype') {
      html += `${ast.value}`
    }
  }
  return html
}
