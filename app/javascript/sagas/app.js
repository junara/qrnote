import {call, put, takeLatest} from 'redux-saga/effects'
import * as Api from '../modules/Api'
import {
  SYSTEM_ERROR,
  systemError,
} from '../reducers/app'
import 'babel-polyfill' // ジェネレータ関数を使うために必須


const appSagas = [
]

export default appSagas;