import React from 'react'
import ReactMarkdown from 'react-markdown'

// material-ui
import {withStyles} from 'material-ui/styles';
import {Typography} from 'material-ui'

// app

const regex = /[\n\r]/g;
const styles = theme => ({
  ...theme.common,
})

class Description extends React.PureComponent {
  render() {
    const {description = null, classes} = this.props
    return (
      <div>
        <Typography headlineMapping={{body1: 'div'}}>
          <ReactMarkdown source={description}/>
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Description)

