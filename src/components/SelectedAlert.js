import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Button } from '../components/subcomponents'

export default ({ obj, onClick }) => {
  const { id, severity, title, message, time } = obj
  const formatTime = moment(time).format('MMMM Do YYYY, dddd, h:mm:ss a')
  let level = ''
  switch (severity) {
    case 'high':
      level = 'Danger'
    case 'mid':
      level = 'Warning'
    case 'low':
      level = 'Notice'
  }

  const renderButtons = (
    <div className="row">
      <div className="col-1 center">
        <Button icon={faAngleDoubleLeft} onClick={onClick} />
      </div>
      <div className="col-1 center">
        <CopyToClipboard text={JSON.stringify(obj)}>
          <Button icon={faClipboardList} />
        </CopyToClipboard>
      </div>
    </div>
  )

  return (
    <div className="selected">
      <div className="col-9">
        <div className="selected-body">
          <div className="col-1">
            <div className="row">
              <div className="col-4">
                <p>Alert ID: {id}</p>
              </div>
              <div className="col-1">
                <CopyToClipboard text={id}>
                  <FontAwesomeIcon icon={faClipboardList} />
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="col-1">
            <p>Severity: {level}</p>
          </div>
          <div className="col-1">
            <p>When: {formatTime}</p>
          </div>

          <div className="col-1">
            <p className="title">{title}</p>
          </div>
          <div className="col-1">
            <p className="message">{message}</p>
          </div>
        </div>
      </div>
      <div className="selected-button-row">{renderButtons}</div>
    </div>
  )
}
