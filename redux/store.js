import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import authReducer from './reducers/authReducer';

// const store = createStore(rootReducer);
const store = createStore(authReducer, applyMiddleware(thunk));

export default store;


