//Combine all Reducers to create Store for Redux state
import { createStore, combineReducers } from 'redux'
import { dataAlert, formAlert, selectedAlert, visuals } from '../reducers/'

export default () => {
  const store = createStore(
    combineReducers({
      dataAlert,
      formAlert,
      selectedAlert,
      visuals,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  return store
}
