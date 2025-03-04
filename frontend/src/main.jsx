import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store.jsx'
import {Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  //</StrictMode>
  ,
)
