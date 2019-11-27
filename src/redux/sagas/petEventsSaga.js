import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// gets most recent time for each event for selected pet
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
// adds event for selected pet
function* addPetEvent (action) {
  console.log('in addPetEvent', action.payload);
  try {
    yield axios.post(`/pets/events/${action.payload.petId}`, action.payload)
    yield put({type: 'FETCH_EVENTS', payload: action.payload.petId})
  } catch (err) {
    console.log('error adding event in addPetEvent Saga', err);
  }
}
// gets 5 most recent times for specific event for selected dog
function* getEventTimes (action) {
  console.log('in getEventTimes', action.payload);
  try {
    const eventTimesResponse = yield axios.get(`/pets/events-one-type`, {
        params: {
          petId: action.payload.petId,
          eventType: action.payload.eventType
        }
    })
    yield put({type: 'SET_ALL_TIMES', payload: eventTimesResponse.data})
  } catch (err) {
    console.log('error adding event in getEventTimes Saga', err);
  }
}

function* petEventsSaga() {
  yield takeEvery('FETCH_EVENTS', getPetEvents)
  yield takeEvery('ADD_EVENT', addPetEvent)
  yield takeEvery('FETCH_ALL_TIMES', getEventTimes)
}

export default petEventsSaga;