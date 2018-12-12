import { combineReducers } from 'redux';
import mainPageReducer from '../containers/MainPage/MainPageReducer';
import postDetailsReducer from '../containers/PostDetails/PostDetailsReducer';

const reducers = combineReducers({
  mainPageReducer,
  postDetailsReducer,
});

export default reducers;
