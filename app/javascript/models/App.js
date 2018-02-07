import {Record, Map} from 'immutable'

const _Error = {
  status: '',
  message: '',
}

const _App = Record({
  error: new Map(_Error),
})

export default class App extends _App {
}