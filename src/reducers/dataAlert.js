import { DATA_ALERT, DATA_ALERT_DELETE, COLUMNS, SEARCH_TEXT, FORM_ALERT_SUBMIT } from '../typeDefs'
import { createColumns } from '../utils'

const INITIAL_STATE = {
  searchText: '',
  dataAlertArray: [],
  dataAlertColumns: [],
  newArray: [],
  columns: 2,
}

export const dataAlert = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_ALERT:
      return {
        ...state,
        dataAlertArray: action.payload,
        dataAlertColumns: createColumns(action.payload, state.columns),
      }

    case DATA_ALERT_DELETE:
      const deleteItem = array => {
        return array.filter(val => val.id !== action.payload)
      }
      return {
        ...state,
        dataAlertArray: deleteItem(state.dataAlertArray),
        dataAlertColumns: createColumns(deleteItem(state.dataAlertArray), state.columns),
      }

    case COLUMNS:
      return {
        ...state,
        columns: action.payload,
        dataAlertColumns: createColumns(state.dataAlertArray, action.payload),
      }

    case SEARCH_TEXT:
      const filterArray = (array, arg) => {
        return array.filter(val => val.title.toLowerCase().includes(arg))
      }
      return {
        ...state,
        searchText: action.payload,
        dataAlertColumns:
          //Reset to default if user deletes last character
          action.payload !== ''
            ? createColumns(filterArray(state.dataAlertArray, action.payload), state.columns)
            : createColumns(state.dataAlertArray, state.columns),
      }
    case FORM_ALERT_SUBMIT:
      //create new array from new submit object
      const data = state.dataAlertArray
      const push = () => data.push(action.payload)
      push()
      localStorage.setItem('alertsArray', JSON.stringify(data))
      return {
        ...state,
        dataAlertArray: state.dataAlertArray.length > 0 ? data : [action.payload],
        dataAlertColumns: createColumns(data, state.columns),
      }

    default:
      return { ...state }
  }
}
