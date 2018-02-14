import React from 'react'

// material-ui
import {Typography, Paper,} from 'material-ui'
import {withStyles} from 'material-ui/styles';
import {deepOrange, deepPurple, blue} from 'material-ui/colors'

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  primaryAvatar: {
    margin: 10,
    // color: '#fff',
    // backgroundColor: blue[500],
  },
  month: {
    backgroundColor: blue[500],
    color: '#fff',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',

  }
};

class DayButton extends React.Component {
  avatarClasses = (disabled, isActive) => {
    if (disabled) {
      return this.props.classes.avatar
    } else if (isActive) {
      return this.props.classes.orangeAvatar
    } else {
      return this.props.classes.primaryAvatar
    }
  }

  render() {
    const {day, week, month, year, badgeContent = 0, disabled = false, onClick, isActive} = this.props
    const {classes} = this.props
    return (
      <div style={{width: '3em', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Paper className={classes.month}>
          <Typography variant={'body1'} color={'inherit'}>{month}月</Typography>
        </Paper>
        <div>
          <Typography variant={'display1'}>{day}</Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DayButton)
