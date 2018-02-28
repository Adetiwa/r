import { combineReducers } from 'redux';
import Login from './Login';
import Map from './Map';

export default combineReducers({

  auth: Login,
  map: Map,

});
