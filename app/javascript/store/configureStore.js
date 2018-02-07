import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

// Saga を起動する

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)
  return store
};

export default configureStore
