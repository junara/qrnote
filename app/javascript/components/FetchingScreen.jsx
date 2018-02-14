import React from 'react'
import {withStyles} from 'material-ui/styles';
import ReactLoading from 'react-loading';

const styles = {
  screenBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 9999,
    background: 'rgba(0, 0, 0, 0.7)',
  }
};

class FetchingScreen extends React.PureComponent {
  render() {
    const {fetching} = this.props
    return (
      <div>
        {fetching
          ?
          <div className={this.props.classes.screenBackground}>
            <ReactLoading variant={'spin'} delay={0}/>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(FetchingScreen)
