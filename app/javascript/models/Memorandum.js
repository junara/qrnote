import {Record} from "immutable";
import {Setting} from "../modules";

export const MAX_DESCRIPTION_LENGTH = 1000

export const validate = (value) => {
  const error = []
  if (!!value && value.length > MAX_DESCRIPTION_LENGTH) error.push(`Length of this field is maximum ${MAX_DESCRIPTION_LENGTH} character`);
  return error
}

const _Memorandum = Record({
  token: '',
  createdAt: new Date(),
  updatedtAt: new Date(),
  description: '',
  itemToken: '',
})

class Memorandum extends _Memorandum {
  constructor(props) {
    super(props)
  }

  params = () => {
    return (
      {
        token: this.token,
        description: this.description,
        name: this.name,
        item_token: this.itemToken || this.item_token,
      }
    )
  }
}

export class MemorandumFromApi extends _Memorandum {
  constructor(api) {
    super({
      token: api.token,
      createdAt: api.created_at,
      updatedtAt: api.updated_at,
      description: api.description,
      itemToken: api.item_token,
    })
  }
}

export default Memorandum
