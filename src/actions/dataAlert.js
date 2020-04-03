import { DATA_ALERT, DATA_ALERT_DELETE, COLUMNS } from '../typeDefs'

export const _getDataAlert = payload => ({
  type: DATA_ALERT,
  payload,
})

export const _deleteDataAlert = payload => ({
  type: DATA_ALERT_DELETE,
  payload,
})

export const _mutateColumns = payload => ({
  type: COLUMNS,
  payload,
})
