import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

// material-ui
import {AppBar, Toolbar, Typography, Button,} from 'material-ui'

// app
import {resetError} from '../reducers/app'
import {resetNote} from '../reducers/note'
import {Url, Image, Setting} from '../modules'

const {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');

class Header extends React.Component {
  _onClick = () => {
    this.props.resetError()
    this.props.resetNote()
    this.props.history.push(`/`);
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{justifyContent: 'space-between'}}>
            <Button size={'small'} color="inherit" aria-label="Add to shopping cart" onClick={this._onClick}>
              <img src={Image.qrNoteLogoWhite} style={{height: '1.5em', width: '1.5em', marginRight: '0.4em'}}/>
              <div style={{display: 'flex', alignItems: 'baseline'}}>
                <Typography variant="title" color='inherit'>
                  {Setting.appName}
                </Typography>
                <Typography variant="caption" color='inherit'>
                  {'alpha'}
                </Typography>
              </div>
            </Button>
            <div style={{display: 'flex'}}>
              <TwitterShareButton
                title={Setting.appName}
                url={Url.root}
                hashtags={['qrnote']}
                style={{marginRight: '0.5em'}}
              >
                <TwitterIcon
                  size={32}
                  round/>
              </TwitterShareButton>
              <FacebookShareButton
                quote={Setting.appName}
                url={Url.root}
                hashtags={['qrnote']}
                style={{marginRight: '0.5em'}}
              >
                <FacebookIcon
                  size={32}
                  round/>
              </FacebookShareButton>
              <WhatsappShareButton
                title={Setting.appName}
                url={Url.root}
                hashtags={['qrnote']}
              >
                <WhatsappIcon
                  size={32}
                  round/>
              </WhatsappShareButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    currentItem: state.note.currentItem,
    currentReservations: state.note.currentReservations,
  })
}

const mapDispatchToProps = {
  resetError,
  resetNote,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
