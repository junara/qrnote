export const reservationCalendarPath = (token) => {
  return (`/reservations/${token}/calendar`)
}

const Path = {
  root: '/',
  item: (itemToken) => `/items/${itemToken}`,
  reservationCalendar: (reservationToken) => `/reservations/${reservationToken}/calendar`,
  itemCalendar: (itemToken) => `/items/${itemToken}/calendar`,
  newItem: (itemToken) => `/new_items/${itemToken}`,
  itemQrCode: (itemToken) => `/items/${itemToken}/qrcode`
}

export default Path