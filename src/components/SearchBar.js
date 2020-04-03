import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { _mutateSearchText } from '../actions'

class SearchBar extends React.Component {
  constructor(...props) {
    super(...props)
    this.resize = this.resize.bind(this)
  }

  resize() {
    const { _mutateSearchText } = this.props
    //Fixes rendered
    _mutateSearchText('')
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  render() {
    const { _mutateSearchText, searchText } = this.props
    return (
      <div className="search-bar">
        <div className="row">
          <div className="col-9">
            <input
              type="text"
              value={searchText}
              onChange={val => _mutateSearchText(val.target.value)}
              placeholder="Search by Title"
            />
          </div>

          <div className="col-1">
            <div className="icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchText: state.dataAlert.searchText,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ _mutateSearchText }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar)
