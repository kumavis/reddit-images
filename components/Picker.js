import h from 'react-hyperscript'
import React, { Component, PropTypes } from 'react'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props
    const selectOptions = options.map(option => h('option', { value: option, key: option }, option))
    return h('span', [
      h('h1', value),
      // h('select', {
      //   onChange: e => onChange(e.target.value),
      //   value: value,
      // }, selectOptions),
      h('input', {
        onChange: e => onChange(e.target.value),
        value: value,
      }),
    ])
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}