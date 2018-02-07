import {Record, Map, List} from 'immutable'
import Item from './Item'
import Reservation from './Reservation'
import Memorandum from "./Memorandum";

const _Modal = Map({
  itemCreationModalOpen: false,
  reservationCreationModalOpen: false,
  reservationEditModalOpen: false,
})

const _Note = Record({
  draftItem: new Item(),
  draftReservation: new Reservation(),
  currentReservation: new Reservation(),
  currentItem: new Item(),
  currentReservations: new List(),
  currentUsers: new List(),
  currentMemorandum: new Memorandum(),
  modal: _Modal,
  snackbarOpen: false,
  snackbarMessage: '',
  fetching: false,
})

export default class Note extends _Note {
}