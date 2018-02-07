import React from 'react'
import {connect} from 'react-redux'

// material-ui
import {Typography} from 'material-ui'

class Error extends React.Component {
  render() {
    return (
      <div>
        <Typography type='display4'>ERROR</Typography>
        <Typography type='display1'>{this.props.error.get('message')}</Typography>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({error: state.app.error,}
  )
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Error)
