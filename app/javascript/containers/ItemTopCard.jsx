import React from 'react'
import {connect} from 'react-redux'
import CountUp from 'react-countup'

// material-ui
import {Typography, Grid, Card, CardContent} from 'material-ui'
import {Today as CalendarIcon, Face as UserIcon} from 'material-ui-icons'
import {withStyles} from 'material-ui/styles';

// app
import {ItemReservationsShowDialog, ItemUsersShowDialog, QrCodeImage, ItemMemorandumDialog} from '../components'
import {attemptFetchItem} from '../reducers/note'

const styles = theme => ({
  height1em: theme.common.height1em,
  fullHeight: {
    height: '100%',
  },
  displayInline: {
    display: 'inline',
  },
  itemTopCardBox: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0',
    zIndex: '12'
  },
})

class ItemTopCard extends React.Component {
  state = {
    anchorEl: null,
    menuOpen: false,
    reservationOpen: false,
    memorandumOpenOpen: false,
    userOpen: false,
  };

  render() {
    const {currentItem} = this.props
    const {classes} = this.props
    return (
      <div className={classes.itemTopCardBox}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Grid container className={classes.fullHeight} direction={'column'} justify={'space-between'}
                      spacing={0}>
                  <Grid item>
                    <ItemMemorandumDialog
                      open={this.state.memorandumOpen}
                      handleClose={() => this.setState({memorandumOpen: false})}
                      onClick={() => this.setState({memorandumOpen: true})}
                    >
                      <div>
                        <Typography variant='headline' className={classes.displayInline}>
                          {currentItem.get('name')}
                        </Typography>
                        <Typography variant='headline' className={classes.displayInline}>
                          の予約表
                        </Typography>
                      </div>
                    </ItemMemorandumDialog>
                  </Grid>
                  <Grid item>
                    <Grid container justify={'flex-end'}>
                      <Grid item>
                        <ItemReservationsShowDialog
                          open={this.state.reservationOpen}
                          handleClose={() => this.setState({reservationOpen: false})}
                          onClick={() => this.setState({reservationOpen: true})}
                        >
                          <div>
                            <Typography variant={'caption'}><CalendarIcon className={classes.height1em}/>
                              予約：<CountUp start={0} end={currentItem.get('reservationCount')}/>
                            </Typography>
                          </div>
                        </ItemReservationsShowDialog>
                      </Grid>
                      <Grid item>
                        <ItemUsersShowDialog
                          open={this.state.userOpen}
                          handleClose={() => this.setState({userOpen: false})}
                          onClick={() => this.setState({userOpen: true})}
                        >
                          <div>
                            <Typography variant={'caption'}><UserIcon className={classes.height1em}/>
                              ユーザー：<CountUp start={0} end={currentItem.get('userCount')}/>人
                            </Typography>
                          </div>
                        </ItemUsersShowDialog>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container justify={'flex-end'}>
                  <Grid item>
                    <QrCodeImage itemToken={currentItem.get('token')}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemTopCard))
