import { combineReducers } from 'redux';
import getImgsReducer from './getImgsReducer';

export default combineReducers({
    images: getImgsReducer
});