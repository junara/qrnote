import {call, put, takeLatest} from 'redux-saga/effects'
import * as Api from '../modules/Api'
import {
  CREATE_LIVE_DEMO,
} from '../reducers/liveDemo'
import 'babel-polyfill'
import {startFetching, stopFetching} from "../reducers/note";
import {systemError} from "../reducers/app";

export function* createLiveDemoFlow(action) {
  yield put(startFetching())
  const params = {
    name: action.payload.name,
    flag_demo: action.payload.flagDemo,
  }
  const response = yield call(Api.createItem, params)
  if (response.data.status === Api.REQUEST_SUCCESS) {
    const itemToken = response.data.result.token
    action.payload.callback(itemToken);
    yield put(stopFetching())
  } else {
    yield put(systemError({status: 'error', message: 'create error'}))
    yield put(stopFetching())
  }
}

const liveDemoSagas = [
  takeLatest(CREATE_LIVE_DEMO, createLiveDemoFlow),
]

export default liveDemoSagas;