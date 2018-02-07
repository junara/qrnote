import {Record} from "immutable";

const _User = Record({
  name: '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

class User extends _User {
  constructor(props) {
    super(props)
  }
}

export class UserFromApi extends _User {
  constructor(api) {
    super({
      name: api.name,
      createdAt: api.created_at,
      updatedAt: api.updated_at,

    })
  }
}

export default User
