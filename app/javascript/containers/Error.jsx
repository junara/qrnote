import React from 'react'
import {connect} from 'react-redux'

// material-ui
import {Typography} from 'material-ui'

class Error extends React.Component {
  render() {
    return (
      <div>
        <Typography variant='display4'>ERROR</Typography>
        <Typography variant='display1'>{this.props.error.get('message')}</Typography>
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
