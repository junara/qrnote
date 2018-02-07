import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';

// material-ui
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from 'material-ui'
import {Delete as DeleteIcon} from 'material-ui-icons';

// app
import {
  deleteItem,
} from '../reducers/note'
import Path from '../modules/Path'

const initialState = {
  name: '',
  error: false,
  open: false,
};

class ItemDeleteDialog extends React.Component {
  state = {
    ...initialState
  };

  componentWillUnmount() {
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  isKeywordConfirmed = () => {
    return (this.state.name === this.props.currentItem.get('name'))
  }

  handleSubmit = () => {
    if (this.isKeywordConfirmed()) {
      this.props.deleteItem({
        token: this.props.currentItem.get('token') || this.props.match.params.token,
      })
      this.props.history.push(Path.root);
      this.resetState()
    } else {
      this.setState({
        error: true
      })
    }
  };

  resetState = () => {
    this.setState({
      ...initialState
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false,
    });
  };

  render() {
    const {title, fontSize} = this.props
    return (
      <div>
        <IconButton
          color='secondary'
          onClick={this.handleOpen}
          aria-label="Edit"
          style={{width: 'inherit'}}
        >
          {this.props.icon ? this.props.icon : <DeleteIcon style={{fontSize: fontSize}}/>}
          {this.props.children}
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>予約表の削除</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>
                予約表の削除を行う場合は、確認のため、予約表名「{this.props.currentItem.get('name')}」を入力し、「削除する」ボタンを押してください。
              </Typography>
              <Typography>
                なお、一度削除された予約表を元に戻すことはできませんので、ご注意ください。
              </Typography>
            </DialogContentText>
            <TextField
              id="name"
              autoFocus
              label={this.props.currentItem.get('name')}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
              error={this.state.error}
            />
            <DialogActions>
              <Button
                color='secondary'
                onClick={this.handleSubmit}
                disabled={!this.isKeywordConfirmed()}
              >
                削除する
              </Button>
              <Button
                color='default'
                onClick={this.handleClose}
              >
                戻る
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
    currentItem: state.note.currentItem,
  })
}

const mapDispatchToProps = {
  deleteItem,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDeleteDialog))
