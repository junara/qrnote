import {Record} from "immutable";
import {Setting} from "../modules";

export const MAX_NAME_LENGTH = 20
export const GUEST_EXPIRATION_DATE_AGO = Setting.item.guestExpirationDateAgo

export const validate = (value) => {
  const error = []
  if (!value) error.push('This field is required');
  if (!!value && value.length > 20) error.push('Length of this field is maximum 50 character');
  return error
}

const _Reservation = Record({
  token: '',
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  item_token: '',
  itemToken: '',
})

class Reservation extends _Reservation {
  constructor(props) {
    super(props)
  }

  params = () => {
    return (
      {
        name: this.name,
        start_dt: this.startDate,
        end_dt: this.endDate,
        item_token: this.itemToken || this.item_token,
      }
    )
  }
}

export class ReservationFromApi extends _Reservation {
  constructor(api) {
    super({
      token: api.token,
      name: api.name,
      startDate: api.start_dt,
      endDate: api.end_dt,
      item_token: api.item_token,
      itemToken: api.item_token,
    })
  }
}

export default Reservation
