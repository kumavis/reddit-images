// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import h from 'react-hyperscript'
import Root from './containers/Root'

var container = document.getElementById('app-content')
render(h(Root), container)