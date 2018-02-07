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
import {Today as CalendarIcon} from 'material-ui-icons'

// app
import Path from '../modules/Path'

class ReservationCalendarDialog extends React.PureComponent {
  onClose = () => {
    this.props.onClose()
  }

  handleAccept = () => {
    location.href = Path.reservationCalendar(this.props.currentReservation.get('token'))
    this.props.onClose()
  }

  handleReject = () => {
    this.props.onClose()
  }


  render() {
    const {open} = this.props
    return (
      <div>
        <Dialog open={open} onClose={this.onClose}>
          <DialogTitle>{this.props.currentReservation.get('name')}さんの予約データダウンロード</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {format(this.props.currentReservation.get('startDate'), 'MMM Do dddd', {locale: ja})}
              の
              {format(this.props.currentReservation.get('startDate'), 'Ah時mm分', {locale: ja})}
              から
              {format(this.props.currentReservation.get('endDate'), 'h時mm分', {locale: ja})}
              までの予約データを標準のカレンダー形式（iCal形式）でダウンロードしますか？
            </DialogContentText>

            <DialogActions>
              <Button
                color='default'
                onClick={this.handleReject}
              >
                いいえ
              </Button>
              <Button
                color='primary'
                onClick={this.handleAccept}
              >
                <CalendarIcon/>
                はい
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
    currentReservation: state.note.currentReservation,
  })
}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationCalendarDialog))
