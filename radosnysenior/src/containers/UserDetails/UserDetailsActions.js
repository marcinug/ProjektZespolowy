export const FETCH_POST = 'POST_DETAILS/FETCH_POSTS';
export const POST_RECEIVED = 'POST_DETAILS/FETCH_MESSAGE';
export const GET_POST_ID = 'POST_DETAILS/GET_POST_ID';

export const getCurrentId = id => ({
  type: GET_POST_ID,
  id,
});

export const fetchPost = () => ({
  type: FETCH_POST,
});

export const postReceived = post => ({
  type: POST_RECEIVED,
  post,
});
