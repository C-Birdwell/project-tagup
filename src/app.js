import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import GoogleFontLoader from 'react-google-font-loader'

import Dashboard from './screens/Dashboard'
import Header from './components/Header'
import AlertForm from './components/AlertForm'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

const jsx = (
  <Provider store={store} id="app">
    <div className="app">
      <GoogleFontLoader
        fonts={[
          {
            font: 'Roboto',
            weights: [400, '400i'],
          },
        ]}
      />
      <Header />
      <Dashboard />
      <AlertForm />
    </div>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
