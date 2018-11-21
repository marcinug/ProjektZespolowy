import { MESSAGE_RECEIVED, POSTS_RECEIVED } from './MainPageActions';

const initialState = {
  helloMessage: 'hello',
  posts: [],
};

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        helloMessage: action.message,
      };
    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
}

export default mainPageReducer;
