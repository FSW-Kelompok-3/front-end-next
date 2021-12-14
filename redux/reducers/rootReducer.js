import {combineReducers} from 'redux';

import authReducer from './authReducer';
import buttonReducer from './buttonReducer';

const rootReducer = combineReducers({
  authReducer,
  buttonReducer
});

export default rootReducer;
