import {all} from 'redux-saga/effects'
import 'babel-polyfill' // ジェネレータ関数を使うために必須
import noteSagas from './note'
import appSagas from './app'
import liveDemoSagas from './liveDemo'

export default function* rootSaga() {
  yield all([
    ...noteSagas,
    ...appSagas,
    ...liveDemoSagas,
  ])
}