import React, { Component } from 'react'
import { Provider } from 'react-redux'
import h from 'react-hyperscript'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

const store = configureStore()

window.store = store

export default class Root extends Component {
  render() {
    return (
      h(Provider, { store: store }, [
        h(AsyncApp),
      ])
    )
  }
}