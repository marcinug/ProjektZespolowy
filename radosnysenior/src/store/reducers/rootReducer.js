import authReducer from './authReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'
import mainPageReducer from '../../containers/MainPage/MainPageReducer' 
import postDetailsReducer from '../../containers/PostDetails/PostDetailsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  mainPageReducer,
  postDetailsReducer,
});

export default rootReducer