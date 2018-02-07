import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'

// material-ui
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from 'material-ui'
import {Delete as DeleteIcon} from 'material-ui-icons';

// app
import {
  closeReservationEditModal,
  deleteReservation,
} from '../reducers/note'

class ReservationDeleteDialog extends React.PureComponent {
  handleClose = () => {
    this.props.closeReservationEditModal()
  };

  handleDelete = () => {
    this.props.deleteReservation(this.props.currentReservation)
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.reservationEditModalOpen} onClose={this.handleClose}>
          <DialogTitle>{this.props.currentReservation.get('name')}さんの予約の取り消し</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {format(this.props.currentReservation.get('startDate'), 'MMM Do dddd', {locale: ja})}
              の
              {format(this.props.currentReservation.get('startDate'), 'Ah時mm分', {locale: ja})}
              から
              {format(this.props.currentReservation.get('endDate'), 'h時mm分', {locale: ja})}
              までの予約を取り消しますか？
            </DialogContentText>
            <DialogActions>
              <Button
                color='secondary'
                onClick={this.handleDelete}
              >
                <DeleteIcon/>
                はい
              </Button>
              <Button
                color='default'
                onClick={this.handleClose}
              >
                いいえ
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    reservationEditModalOpen: state.note.modal.get('reservationEditModalOpen'),
    currentReservation: state.note.currentReservation,
  })
}

const mapDispatchToProps = {
  closeReservationEditModal,
  deleteReservation,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationDeleteDialog))
