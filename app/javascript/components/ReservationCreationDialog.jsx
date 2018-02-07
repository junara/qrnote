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
  TextField,
  Typography,
} from 'material-ui';

// app
import {
  closeReservationCreationModal,
  createReservation,
} from '../reducers/note'
import {validate, MAX_NAME_LENGTH} from '../models/Reservation'

const initialState = {
  value: '',
  error: false
};

class ReservationCreationDialog extends React.PureComponent {
  state = {
    ...initialState
  };

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
      error: false,
    });
  };

  handleCreateReservation = () => {
    if (this.isValid(this.state.value)) {
      this.props.createReservation(
        {
          startDate: format(this.props.draftReservation.get('startDate')),
          endDate: format(this.props.draftReservation.get('endDate')),
          name: this.state.value,
          itemToken: this.props.currentItem.get('token') || this.props.match.params.token,
        }
      )
      this.props.closeReservationCreationModal()
    } else {
      this.setState({
        error: true
      })
    }
  };

  handleClose = () => {
    this.props.closeReservationCreationModal()
  };

  isValid = (value) => {
    const error = validate(value)
    return error.length === 0
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.reservationCreationModalOpen} onClose={this.handleClose}>
          <DialogTitle>予約する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {format(this.props.draftReservation.get('startDate'), 'MMM Do dddd', {locale: ja})}
              の
              {format(this.props.draftReservation.get('startDate'), 'Ah時mm分', {locale: ja})}
              から
              {format(this.props.draftReservation.get('endDate'), 'h時mm分', {locale: ja})}
              までを予約しますか？
            </DialogContentText>
            <TextField
              id="value"
              autoFocus
              label="予約者名"
              value={this.state.value}
              onChange={this.handleChange('value')}
              margin="normal"
              required
              fullWidth
              error={this.state.error}
              helperText={`最大 ${MAX_NAME_LENGTH} 文字`}
              onKeyPress={(e) => {
                if (e.charCode === 13) this.handleCreateReservation()
              }}
            />
            <DialogActions>
              <Button
                color='default'
                onClick={this.handleClose}
              >
                戻る
              </Button>
              <Button
                color='primary'
                onClick={this.handleCreateReservation}
                disabled={!this.isValid(this.state.value)}
              >
                予約する
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
    reservationCreationModalOpen: state.note.modal.get('reservationCreationModalOpen'),
    draftReservation: state.note.draftReservation,
    currentItem: state.note.currentItem,
  })
}

const mapDispatchToProps = {
  closeReservationCreationModal,
  createReservation,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationCreationDialog))
