import { COLOR_MODE, WINDOW_SIZE, DELETE_AUTH } from '../typeDefs'

export const _mutateColorMode = payload => ({
  type: COLOR_MODE,
  payload,
})

export const _onDeleteAuthorization = payload => ({
  type: DELETE_AUTH,
  payload,
})

export const _onLayoutSize = payload => ({
  type: WINDOW_SIZE,
  payload,
})
