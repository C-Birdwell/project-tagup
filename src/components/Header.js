import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { faMoon, faSun, faDiceOne, faDiceTwo, faDiceThree } from '@fortawesome/free-solid-svg-icons'

import { _mutateColumns, _mutateColorMode, _getDataAlert } from '../actions'
import SearchBar from './SearchBar'
import { Button } from './subcomponents'
import { dataDemo } from '../data'

class Header extends React.Component {
  renderColumnButton(icon, text, num, mobileHide = false) {
    const { colorMode, _mutateColumns } = this.props

    return (
      <div className={`col-1 center ${mobileHide && `mobile-hide`}`}>
        <Button
          icon={icon}
          text={text}
          onClick={() => {
            _mutateColumns(num)
          }}
          darkMode={colorMode}
        />
      </div>
    )
  }

  renderSelectorColumns() {
    const { _mutateColumns, colorMode } = this.props
    return (
      <div className="row">
        {this.renderColumnButton(faDiceOne, 'One Column', 1)}
        {this.renderColumnButton(faDiceTwo, 'Two Column', 2)}
        {this.renderColumnButton(faDiceThree, 'Three Column', 3, true)}
      </div>
    )
  }

  //Dark Mode Logic
  _changeColor(pos, neg) {
    const { _mutateColorMode } = this.props
    document.body.classList.add(pos), document.body.classList.remove(neg), _mutateColorMode(pos)
  }

  renderSelectorColor() {
    const { _mutateColorMode, colorMode } = this.props

    return (
      <div className="row">
        <div className="col-1 center">
          <Button
            icon={faMoon}
            onClick={() => this._changeColor('mode-dark', 'mode-light')}
            darkMode={colorMode}
          />
        </div>
        <div className="col-1 center">
          <Button
            icon={faSun}
            onClick={() => this._changeColor('mode-light', 'mode-dark')}
            darkMode={colorMode}
          />
        </div>
      </div>
    )
  }

  createDemoData() {
    const { _getDataAlert } = this.props
    localStorage.setItem('alertsArray', dataDemo)
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

  render() {
    const { colorMode, _getDataAlert } = this.props
    return (
      <header>
        <div className="row">
          <div className="col-1">
            <div className="col-1">
              <p>Pick Color Mode</p>
            </div>
            <div className="col-4">{this.renderSelectorColor()}</div>
          </div>
          <div className="col-1">
            <div className="col-1">
              <p>Pick Column Numbers</p>
            </div>
            <div className="col-4">{this.renderSelectorColumns()}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-1 center">
            <SearchBar />
          </div>
          <div className="col-1 mobile-hide">
            <div className="col-1">
              <p>Demo Data:</p>
            </div>
            <div className="col-4 center row">
              <Button
                onClick={() => this.createDemoData()}
                darkMode={colorMode}
                text="Create Alerts"
              />
              <Button
                onClick={() => {
                  localStorage.clear(), _getDataAlert([])
                }}
                darkMode={colorMode}
                text="Clear Alerts"
                backgroundColor="red"
              />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  colorMode: state.visuals.colorMode,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ _mutateColumns, _mutateColorMode, _getDataAlert }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
