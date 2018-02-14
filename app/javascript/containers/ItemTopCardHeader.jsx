import React from 'react'
import {connect} from 'react-redux'
import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'

// material-ui
import {
  withStyles,
  Typography,
  Grid,
} from 'material-ui'

// app
import {attemptFetchItem} from '../reducers/note'
import {ItemDrawer} from '../components'

const styles = theme => ({
  rootBox: {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

class ItemTopCardHeader extends React.Component {
  render() {
    const {classes, currentItem} = this.props
    return (
      <div className={classes.rootBox}>
        <Grid container direction={'column'} justify={'flex-end'} spacing={0}>
          <Grid item>
            <Typography variant="caption">
              作成: {format(currentItem.get('createdAt'), 'YYYY年MMMDo A hh:mm', {locale: ja})}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              利用期限: {format(currentItem.get('expirationDate'), 'YYYY年MMMDo A hh:mm', {locale: ja})}
            </Typography>
          </Grid>
        </Grid>
        <ItemDrawer/>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return ({
    draftItem: state.note.draftItem,
    currentItem: state.note.currentItem,
    currentReservations: state.note.currentReservations,
  })
}

const mapDispatchToProps = {
  attemptFetchItem,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemTopCardHeader))
