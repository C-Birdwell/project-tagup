import { SEARCH_TEXT } from '../typeDefs'

export const _mutateSearchText = payload => ({
  type: SEARCH_TEXT,
  payload,
})
