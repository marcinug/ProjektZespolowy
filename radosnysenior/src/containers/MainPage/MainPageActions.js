export const MESSAGE_RECEIVED = 'app/example/MESSAGE_RECEIVED';
export const FETCH_MESSAGE = 'app/example/FETCH_MESSAGE';
export const FETCH_POSTS = 'app/main/FETCH_POSTS';
export const POSTS_RECEIVED = 'app/main/FETCH_MESSAGE';

export const fetchMessage = () => ({
  type: FETCH_MESSAGE,
});

export const messageReceived = message => ({
  type: MESSAGE_RECEIVED,
  message,
});

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts,
});
