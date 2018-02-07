import Note from '../models/Note'
import {ItemFromApi} from '../models/Item'
import Reservation, {ReservationFromApi} from '../models/Reservation'
import {UserFromApi} from '../models/User'
import {MemorandumFromApi} from '../models/Memorandum'
import {List} from 'immutable'

export const SHOW_ITEM_CREATION_MODAL = 'SHOW_ITEM_CREATION_MODAL';
export const CLOSE_ITEM_CREATION_MODAL = 'CLOSE_ITEM_CREATION_MODAL';
export const SHOW_RESERVATION_CREATION_MODAL = 'SHOW_RESERVATION_CREATION_MODAL';
export const CLOSE_RESERVATION_CREATION_MODAL = 'CLOSE_RESERVATION_CREATION_MODAL';
export const SHOW_RESERVATION_EDIT_MODAL = 'SHOW_RESERVATION_EDIT_MODAL';
export const CLOSE_RESERVATION_EDIT_MODAL = 'CLOSE_RESERVATION_EDIT_MODAL';
export const CREATE_ITEM = 'CREATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const PUT_ITEM = 'PUT_ITEM';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const RESET_ITEMS = 'RESET_ITEMS';
export const ATTEMPT_FETCH_ITEM = 'ATTEMPT_FETCH_ITEM';
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const SET_CURRENT_RESERVATIONS = 'SET_CURRENT_RESERVATIONS';
export const SET_CURRENT_RESERVATION = 'SET_CURRENT_RESERVATION';
export const SET_CURRENT_USERS = 'SET_CURRENT_USERS';
export const SET_CURRENT_MEMORANDUM = 'SET_CURRENT_MEMORANDUM';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const START_FETCHING = 'START_FETCHING'
export const STOP_FETCHING = 'STOP_FETCHING'
export const RESET_NOTE = 'RESET_NOTE'
export const CREATE_MEMORANDUM = 'CREATE_MEMORANDUM'
export const ATTEMPT_UPDATE_MEMORANDUM = 'ATTEMPT_UPDATE_MEMORANDUM'

export const resetNote = () => {
  return {
    type: RESET_NOTE,
  }
}
export const showItemCreationModal = () => {
  return {
    type: SHOW_ITEM_CREATION_MODAL,
  }
};

export const closeItemCreationModal = () => {
  return {
    type: CLOSE_ITEM_CREATION_MODAL,
  }
};

export const showReservationCreationModal = (payload) => {
  return {
    type: SHOW_RESERVATION_CREATION_MODAL,
    payload: payload
  }
};

export const closeReservationCreationModal = () => {
  return {
    type: CLOSE_RESERVATION_CREATION_MODAL,
  }
};

export const showReservationEditModal = (payload) => {
  return {
    type: SHOW_RESERVATION_EDIT_MODAL,
    payload: payload
  }
};

export const closeReservationEditModal = () => {
  return {
    type: CLOSE_RESERVATION_EDIT_MODAL,
  }
};

export const createItem = ({name, callback}) => {
  return {
    type: CREATE_ITEM,
    payload: {name: name, callback: callback}
  }
};

export const putItem = (data, callback) => {
  return {
    type: PUT_ITEM,
    payload: {data: data, callback: callback}
  }
};

export const createReservation = (payload) => {
  return {
    type: CREATE_RESERVATION,
    payload: payload
  }
};

export const attemptUpdateMemorandum = (payload) => {
  return {
    type: ATTEMPT_UPDATE_MEMORANDUM,
    payload: payload,
  }
};

export const deleteReservation = (payload) => {
  return {
    type: DELETE_RESERVATION,
    payload: {
      item_token: payload.get('item_token'),
      token: payload.get('token'),
    }
  }
};

export const deleteItem = (payload) => {
  return {
    type: DELETE_ITEM,
    payload: {
      token: payload.token,
    }
  }
};

export const attemptFetchItem = (item_token) => {
  return {
    type: ATTEMPT_FETCH_ITEM,
    payload: item_token
  }
}

export const setCurrentItem = (item) => {
  return {
    type: SET_CURRENT_ITEM,
    payload: item
  }
}

export const setCurrentReservations = (reservations) => {
  return {
    type: SET_CURRENT_RESERVATIONS,
    payload: reservations
  }
}

export const setCurrentReservation = (reservation) => {
  return {
    type: SET_CURRENT_RESERVATION,
    payload: reservation
  }
}

export const setCurrentUsers = (users) => {
  return {
    type: SET_CURRENT_USERS,
    payload: users
  }
}

export const showSnackbar = (snackbarMessage) => {
  return {
    type: SHOW_SNACKBAR,
    payload: snackbarMessage
  }
}

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  }
}

export const startFetching = () => {
  return {
    type: START_FETCHING,
  }
}

export const stopFetching = () => {
  return {
    type: STOP_FETCHING,
  }
}

export const setCurrentMemorandum = (memorandum) => {
  return {
    type: SET_CURRENT_MEMORANDUM,
    payload: memorandum
  }
}

export default (state = new Note(), action) => {
  switch (action.type) {
    case SHOW_ITEM_CREATION_MODAL: {
      return state.setIn(['modal', 'itemCreationModalOpen'], true)
    }
    case CLOSE_ITEM_CREATION_MODAL: {
      return state.setIn(['modal', 'itemCreationModalOpen'], false)
    }
    case SHOW_RESERVATION_CREATION_MODAL: {
      return state.withMutations(s => s.setIn(['modal', 'reservationCreationModalOpen'], true).setIn(['draftReservation'], new Reservation(action.payload)))
    }
    case CLOSE_RESERVATION_CREATION_MODAL: {
      return state.setIn(['modal', 'reservationCreationModalOpen'], false)
    }
    case SHOW_RESERVATION_EDIT_MODAL: {
      return state.withMutations(s => s.setIn(['modal', 'reservationEditModalOpen'], true).setIn(['currentReservation'], action.payload))
    }
    case CLOSE_RESERVATION_EDIT_MODAL: {
      return state.setIn(['modal', 'reservationEditModalOpen'], false)
    }
    case SHOW_SNACKBAR: {
      return state.withMutations(s => s.setIn(['snackbarOpen'], true).setIn(['snackbarMessage'], action.payload))
    }
    case CLOSE_SNACKBAR: {
      return state.setIn(['snackbarOpen'], false)
    }
    case CREATE_RESERVATION: {
      return state.setIn(['draftReservation'], new Reservation(action.payload))
    }
    case SET_CURRENT_ITEM: {
      return state.setIn(['currentItem'], new ItemFromApi(action.payload))
    }
    case SET_CURRENT_RESERVATIONS: {
      return state.setIn(['currentReservations'], List(action.payload.map((reservation) => new ReservationFromApi(reservation))))
    }
    case SET_CURRENT_RESERVATION: {
      return state.withMutations(s => s.setIn(['currentReservation'], action.payload))
    }
    case SET_CURRENT_USERS: {
      return state.setIn(['currentUsers'], List(action.payload.map((user) => new UserFromApi(user))))
    }
    case SET_CURRENT_MEMORANDUM: {
      return state.setIn(['currentMemorandum'], new MemorandumFromApi(action.payload))
    }
    case RESET_ITEMS: {
      return state.set('draftItem', (new Note()).get('draftItem'))
    }
    case START_FETCHING: {
      return state.setIn(['fetching'], true)
    }
    case STOP_FETCHING: {
      return state.setIn(['fetching'], false)
    }
    case RESET_NOTE: {
      return new Note()
    }
    default: {
      return state;
    }
  }
}
