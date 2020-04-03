import { SELECTED_ALERT } from '../typeDefs'

const INITIAL_STATE = {
  selectedAlert: {},
}

export const selectedAlert = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECTED_ALERT:
      return { ...state, selectedAlert: action.payload }

    default:
      return { ...state }
  }
}
