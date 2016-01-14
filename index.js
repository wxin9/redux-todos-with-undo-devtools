import React from 'react'
import { render } from 'react-dom'
// import { createStore } from 'redux'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'
import DevTools from './DevTools'
import { persistState } from 'redux-devtools'

// const store = createStore(todoApp)
const finalCreateStore = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore)

const store = finalCreateStore(todoApp)
if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers'))
  )
}


const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  rootElement
)
