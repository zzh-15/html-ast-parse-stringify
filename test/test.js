const { parse, stringify } = require('../index')

test('parse', () => {
  let html = '<div><p>Hello, World</p></div>'
  let ast = parse(html)
  expect(ast).toEqual({
    type: 'root',
    childrens: [{
      type: 'tag',
      name: 'div',
      attrs: [],
      childrens: [{
        type: 'tag',
        name: 'p',
        attrs: [],
        childrens: [{
          type: 'text',
          value: 'Hello, World'
        }]
      }]
    }]
  })
  expect(stringify(ast)).toBe(html)

  html = '<div class="red green"><p>Hello, World</p></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
      type: 'tag',
      name: 'div',
      attrs: [{
        name: 'class',
        value: 'red green'
      }],
      childrens: [{
        type: 'tag',
        name: 'p',
        attrs: [],
        childrens: [{
          type: 'text',
          value: 'Hello, World'
        }]
      }]
    }]
  })
  expect(stringify(ast)).toBe(html)

  html = '<div class="red green" checked><p>Hello, World</p></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
      type: 'tag',
      name: 'div',
      attrs: [{
          name: 'class',
          value: 'red green'
        },
        {
          name: 'checked',
          value: true
        }
      ],
      childrens: [{
        type: 'tag',
        name: 'p',
        attrs: [],
        childrens: [{
          type: 'text',
          value: 'Hello, World'
        }]
      }]
    }]
  })
  expect(stringify(ast)).toBe(html)


  html = '<div class="red green" checked><br><p>Hello, World</p><img src="./img.jpg" /></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
      type: 'tag',
      name: 'div',
      attrs: [{
          name: 'class',
          value: 'red green'
        },
        {
          name: 'checked',
          value: true
        }
      ],
      childrens: [{
          type: 'tag',
          name: 'br',
          attrs: [],
          childrens: []
        }, {
          type: 'tag',
          name: 'p',
          attrs: [],
          childrens: [{
            type: 'text',
            value: 'Hello, World'
          }]
        }, {
          type: 'tag',
          name: 'img',
          attrs: [{
            name: 'src',
            value: './img.jpg'
          }],
          childrens: []
        }

      ]
    }]
  })
  expect(stringify(ast)).toBe('<div class="red green" checked><br><p>Hello, World</p><img src="./img.jpg"></div>')

  html = '<div class="red green"><!-- commtent test --><p>Hello, World</p></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
      type: 'tag',
      name: 'div',
      attrs: [{
        name: 'class',
        value: 'red green'
      }],
      childrens: [{
        type: 'tag',
        name: 'p',
        attrs: [],
        childrens: [{
          type: 'text',
          value: 'Hello, World'
        }]
      }]
    }]
  })
  expect(stringify(ast)).toBe('<div class="red green"><p>Hello, World</p></div>')

  html = '<!DOCTYPE html><div class="red green"><!-- commtent test --><p>Hello, World</p></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
        type: 'doctype',
        value: '<!DOCTYPE html>'
      },
      {
        type: 'tag',
        name: 'div',
        attrs: [{
          name: 'class',
          value: 'red green'
        }],
        childrens: [{
          type: 'tag',
          name: 'p',
          attrs: [],
          childrens: [{
            type: 'text',
            value: 'Hello, World'
          }]
        }]
      }
    ]
  })
  expect(stringify(ast)).toBe('<!DOCTYPE html><div class="red green"><p>Hello, World</p></div>')

  html = '<!DOCTYPE html><div class="red green" data-a7vg5h5d="ggg" data-fb5d2g5><p>Hello, World</p></div>'
  ast = parse(html)

  expect(ast).toEqual({
    type: 'root',
    childrens: [{
        type: 'doctype',
        value: '<!DOCTYPE html>'
      },
      {
        type: 'tag',
        name: 'div',
        attrs: [{
            name: 'class',
            value: 'red green'
          },
          {
            name: 'data-a7vg5h5d',
            value: 'ggg'
          },
          {
            name: 'data-fb5d2g5',
            value: true
          }],
        childrens: [{
          type: 'tag',
          name: 'p',
          attrs: [],
          childrens: [{
            type: 'text',
            value: 'Hello, World'
          }]
        }]
      }
    ]
  })
  expect(stringify(ast)).toBe(html)


  html = `<div class="red green" data-a7vg5h5d="ggg" data-fb5d2g5>
<p>Hello, World</p>
</div>`
  ast = parse(html)
  expect(ast).toEqual({
    type: 'root',
    childrens: [
      {
        type: 'tag',
        name: 'div',
        attrs: [{
            name: 'class',
            value: 'red green'
          },
          {
            name: 'data-a7vg5h5d',
            value: 'ggg'
          },
          {
            name: 'data-fb5d2g5',
            value: true
          }],
        childrens: [{
          type: 'tag',
          name: 'p',
          attrs: [],
          childrens: [{
            type: 'text',
            value: 'Hello, World'
          }]
        }]
      }
    ]
  })
  expect(stringify(ast)).toBe('<div class="red green" data-a7vg5h5d="ggg" data-fb5d2g5><p>Hello, World</p></div>')
})