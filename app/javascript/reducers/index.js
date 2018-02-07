import {combineReducers} from 'redux';
import app from './app'
import note from './note'
import liveDemo from './liveDemo'

export default combineReducers({
  app,
  note,
  liveDemo,
});
