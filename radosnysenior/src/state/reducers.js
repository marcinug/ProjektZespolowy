import { combineReducers } from 'redux';
import mainPageReducer from '../containers/MainPage/MainPageReducer';

const reducers = combineReducers({
  mainPageReducer,
});

export default reducers;
