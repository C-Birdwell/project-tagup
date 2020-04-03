import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Fade from 'react-reveal/Fade'
import { isSafari } from 'react-device-detect'

import SelectedAlert from '../components/SelectedAlert'
import {
  _getDataAlert,
  _deleteDataAlert,
  _selectAlert,
  _onLayoutSize,
  _mutateColumns,
} from '../actions'
import Card from '../components/Card'

class Dashboard extends React.Component {
  constructor(...props) {
    super(...props)
    this.resize = this.resize.bind(this)
  }

  resize() {
    const { _onLayoutSize, _mutateColumns, windowSize } = this.props
    _onLayoutSize({ width: window.innerWidth, height: window.innerHeight })
    windowSize.width < 1024 && _mutateColumns(2)
    windowSize.width < 425 && _mutateColumns(1)
  }

  componentDidMount() {
    const { _getDataAlert, _onLayoutSize, windowSize, _mutateColumns } = this.props
    window.addEventListener('load', this.resize)
    //Add Class to body for Safari CSS fixes
    isSafari && document.body.classList.add('safari')

    window.addEventListener('resize', this.resize)

    windowSize.width < 1024 && _mutateColumns(2)
    _onLayoutSize({ width: window.innerWidth, height: window.innerHeight })

    try {
      const jsonSettings = localStorage.getItem('alertsArray')
      const settings = JSON.parse(jsonSettings)

      if (settings) {
        //reverse to get latest alert
        _getDataAlert(settings)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  //render each alert
  renderCard(data, i) {
    const { colorMode, _selectAlert, _deleteDataAlert } = this.props
    return (
      <Card
        data={data}
        key={i}
        backgroundImage="/images/alert.svg"
        darkMode={colorMode}
        onClick={() => _selectAlert(data)}
        onDelete={_deleteDataAlert}
        props={this.props}
      />
    )
  }

  //render screen
  render() {
    const { dataAlertColumns, selectedAlert, _selectAlert } = this.props
    //create rows
    const renderRows = dataAlertColumns.map((val, i) => (
      <Fade key={i}>
        <div className="row dashboard-row center">
          {val.map((val, i) => this.renderCard(val, i))}
        </div>
      </Fade>
    ))
    return (
      <div className="dashboard">
        {selectedAlert && selectedAlert.id && selectedAlert.id.length > 0 ? (
          <SelectedAlert obj={selectedAlert} onClick={() => _selectAlert({})} />
        ) : (
          renderRows
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  columns: state.dataAlert.columns,
  dataAlertArray: state.dataAlert.dataAlertArray,
  dataAlertColumns: state.dataAlert.dataAlertColumns,
  selectedAlert: state.selectedAlert.selectedAlert,
  colorMode: state.visuals.colorMode,
  windowSize: state.visuals.windowSize,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { _getDataAlert, _deleteDataAlert, _selectAlert, _onLayoutSize, _mutateColumns },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
