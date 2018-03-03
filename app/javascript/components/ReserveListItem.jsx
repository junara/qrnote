import React from 'react'
import {withRouter} from 'react-router';
import {format} from 'date-fns'
import {connect} from "react-redux"

// material-ui
import {
  Button,
  Grid
} from 'material-ui'

// app
import {showReservationCreationModal} from "../reducers/note";

class ReserveListItem extends React.PureComponent {
  _onClick = () => {
    const params = {
      startDate: format(this.props.startDate),
      endDate: format(this.props.endDate),
      itemToken: this.props.match.params.token,
    }
    this.props.showReservationCreationModal(params)
  }

  render() {
    const {startDate, endDate, variant = 'raised', buttonText, disabled = false} = this.props
    const formattedStartDate = format(startDate, 'mm')
    const formattedEndDate = format(endDate, 'mm')
    return (
      <Grid item xs>
        <Button
          disabled={disabled}
          variant={variant || 'flat'} color="primary"
          onClick={this._onClick}
          style={{width: '100%'}}
        >
          {buttonText ? buttonText : `${formattedStartDate} - ${formattedEndDate}`}
        </Button>
      </Grid>
    )
  }

}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  showReservationCreationModal,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReserveListItem))

