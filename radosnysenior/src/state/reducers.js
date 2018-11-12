import { combineReducers } from 'redux';
import exampleReducer from '../containers/example/reducer';

const reducers = combineReducers({
  exampleReducer,
});

export default reducers;
