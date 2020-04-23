import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import * as mutations from './mutation';
import thunk from 'redux-thunk';

import errorReducer from '../reducers/errorReucer';
import authReducer from '../reducers/authReducer';

export default combineReducers({
    task: taskReducer,
    error: errorReducer,
    auth: authReducer,
})


export const store = createStore(
    (state = {}) => state,
    applyMiddleware(createLogger(), thunk)
);

