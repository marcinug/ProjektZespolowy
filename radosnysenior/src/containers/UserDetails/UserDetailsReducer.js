import { FETCH_POST, GET_POST_ID, POST_RECEIVED } from './PostDetailsActions';

const initialState = {
  postId: null,
  post: {},
  loading: false,
};

function postDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ID:
      return {
        ...state,
        postId: action.id,
      };
    case FETCH_POST:
      return {
        ...state,
        loading: true,
      };
    case POST_RECEIVED:
      return {
        ...state,
        post: action.post,
        loading: false,
      };
    default:
      return state;
  }
}

export default postDetailsReducer;
