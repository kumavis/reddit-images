import { createRoot } from 'react-dom/client'
import React from 'react'
import { Root } from './containers/Root.js'

const h = React.createElement

const container = document.getElementById('app-content')
const root = createRoot(container)
root.render(h(Root))