import React from 'react'
import {connect} from 'react-redux'

// app
import {
  ItemTopCard,
  ItemTopCardHeader,
  ItemSchedule
} from './'
import {
  attemptFetchItem, resetNote
} from '../reducers/note'
import {ReservationCreationDialog, ReservationDeleteDialog} from '../components'

class Item extends React.Component {
  componentWillMount() {
    const token = this.props.token ? this.props.token : this.props.match.params.token
    this.props.attemptFetchItem(token)
  }

  render() {
    return (
      <div>
        <div>
          <ItemTopCardHeader/>
          <ItemTopCard/>
          <ItemSchedule/>
        </div>
        <ReservationCreationDialog/>
        <ReservationDeleteDialog/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return (state)
}

const mapDispatchToProps = {
  attemptFetchItem,
  resetNote,
}


export default connect(mapStateToProps, mapDispatchToProps)(Item)
