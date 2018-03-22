import React from 'react'
import {connect} from 'react-redux'
import {Range} from 'immutable'
import {
  addDays,
  format,
  addMinutes,
  addHours,
  startOfDay,
  getHours,
  isPast,
} from 'date-fns'
import scrollToComponent from 'react-scroll-to-component';

// material-ui
import {Typography, List, ListItem, ListSubheader, Grid, Badge} from 'material-ui'
import {withStyles} from 'material-ui/styles';

// app
import {DayButton, ReserveListItem, ReserveListItemChips} from '../components'
import {daysForHeader, currentStartDate} from '../modules/CustomDateFns'

const styles = theme => ({
  scheduleBox: {
    width: '100%',
  },
  daySelectBox: {
    zIndex: 10,
    position: '-webkit-sticky',
    position: 'sticky',
    top: 147,
  },
  listSubHeaderInItemPageSticky: {
    top: 152 + 30,
    zIndex: 11,
    backgroundColor: 'transparent',
  },
})


class ItemReserveListHeader extends React.PureComponent {
  render() {
    return (
      <List style={{backgroundColor: 'white', paddingBottom: '0'}}>
        <ListItem style={{paddingBottom: '0'}}>
          <Grid container justify={'space-between'} spacing={0}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <Grid container justify={'center'}>
                {
                  daysForHeader(0, 2).map((d, index) => {
                    const {day, disabled = false, week, month} = d
                    return (
                      <Grid item xs={4} key={index}>
                        <Grid container justify={'center'}>
                          <Grid item>
                            <DayButton
                              key={index}
                              day={day}
                              disabled={false}
                              badgeContent={week}
                              month={month}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    )
  }
}

class ItemReserveListBodyHourMin extends React.PureComponent {
  render() {
    const {duration, min, date} = this.props
    return (
      <ListItem>
        <Grid container justify={'space-between'} spacing={0}>
          <Grid item xs={2}>
            <Grid container justify={'flex-end'}>
              <Grid item>
                <Grid container justify={'center'} alignItems={'flex-start'}>
                  <Grid item>
                    <Typography variant={'headline'}>{min}分</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container justify={'space-between'}>
              {
                Range(0, 3).map((d, index) => {
                  const startDate = addMinutes(addDays(date, d), min)
                  const endDate = addMinutes(addDays(date, d), min + duration)
                  return (
                    <Grid key={index} item xs={4}>
                      <Grid container direction={'column'} justify={'center'} spacing={8}>
                        <Grid item>
                          <ReserveListItem
                            key={index}
                            startDate={startDate}
                            endDate={endDate}
                            variant={startDate === currentStartDate(duration) ? 'raised' : false}
                            buttonText={isPast(endDate) ? '予約時間外' : isPast(startDate) ? '今から使う' : '予約する'}
                            disabled={isPast(endDate)}
                          />
                        </Grid>
                        <Grid item>
                          <ReserveListItemChips
                            disabled={isPast(endDate)}
                            startDate={startDate}
                            endDate={endDate}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
}

class ItemReserveListBodyHour extends React.PureComponent {

  render() {
    const {firstDay = startOfDay(new Date()), classes, hour, duration} = this.props
    const date = addHours(firstDay, hour)
    return (
      <List
      >
        <ListSubheader
          classes={{
            sticky: classes.listSubHeaderInItemPageSticky,
          }}
        >
          <Grid container justify={'space-between'} spacing={0}>
            <Grid item xs={2}>
              <Grid container justify={'flex-end'}>
                <Grid item>
                  <Badge
                    badgeContent={format(date, 'A')}
                  >
                    <Typography variant={'display1'}>{format(date, 'hh')}時</Typography>
                  </Badge>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </ListSubheader>
        {
          Range(0, 60, duration).map((min, index) => {
            return (
              <ItemReserveListBodyHourMin
                key={index}
                duration={duration}
                min={min}
                date={date}
              />
            )
          })
        }
      </List>
    )
  }
}

class ItemSchedule extends React.PureComponent {
  componentDidMount() {
    const hour = getHours(currentStartDate())
    const startHour = this.props.item.get('startHour')
    const repeatedOffset = 90
    scrollToComponent(this[`hour${hour}`], {
      align: 'top',
      duration: 1000,
      offset: -(152 + repeatedOffset * (hour - startHour)),
    })
  }

  render() {
    const duration = this.props.item.get('duration')
    const startHour = this.props.item.get('startHour')
    const endHour = this.props.item.get('endHour')
    const firstDay = startOfDay(new Date())
    const {classes} = this.props
    return (
      <div>
        <div className={classes.daySelectBox}>
          <ItemReserveListHeader/>
        </div>

        <div className={classes.scheduleBox}>
          {
            Range(startHour, endHour).map((hour, index) => {
              return (
                <ItemReserveListBodyHour
                  ref={(section) => this[`hour${hour}`] = section}
                  key={index}
                  classes={this.props.classes}
                  hour={hour}
                  duration={duration}
                  firstDay={firstDay}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    item: state.note.currentItem,
  })
}

const mapDispatchToProps = {}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemSchedule))
