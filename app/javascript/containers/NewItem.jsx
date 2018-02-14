import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

// material-ui
import {
  withStyles,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide';
import {MailOutline as MailIcon} from 'material-ui-icons'

// app
import {Item} from './'
import {
  attemptFetchItem, resetNote
} from '../reducers/note'
import {Url, Path} from '../modules'
import {mailItemHref} from '../modules/Export'
import {CopyToClipboardButton} from '../components'

const styles = theme => ({
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewItem extends React.Component {
  state = {
    value: null,
  }

  handleClose = () => {
    this.props.history.push(Path.item(this.props.currentItem.get('token')))
  }

  getText = () => {
    return (Url.item(this.props.currentItem.get('token')))
  }

  render() {
    const {currentItem} = this.props
    return (
      <div>
        <Item token={this.props.match.params.token}/>
        <Dialog
          open={true}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle>
            {"予約表の新規作成完了！"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              「 {currentItem.name}」のオンライン予約表が作成されました。
            </DialogContentText>
            <DialogContentText>
              以下のURLをメールなどで保存してください。以降、このURLページが予約で使われます。
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <TextField
              id="url"
              label={`予約表のURL`}
              value={this.getText()}
              margin="normal"
              fullWidth
              helperText={'URLは必ずメール、コピーなどの方法で必ず保存してください。'}
            />
            <Grid container alignItems={'flex-end'} justify={'flex-end'}>
              <Grid item>
                <Button
                  onClick={() => {
                    location.href = mailItemHref(currentItem)
                  }}
                  variant='raised'
                >
                  URLをメールで送る
                  <MailIcon/>
                </Button>
              </Grid>
              <Grid item>
                <CopyToClipboardButton
                  text={Url.item(currentItem.get('token'))}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              予約表を表示する
            </Button>
          </DialogActions>
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
  attemptFetchItem,
  resetNote,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewItem)))
