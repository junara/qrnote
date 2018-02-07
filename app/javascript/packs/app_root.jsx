import React from 'react'
import ReactDOM from 'react-dom'
import App from '../containers/App'
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app_root'),
  )
});
