import React from 'react'

const h = React.createElement

export const Picker = ({ value, onChange }) => {
  return (
    h('span', null, [
      h('input', {
        onChange: e => onChange(e.target.value),
        value,
        style: {
          width: '100%',
          height: '40px',
          fontSize: '18px',
          border: 'none',
          background: '#E7E7E7',
          margin: '6px 0px',
          paddingLeft: '6px',
        }
      }),
    ])
  )
}
