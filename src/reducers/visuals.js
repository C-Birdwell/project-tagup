import { COLOR_MODE, WINDOW_SIZE } from '../typeDefs'

const INITIAL_STATE = {
  colorMode: 'mode-light',
  windowSize: 0,
}

export const visuals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLOR_MODE:
      return { ...state, colorMode: action.payload }

    case WINDOW_SIZE:
      return { ...state, windowSize: action.payload }

    default:
      return { ...state }
  }
}
