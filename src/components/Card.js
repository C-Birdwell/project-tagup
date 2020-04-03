import React, { useState } from 'react'
import ReactSVG from 'react-svg'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCommentAlt,
  faExclamationTriangle,
  faTrashAlt,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

import { Button } from './subcomponents'

const timestamp = moment().format()

export default ({ data, backgroundImage, onClick, onDelete, darkMode = false, props = {} }) => {
  const [modal, setModalState] = useState(false)

  // Remove excess text on shorter devices
  const windowHeight = props & (props.windowSize.height > 500) ? props.windowSize.height : false
  const cutMessage = windowHeight ? 200 : 300

  const formatMessage =
    data.message.length > 300 ? data.message.slice(0, cutMessage) + '...' : data.message

  const renderButton = (
    <Button
      icon={faTrashAlt}
      darkMode={darkMode}
      backgroundColor="red"
      onClick={e => {
        e.stopPropagation(), setModalState(true)
      }}
    />
  )

  const deleteMe = (
    <div className="card-delete-auth card-body">
      <div className="col-1" />
      <div className="col-1 center">
        <p>Confirm Deletion</p>
      </div>
      <div className="col-4">
        <div className="row">
          <div className="col-1 center">
            <Button
              icon={faAngleDoubleLeft}
              darkMode={darkMode}
              backgroundColor="gray"
              onClick={e => {
                e.stopPropagation(), setModalState(false)
              }}
            />
          </div>
          <div className="col-1 center">
            <Button
              icon={faTrashAlt}
              darkMode={darkMode}
              backgroundColor="red"
              onClick={e => {
                e.stopPropagation(), onDelete(data.id), setModalState(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
  const isItTwo = props.windowSize.width > 425 && props.columns === 2 ? 16 : 32
  const renderBody = (
    <div className="card-body">
      <div className="card-header col-2">
        <div className="row col-1">
          <p className="card-header-date">{moment(data.timeStamp).fromNow()}</p>
        </div>
        <div className="row col-4">
          <div className="col-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div className="col-9">
            <h2>
              {data.title.length > isItTwo ? data.title.slice(0, isItTwo) + '...' : data.title}
            </h2>
          </div>
        </div>
      </div>
      <div className="card-content col-6 row">
        <div className="col-1">
          <FontAwesomeIcon icon={faCommentAlt} />
        </div>
        <div className="col-9">
          <p>{formatMessage}</p>
        </div>
      </div>
      <div className="card-footer col-2">
        <div className="row">
          <div className="col-1" />
          <div className="col-1">{renderButton}</div>
        </div>
      </div>
    </div>
  )
  return (
    <div
      className={`card level-${data.severity} columns-${props.columns}`}
      onClick={onClick}
      key={data.id}
    >
      {modal ? deleteMe : renderBody}
      <div className="card-background">
        <ReactSVG src={backgroundImage} />
      </div>
    </div>
  )
}
