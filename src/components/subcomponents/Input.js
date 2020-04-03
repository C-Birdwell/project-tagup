import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusSquare,
  faPaperPlane,
  faExclamationTriangle,
  faExclamationCircle,
  faCommentAlt,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons'

export class InputText extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = { isActive: false }
    this.inputRefs = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  focusTextInput() {
    this.inputRefs.current.focus()
  }

  render() {
    const { value, onChange, placeholder, secure = false } = this.props
    const { isActive } = this.state
    return (
      <div
        className={`input-container${value && ' val'}${isActive ? ' active' : ''} input-text`}
        onClick={this.focusTextInput}
      >
        <div className="col-1">
          <div className="label">{value && <p>{secure ? 'Password' : placeholder}</p>}</div>
        </div>
        <div className="col-4">
          <input
            type={secure ? 'password' : 'text'}
            value={value}
            onChange={val => onChange(val.target.value)}
            placeholder={placeholder}
            ref={this.inputRefs}
            onFocus={() => this.setState({ isActive: true })}
            onBlur={() => this.setState({ isActive: false })}
          />
        </div>
      </div>
    )
  }
}

export class InputTextArea extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = { isActive: false }
    this.inputRefs = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  focusTextInput() {
    this.inputRefs.current.focus()
  }

  render() {
    const { value, onChange, placeholder, rows } = this.props
    const { isActive } = this.state
    return (
      <div
        className={`input-container${value && ' val'}${isActive ? ' active' : ''} input-text-area`}
        onClick={this.focusTextInput}
      >
        <div className="col-1">
          <div className="label">{value && <p>{placeholder}</p>}</div>
        </div>
        <div className="col-4">
          <textarea
            rows={rows ? rows : 4}
            type="text"
            value={value}
            onChange={val => onChange(val.target.value)}
            placeholder={placeholder}
            ref={this.inputRefs}
            onFocus={() => this.setState({ isActive: true })}
            onBlur={() => this.setState({ isActive: false })}
          />
        </div>
      </div>
    )
  }
}

export const InputRadio = ({ filter = [], selected = '', onChange }) => {
  return (
    <div className="input-radio">
      <div className="row">
        {filter &&
          filter.map((obj, i) => (
            <div className="col-1" key={i}>
              <input
                type="radio"
                value={obj.value}
                onChange={() => onChange(obj.value)}
                checked={obj.value === selected}
              ></input>
              <p>{obj.label}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
