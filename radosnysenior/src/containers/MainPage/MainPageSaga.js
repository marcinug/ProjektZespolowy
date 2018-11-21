import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_POSTS, postsReceived } from './MainPageActions';

const API_URL = './mock_api.json';

function* mainPageWorkerSaga() {
  try {
    const fetchPosts = () => axios.get(API_URL);
    const res = yield call(fetchPosts);
    const { data } = res;
    yield put(postsReceived(data.posts));
  } catch (err) {
    yield put(postsReceived('ERROR WHILE FETCHING POSTS'));
  }
}

export default function* MainPageSaga() {
  yield takeLatest(FETCH_POSTS, mainPageWorkerSaga);
}
