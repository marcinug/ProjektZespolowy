import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MESSAGE, messageReceived } from './MainPageActions';

const API_URL = './mock_api.json';

function* mainPageWorkerSaga() {
  try {
    const fetchMessage = () => axios.get(API_URL);
    const res = yield call(fetchMessage);
    const { data } = res;
    yield put(messageReceived(data.message));
  } catch (err) {
    yield put(messageReceived('ERROR WHILE FETCHING MESSAGE'));
  }
}

export default function* MainPageSaga() {
  yield takeLatest(FETCH_MESSAGE, mainPageWorkerSaga);
}
