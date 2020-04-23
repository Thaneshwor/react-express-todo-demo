import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import errorReducer from '../reducers/errorReucer';
import authReducer from '../reducers/authReducer';

export default combineReducers({
    task: taskReducer,
    error: errorReducer,
    auth: authReducer,

})
