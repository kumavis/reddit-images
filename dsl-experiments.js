const h = require('react-hyperscript')
const container = require('hyperdrive')(h)

// ==========


with(container('.app-container')){
  
  h1('hello!')
  a({ href: './123' }, 'click here')
  
  return render()
}

// ==========

const { render, h1, a } = container('.app-container')

h1('hello!')
a({ href: './123' }, [
  h('span', 'click here'),
  h('span', 'or here'),
])

return render()

// ==========

with (helpers) {
with (container('.app-container')) {

  _h1('hello!')

  if (includeLink) {
    _a({ href: './123' }, [
     span('click here'),
     span('or here'),
    ])
  )}

  return render()

}
}

// ==========

container('.app-container', function(helpers){ with(helpers) {

  h1('hello!')

  if (includeLink) {
    a({ href: './123' }, function(helpers){ with(helpers) {
      span('click here')
      span('or here')
    }})
  }

}}

// ==========

with(helpers) {
  const _ = container('.app-container')

  _(h1('hello!'))

  if (includeLink) {
    _(a({
      href: './123'
    },[
      span('click here'),
      span('or here'),
    ]))
  }

}
