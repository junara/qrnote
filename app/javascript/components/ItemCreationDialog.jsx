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
  Typography,
} from 'material-ui'

// app
import {
  closeItemCreationModal,
  createItem,
} from '../reducers/note'
import {
  validate,
  MAX_NAME_LENGTH,
  GUEST_EXPIRATION_DATE_AGO,
} from '../models/Item'
import {Path} from '../modules'

const initialState = {
  value: '',
  error: false
};

class ItemCreationDialog extends React.Component {
  state = {
    ...initialState
  };

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
      error: false,
    });
  };

  handleCreateItem = () => {
    if (this.isValid(this.state.value)) {
      this.props.createItem({
        name: this.state.value,
        callback: (itemToken) => {
          this.props.history.push(Path.newItem(itemToken));
        }
      })
      this.props.closeItemCreationModal();
    } else {
      this.setState({
        error: true
      })
    }
  };

  handleClose = () => {
    this.props.closeItemCreationModal()
  };

  isValid = (value) => {
    const error = validate(value)
    return error.length === 0
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.itemCreationModalOpen} onClose={this.handleClose}>
          <DialogTitle>予約表を新規作成する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              作成したいオンライン予約表の名称を入力してください。
            </DialogContentText>
            <TextField
              id="value"
              autoFocus
              label="予約表の名称"
              value={this.state.value}
              onChange={this.handleChange('value')}
              margin="normal"
              required
              fullWidth
              error={this.state.error}
              helperText={`最大 ${MAX_NAME_LENGTH} 文字`}
              onKeyPress={(e) => {
                if (e.charCode === 13) this.handleCreateItem()
              }}
            />
            <DialogContentText>
              <Typography variant={'caption'}>
                作成された予約表の有効期限は最新の予約作成日から{GUEST_EXPIRATION_DATE_AGO}ヶ月です。
              </Typography>
              <Typography variant={'caption'}>
                有効期限が過ぎた予約表は、自動的に削除されます。
              </Typography>
              <Typography variant={'caption'}>
                個人が特定できる情報の記載はご遠慮願います。
              </Typography>
            </DialogContentText>
            <DialogActions>
              <Button color='default'
                      onClick={this.handleClose}
              >
                戻る
              </Button>
              <Button color='primary'
                      onClick={this.handleCreateItem}
                      disabled={!this.isValid(this.state.value)}
              >
                作成する
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
    itemCreationModalOpen: state.note.modal.get('itemCreationModalOpen'),
    itemToken: state.note.draftItem.get('token'),
  })
}

const mapDispatchToProps = {
  closeItemCreationModal,
  createItem,

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemCreationDialog))
