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

function* addPetEvent (action) {
  console.log('in addPetEvent', action.payload);
  try {
    yield axios.post(`/pets/events/${action.payload.petId}`, action.payload)
    yield put({type: 'FETCH_EVENTS', payload: action.payload.petId})
  } catch (err) {
    console.log('error adding event in addPetEvent Saga', err);
  }
}

// function* addMedEvent (action) {
//   console.log('in addMedEvent', action.payload);
//   try {
//     yield axios.post(`/pets/events/meds/${action.payload.petId}`, action.payload)
//     // yield put({type: 'FETCH_EVENTS', payload: action.payload.petId})
//   } catch (err) {
//     console.log('error adding event in addPetEvent Saga', err);
//   }
// }

function* petEventsSaga() {
  yield takeEvery('FETCH_EVENTS', getPetEvents)
  yield takeEvery('ADD_EVENT', addPetEvent)
  // yield takeEvery('ADD_MED_EVENT', addMedEvent)

}

export default petEventsSaga;