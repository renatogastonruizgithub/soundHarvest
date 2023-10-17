import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../src/assets/index.css'
import "../src/assets/App.css"
import { Provider } from 'react-redux'

import { store } from '../src/app/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
