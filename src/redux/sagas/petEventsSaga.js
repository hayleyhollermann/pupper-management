import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getPetEvents (action) {
  console.log('in getPetEvents');
  try {
    const eventsResponse = yield axios.get(`/pets/events/${action.payload}`);
    console.log('eventsResponse.data:', eventsResponse.data);

    yield put({type: 'SET_EVENTS', payload: eventsResponse.data})
  } catch(err) {
      console.log('error fetching events in eventsResponse', err);
  }
}

function* petEventsSaga() {
  yield takeEvery('FETCH_EVENTS', getPetEvents)
}

export default petEventsSaga;