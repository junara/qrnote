import React from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import {VelocityTransitionGroup} from 'velocity-react'

// material-ui
import {
  Chip,
} from 'material-ui'

// app
import {ReservationCalendarDialog} from './'
import {
  showReservationEditModal,
  setCurrentReservation,
} from '../reducers/note'
import {filterReservations} from '../modules/CustomDateFns'

const Animation = {
  runOnMount: false,
  enter: {
    animation: 'fadeIn',
    stagger: 100,
  },
  leave: {
    animation: 'fadeOut',
    stagger: 100,
  },
  style: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

const displayLength = 4

class ReserveListItemChips extends React.PureComponent {
  state = {open: false}
  handleOnDelete = (reservation) => {
    this.props.showReservationEditModal(reservation)
  }

  handleOnClick = (reservation) => {
    this.props.setCurrentReservation(reservation)
    this.setState({open: true})
  }

  render() {
    const {startDate, endDate, currentReservations, margin, disabled = false} = this.props
    return (
      <div style={{margin: margin}}>
        <VelocityTransitionGroup
          runOnMount={Animation.runOnMount}
          enter={Animation.enter}
          leave={Animation.leave}
          style={Animation.style}
        >
          {filterReservations(currentReservations, startDate, endDate).map((reservation, index) => {
            return (
              <div key={index} style={{marginBottom: '0.2em', marginRight: '0.2em'}}>
                {
                  !disabled ?
                    <Chip color='secondary'
                          onClick={() => this.handleOnClick(reservation)}
                          onDelete={() => this.handleOnDelete(reservation)}
                          label={reservation.get('name').substr(0, displayLength)}
                    />
                    :
                    <Chip color='secondary'
                          label={reservation.get('name').substr(0, displayLength)}
                    />
                }
              </div>
            )
          })}
        </VelocityTransitionGroup>
        <ReservationCalendarDialog
          open={this.state.open}
          onClose={() => this.setState({open: false})}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentReservations: state.note.currentReservations,
  })
}

const mapDispatchToProps = {
  showReservationEditModal,
  setCurrentReservation,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReserveListItemChips))
