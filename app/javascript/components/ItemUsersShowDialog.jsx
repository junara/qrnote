import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

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
import {Person as PersonIcon} from 'material-ui-icons'

class ItemUsersShowDialog extends React.Component {
  render() {
    const {fontSize, open, handleClose, onClick, currentUsers} = this.props
    return (
      <div>
        <div onClick={onClick}>
          {this.props.children}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ユーザー</DialogTitle>
          <DialogContent>
            <List>
              {currentUsers.map((user, index) => (
                <ListItem key={index} dense>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.get('name')}
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
    currentUsers: state.note.currentUsers,
  })
}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemUsersShowDialog))
