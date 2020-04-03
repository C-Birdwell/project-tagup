import {
  FORM_ALERT_LEVEL,
  FORM_ALERT_TITLE,
  FORM_ALERT_MESSAGE,
  FORM_ALERT_SUBMIT,
  MODAL,
} from '../typeDefs'

export const _mutateModal = payload => ({
  type: MODAL,
  payload,
})

export const __mutateFormAlertTitle = payload => ({
  type: FORM_ALERT_TITLE,
  payload,
})

export const __mutateFormAlertMessage = payload => ({
  type: FORM_ALERT_MESSAGE,
  payload,
})

export const _mutateFormAlertLevel = payload => ({
  type: FORM_ALERT_LEVEL,
  payload,
})

export const _submitFormAlert = payload => ({
  type: FORM_ALERT_SUBMIT,
  payload,
})
