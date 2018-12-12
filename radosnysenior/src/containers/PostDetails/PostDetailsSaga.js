import { put, call, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_POST, postReceived } from './PostDetailsActions';
import { makeSelectCurrentPostId } from './PostDetailsSelectors';

function* postDetailsWorkerSaga() {
  try {
    const currPostId = yield select(makeSelectCurrentPostId());
    const API_URL = '.././mock_api.json';
    const fetchPost = () => axios.get(API_URL);
    const res = yield call(fetchPost);
    const { data } = res;
    yield put(postReceived(data.posts[currPostId - 1]));
  } catch (err) {
    yield put(postReceived('ERROR WHILE FETCHING POSTS'));
  }
}

export default function* PostDetailsSaga() {
  yield takeLatest(FETCH_POST, postDetailsWorkerSaga);
}
