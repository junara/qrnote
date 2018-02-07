import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {
  format,
} from 'date-fns'
import ja from 'date-fns/locale/ja'

// material-ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui'
import {Today as CalendarIcon} from 'material-ui-icons'

// app
import {
  putItem,
} from '../reducers/note'

const initialState = {
  value: '',
  error: false,
  open: false

};

class ItemReservationsShowDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    }
  }

  render() {
    const {fontSize, open, handleClose, onClick, currentReservations} = this.props
    return (
      <div>
        <div onClick={onClick}>
          {this.props.children}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>予約</DialogTitle>
          <DialogContent>
            <List>
              {currentReservations.map((reservation, index) => (
                <ListItem key={index} dense>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      format(reservation.get('startDate'), 'MMM Do(dd)Ah時mm分', {locale: ja})
                    }
                    secondary={
                      reservation.get('name')
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              color='default'
              onClick={handleClose}
            >
              戻る
            </Button>
          </DialogActions>
        </Dialog>
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
  putItem,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemReservationsShowDialog))
