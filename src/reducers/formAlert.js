import {
  FORM_ALERT_LEVEL,
  FORM_ALERT_TITLE,
  FORM_ALERT_MESSAGE,
  FORM_ALERT_SUBMIT,
  MODAL,
} from '../typeDefs'

const INITIAL_STATE = {
  modal: false,
  formAlertLevel: 'low',
  formAlertTitle: '',
  formAlertMessage: '',
}

export const formAlert = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_ALERT_LEVEL:
      return { ...state, formAlertLevel: action.payload }

    case FORM_ALERT_TITLE:
      return { ...state, formAlertTitle: action.payload }

    case FORM_ALERT_MESSAGE:
      return { ...state, formAlertMessage: action.payload }

    case FORM_ALERT_SUBMIT:
      return {
        ...state,
        modal: false,
        formAlertLevel: 'low',
        formAlertTitle: '',
        formAlertMessage: '',
      }

    case MODAL:
      return { ...state, modal: action.payload }

    default:
      return { ...state }
  }
}
