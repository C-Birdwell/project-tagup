import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusSquare,
  faPaperPlane,
  faExclamationTriangle,
  faExclamationCircle,
  faCommentAlt,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons'

import {
  _getDataAlert,
  _mutateModal,
  _mutateFormAlertLevel,
  __mutateFormAlertTitle,
  __mutateFormAlertMessage,
  _submitFormAlert,
} from '../actions'

import { InputText, Button, InputTextArea, InputRadio } from './subcomponents'

class AlertForm extends React.Component {
  renderInput() {
    const { __mutateFormAlertTitle, formAlertTitle } = this.props
    return (
      <InputText value={formAlertTitle} onChange={__mutateFormAlertTitle} placeholder="Title" />
    )
  }

  renderTextArea() {
    const { __mutateFormAlertMessage, formAlertMessage } = this.props
    return (
      <div className="col-1">
        <div className="col-4">
          <InputTextArea
            value={formAlertMessage}
            onChange={__mutateFormAlertMessage}
            placeholder="Message"
            rows={8}
          />
        </div>
      </div>
    )
  }

  renderRadio() {
    const { formAlertLevel, _mutateFormAlertLevel } = this.props
    return (
      <InputRadio
        filter={[
          { label: 'Mild', value: 'low' },
          { label: 'Warning', value: 'mid' },
          { label: 'Severe', value: 'high' },
        ]}
        onChange={_mutateFormAlertLevel}
        selected={formAlertLevel}
      />
    )
  }

  renderSubmit() {
    const {
      _submitFormAlert,
      _getDataAlert,

      formAlertLevel,
      formAlertTitle,
      formAlertMessage,
    } = this.props
    if (
      formAlertTitle &&
      formAlertTitle.length > 0 &&
      formAlertMessage &&
      formAlertMessage.length > 0
    ) {
      return (
        <Button
          text="Submit"
          icon={faPaperPlane}
          onClick={() =>
            _submitFormAlert({
              id: uuidv4(),
              severity: formAlertLevel,
              title: formAlertTitle,
              message: formAlertMessage,
              time: moment(),
            })
          }
        />
      )
    } else {
      return null
    }
  }

  //creates a 1 to 9 ratio columns with a FontAwesomeIcon to the left of the child
  renderIconCol(icon, children) {
    return (
      <div className="row">
        <div className="col-1 center">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="col-9 center">{children}</div>
      </div>
    )
  }

  renderForm() {
    const { formAlertLevel } = this.props
    return (
      <div
        className={`form level-${formAlertLevel}`}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div className="col-1">
          {this.renderIconCol(faExclamationCircle, <h2>Add a New Alert</h2>)}
        </div>
        <div className="col-1">{this.renderIconCol(faExclamationTriangle, this.renderInput())}</div>
        <div className="col-3">{this.renderIconCol(faCommentAlt, this.renderTextArea())}</div>
        <div className="col-1">{this.renderIconCol(faTachometerAlt, this.renderRadio())}</div>
        <div className="col-2">{this.renderSubmit()}</div>
      </div>
    )
  }

  render() {
    const { _mutateModal, modal } = this.props
    const modalStatus = modal ? 'open' : 'close'

    return (
      <div className={`modal ${modalStatus}`} onClick={() => _mutateModal(!modal)}>
        {this.renderForm()}
        <div className="icon">
          <FontAwesomeIcon icon={faPlusSquare} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  formAlertLevel: state.formAlert.formAlertLevel,
  formAlertTitle: state.formAlert.formAlertTitle,
  formAlertMessage: state.formAlert.formAlertMessage,
  modal: state.formAlert.modal,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      _getDataAlert,
      _mutateModal,
      _mutateFormAlertLevel,
      __mutateFormAlertTitle,
      __mutateFormAlertMessage,
      _submitFormAlert,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertForm)
