import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

// material-ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
} from 'material-ui'
import {attemptUpdateMemorandum} from '../reducers/note'

// app
import Description from '../components/Description'
import {validate, MAX_DESCRIPTION_LENGTH} from "../models/Memorandum";

const defaultMessage = 'ココにメモを表示する事ができます。右上のメニューから設定してください。'

class ItemMemorandumDialog extends React.Component {
  state = {
    value: '',
    edited: false,
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
      error: false,
    });
  };

  handleSwitchChange = name => (event, checked) => {
    if (this.state.edited) {
      this.props.attemptUpdateMemorandum({
        ...this.props.currentMemorandum.toJS(),
        description: this.state.value ? `${this.state.value}` : ''
      })
      this.setState({[name]: checked});
    } else {
      this.setState({[name]: checked, value: this.props.currentMemorandum.get('description') || ''});
    }
  };

  _handleClose = () => {
    this.props.handleClose()
    this.setState({
      value: this.props.currentMemorandum.get('description'),
      edited: false,
    })
  }

  isValid = (value) => {
    const error = validate(value)
    return error.length === 0
  }

  remainingMessage = () => {
    if (!this.state.value) {
      return (`のこり${MAX_DESCRIPTION_LENGTH}文字まで入力出来ます。`)
    }
    if ((MAX_DESCRIPTION_LENGTH - this.state.value.length) > 0) {
      return `のこり${MAX_DESCRIPTION_LENGTH - this.state.value.length}文字まで入力出来ます。`
    } else {
      return `${this.state.value.length - MAX_DESCRIPTION_LENGTH}文字オーバーしています`
    }
  }

  render() {
    const {editable = false, open = false, handleClose, onClick, currentMemorandum} = this.props
    return (
      <div>
        <div
          color='default'
          onClick={onClick}
          style={{width: 'inherit'}}
        >
          <div style={{display: 'flex'}}>
            {this.props.icon || null}
            {this.props.children}
          </div>
        </div>
        <Dialog open={open} onClose={this._handleClose} fullWidth>
          {
            editable &&
            <DialogActions>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.edited}
                    onChange={this.handleSwitchChange('edited')}
                    disabled={!this.isValid(this.state.value)}
                  />
                }
                label={this.state.edited ? '保存' : '編集'}
              />
            </DialogActions>
          }
          <DialogTitle>メモ</DialogTitle>
          {
            !this.state.edited
              ?
              <DialogContent>
                <Description description={currentMemorandum.get('description') || defaultMessage}/>
              </DialogContent>
              :
              <div>
                <DialogContent>
                  <DialogContentText>
                    {this.remainingMessage()}
                  </DialogContentText>
                  <TextField
                    id="value"
                    autoFocus
                    label="メモ"
                    default
                    value={this.state.value}
                    onChange={this.handleChange('value')}
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rowsMax={12}
                    helperText={`最大 ${MAX_DESCRIPTION_LENGTH} 文字。Markdown形式で記述できます。`}
                  />
                </DialogContent>
              </div>
          }
          <DialogActions>
            <Button
              color='default'
              onClick={this._handleClose}
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
    currentMemorandum: state.note.currentMemorandum,
  })
}

const mapDispatchToProps = {
  attemptUpdateMemorandum,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemMemorandumDialog))
