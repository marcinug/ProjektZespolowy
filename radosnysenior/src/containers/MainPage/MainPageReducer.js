import { MESSAGE_RECEIVED } from './MainPageActions';

const initialState = {
  helloMessage: 'hello',
};

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        helloMessage: action.message,
      };
    default:
      return state;
  }
}

export default mainPageReducer;
