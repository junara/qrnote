import App from '../models/App'
import {fromJS} from 'immutable'

export const SYSTEM_ERROR = 'SYSTEM_ERROR'
export const RESET_ERROR = 'RESET_ERROR'

export const systemError = (payload) => {
  return {
    type: SYSTEM_ERROR,
    payload: {
      status: payload.status,
      message: payload.message,
    }
  }
};

export const resetError = (payload) => {
  return {
    type: RESET_ERROR,
    payload: {}
  }
};

export default (state = new App(), action) => {
  switch (action.type) {
    case SYSTEM_ERROR: {
      return state.withMutations(s => s.setIn(['error', 'status'], action.payload.status).setIn(['error', 'message'], action.payload.message))
    }
    case RESET_ERROR: {
      return state.withMutations(s => s.setIn(['error', 'status'], null).setIn(['error', 'message'], null))
    }
    default: {
      return state;
    }
  }
}
