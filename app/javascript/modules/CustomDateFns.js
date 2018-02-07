import {
  setSeconds,
  setMinutes,
  setHours,
  addDays,
  differenceInMinutes,
  isBefore,
  addMinutes,
  startOfDay,
  endOfDay,
  subDays,
  isWithinRange,
  format,
  areRangesOverlapping,
  getMinutes,
  eachDay,
  startOfHour,
} from 'date-fns'

export const resetDate = (date = new Date(), opts = {second: 0, minute: 0, hour: 0}) => {
  const {second, minute, hour} = opts
  date = setSeconds(date, second);
  date = setMinutes(date, minute);
  date = setHours(date, hour);
  return (date)
}

export const durationCount = ({duration = 60, startDate, endDate = addDays(startDate, 1)}) => {
  return (
    Math.ceil(differenceInMinutes(endDate, startDate) / duration)
  )
}

export const dateArray = ({duration = 15, startDate = new Date(), endDate = addDays(startDate, 1)}) => {
  let array = []
  for (let d = startDate; isBefore(d, endDate); d = addMinutes(d, duration)) {
    array.push(d)
  }
  return (array)
}

export const ONE_DAY_MINUTE = 60 * 24

export const daysForHeader = (relativeStartDay = -1, relativeEndDay = 3) => {
  const currentDate = new Date()
  const startDate = startOfDay(addDays(currentDate, relativeStartDay))
  const endDate = endOfDay(addDays(currentDate, relativeEndDay))
  const activeStartDate = startOfDay(currentDate)
  const activeEndDate = subDays(endDate, 1)
  const disabled = (date) => {
    return !isWithinRange(date, activeStartDate, activeEndDate);
  }

  return (
    eachDay(startDate, endDate).map((d) => {
      return ({
        day: format(d, 'DD'),
        disabled: disabled(d),
        badgeContent: format(d, 'dd'),
        week: format(d, 'dd'),
        date: d,
        month: format(d, 'M'),
      })
    })
  )
}

export const filterReservations = (reservations, startDate, endDate) => {
  let tempReservations = []
  reservations.forEach((reservation, index) => {
    if (areRangesOverlapping(reservation.get('startDate'), reservation.get('endDate'), startDate, endDate)) {
      tempReservations.push(reservation)
    }
  })
  return tempReservations
}

export const currentStartDate = (duration = 15) => {
  const date = new Date()
  const min = getMinutes(date)
  const latestMin = (min - (min % duration))
  return (
    addMinutes(startOfHour(date), latestMin)
  )
}