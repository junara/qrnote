import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

// material-ui
import {withStyles, Button} from 'material-ui';
import {ContentCopy as ClipboardIcon} from 'material-ui-icons'

// app

const styles = theme => ({
})

class MailToButton extends React.PureComponent {
  render() {
    const {text, classes, children} = this.props
    return (
      <CopyToClipboard
        text={text}
      >
        {
          children ||
          <Button variant='raised'>
            URLをコピーする
            <ClipboardIcon/>
          </Button>
        }
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(MailToButton)

