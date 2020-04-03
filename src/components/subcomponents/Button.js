import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'color'

export const Button = ({
  text = null,
  icon = null,
  backgroundColor = false,
  onClick,
  darkMode = false,
}) => {
  const color = backgroundColor ? Color(backgroundColor).darken(0.5) : {}
  const drk = darkMode === 'mode-dark'

  return (
    <div
      className={`button ${icon && 'btn-icon'} ${text && 'btn-text'}`}
      style={{
        backgroundColor: drk ? color : backgroundColor,
        borderColor: backgroundColor,
      }}
      onClick={onClick}
      key={darkMode}
    >
      <div className="row">
        {icon && (
          <div className="col-1">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        {text && (
          <div className="col-4 mobile-hide">
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  )
}
