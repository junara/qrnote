import {Record} from 'immutable'
import {Setting} from '../modules'

export const MAX_NAME_LENGTH = 50
export const GUEST_EXPIRATION_DATE_AGO = Setting.item.guestExpirationDateAgo

export const validate = (value) => {
  const error = []
  if (!value) error.push('This field is required');
  if (!!value && value.length > MAX_NAME_LENGTH) error.push(`Length of this field is maximum ${MAX_NAME_LENGTH} character`);
  return error
}

const _Item = Record({
  token: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  duration: 30,
  isDemo: null,
  startHour: 8,
  endHour: 20,
  reservationCount: 0,
  userCount: 0,
  expirationDate: '',
})

class Item extends _Item {
  constructor() {
    super()
  }
}

export class ItemFromApi extends _Item {
  constructor(api) {
    super({
      token: api.token,
      name: api.name,
      createdAt: api.created_at,
      expirationDate: api.expiration_dt,
      updatedAt: api.updated_at,
      duration: api.duration,
      isDemo: api.is_demo,
      startHour: api.start_hour,
      endHour: api.end_hour,
      reservationCount: api.reservation_count,
      userCount: api.user_count,
    })
  }
}

export default Item