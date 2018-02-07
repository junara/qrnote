import {call, put, takeLatest} from 'redux-saga/effects'
import * as Api from '../modules/Api'
import {
  CREATE_ITEM,
  CREATE_RESERVATION,
  DELETE_RESERVATION,
  ATTEMPT_FETCH_ITEM,
  PUT_ITEM,
  DELETE_ITEM,
  ATTEMPT_UPDATE_MEMORANDUM,
  setCurrentItem,
  setCurrentReservations,
  setCurrentUsers,
  setCurrentMemorandum,
  attemptFetchItem,
  showSnackbar,
  startFetching,
  stopFetching,
  closeReservationEditModal,
} from '../reducers/note'
import {
  systemError,
} from '../reducers/app'
import 'babel-polyfill' // ジェネレータ関数を使うために必須
import Reservation from "../models/Reservation";
import Memorandum from "../models/Memorandum";

export function* createItemFlow(action) {
  yield put(startFetching())
  const params = {
    name: action.payload.name
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

export function* putItemFlow(action) {
  yield put(startFetching())
  const params = {
    ...action.payload.data
  }
  if (params) {
    const response = yield call(Api.putItem, params)
    if (response.data.status === Api.REQUEST_SUCCESS) {
      const itemToken = response.data.result.token
      yield put(attemptFetchItem(itemToken))
      yield put(stopFetching())
    } else {
      yield put(systemError({status: 'error', message: 'create error'}))
      yield put(stopFetching())
    }
  }
}

export function* attemptFetchItemFlow(action) {
  const params = {
    item_token: action.payload
  }

  if (params.item_token) {
    const response = yield call(Api.getItem, params.item_token)
    if (response.data.status === Api.REQUEST_SUCCESS) {
      yield put(setCurrentItem(response.data.result.item))
      yield put(setCurrentReservations(response.data.result.reservations))
      yield put(setCurrentUsers(response.data.result.users))
      yield put(setCurrentMemorandum(response.data.result.memorandum))
    } else {
      yield put(systemError({status: response.data.status, message: response.data.message}))
      yield put(stopFetching())
    }
  }
}

export function* createReservationFlow(action) {
  yield put(startFetching())
  const reservation = new Reservation(action.payload)
  if (reservation.get('name')) {
    const response = yield call(Api.createReservation, reservation.params())
    yield put(attemptFetchItem(response.data.result.item_token))
    yield put(stopFetching())
    yield put(showSnackbar(`${response.data.result.name}さんの処理が完了しました`))
  } else {
    yield put(systemError({status: 'error', message: 'create error'}))
    yield put(stopFetching())
  }
}

export function* attemptUpdateMemorandumFlow(action) {
  yield put(startFetching())
  const memorandum = new Memorandum(action.payload)

  let response = {}
  if (memorandum.get('token')) {
    response = yield call(Api.putMemorandum, memorandum.params())
  } else {
    response = yield call(Api.createMemorandum, memorandum.params())
  }

  if (response.data.status === Api.REQUEST_SUCCESS) {
    yield put(setCurrentMemorandum(response.data.result))
    yield put(stopFetching())
    yield put(showSnackbar(`メモを更新しました`))
  } else {
    yield put(systemError({status: 'error', message: 'create error'}))
    yield put(stopFetching())
  }
}

export function* deleteReservationFlow(action) {
  yield put(startFetching())
  const response = yield call(Api.deleteReservation, action.payload)
  if (response.data.status === Api.REQUEST_SUCCESS) {
    yield call(attemptFetchItemFlow, {payload: response.data.result.item_token})
    yield put(closeReservationEditModal())
    yield put(showSnackbar(`${response.data.result.name}さんの予約が削除されました`))
  }
  yield put(stopFetching())
}

export function* deleteItemFlow(action) {
  yield put(startFetching())
  const response = yield call(Api.deleteItem, action.payload.token)
  if (response.data.status === Api.REQUEST_SUCCESS) {
    yield put(showSnackbar(` ${response.data.result.name} の予約表は削除されました`))
  }
  yield put(stopFetching())
}

const noteSagas = [
  takeLatest(CREATE_ITEM, createItemFlow),
  takeLatest(PUT_ITEM, putItemFlow),
  takeLatest(DELETE_ITEM, deleteItemFlow),
  takeLatest(CREATE_RESERVATION, createReservationFlow),
  takeLatest(DELETE_RESERVATION, deleteReservationFlow),
  takeLatest(ATTEMPT_FETCH_ITEM, attemptFetchItemFlow),
  takeLatest(ATTEMPT_UPDATE_MEMORANDUM, attemptUpdateMemorandumFlow),
]

export default noteSagas;