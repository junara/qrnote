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
} from 'material-ui'
import {Edit as EditIcon} from 'material-ui-icons'

// app
import {MAX_NAME_LENGTH, validate} from "../models/Item";
import {
  putItem,
} from '../reducers/note'

const initialState = {
  value: '',
  error: false,
  open: false

};

class ItemEditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
      value: this.setDefaultValue(),
    })
  };

  setDefaultValue = () => {
    return (this.props.itemName)
  }

  handleClose = () => {
    this.setState({open: false})
  };

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
      error: false,
    });
  };

  handleSubmit = () => {
    const value = this.state.value
    if (this.isValid(value)) {
      this.props.putItem({
        name: value,
        itemToken: this.props.itemToken,
      })
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

  isValid = (value) => {
    const error = validate(value)
    return error.length === 0
  }

  render() {
    const {fontSize = '1em'} = this.props
    return (
      <div>
        <IconButton
          color='default'
          onClick={this.handleOpen}
          aria-label="Edit"
          style={{width: 'inherit'}}
        >
          {this.props.icon ? this.props.icon : <EditIcon style={{fontSize: fontSize}}/>}
          {this.props.children}
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>予約表名「{this.props.confirmationKeyword}」の編集</DialogTitle>
          <DialogContent>
            <DialogContentText>
              予約表の名前を編集してください。
            </DialogContentText>
            <TextField
              id="value"
              autoFocus
              label="Name"
              value={this.state.value}
              onChange={this.handleChange('value')}
              margin="normal"
              required
              fullWidth
              error={this.state.error}
              helperText={`最大 ${MAX_NAME_LENGTH} 文字`}
            />
            <DialogActions>
              <Button color='default'
                      onClick={this.handleClose}
              >
                戻る
              </Button>
              <Button color='primary'
                      onClick={this.handleSubmit}
                      disabled={!this.isValid(this.state.value)}
              >
                保存
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
    itemName: state.note.currentItem.get('name'),
    itemToken: state.note.currentItem.get('token'),
  })
}

const mapDispatchToProps = {
  putItem,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemEditDialog))
