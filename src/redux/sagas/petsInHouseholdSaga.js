import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all pets for selected household
function* getPets () {
  console.log('in getPets');
  try {
    const petsResponse = yield axios.get('/pets');
    console.log(petsResponse.data);
    yield put({type: 'SET_PETS', payload: petsResponse.data})
  } catch(err) {
      console.log('error fetching pets in petsResponse', err);
  }
}
// gets all info on selected pet 
function* getPetInfo (action) {
  console.log('in getPetInfo');
  try {
    const petInfoResponse = yield axios.get(`/pets/petInfo/${action.payload}`);
    console.log('response in getPetInfo', petInfoResponse.data);
    yield put({type: 'SET_PET', payload: petInfoResponse.data})
  } catch(err) {
    console.log('error fetching info on this pet in getPetInfo', err);
  }
}
// adds a new pet to selected household
function* addNewPet (action) {
  console.log('in addNewPet Saga', action.payload);
  try {
    yield axios.post('/pets', action.payload)
    yield put({type: 'GET_PETS'})
  } catch(err) {
    console.log('error adding pets to household', err);
  }
}
// gets all recent events for all pets in a household
function* allRecentEvents () {
  console.log('in /hh-events');
  try {
    const allRecentResponse = yield axios.get('/pets/hh-events')
    yield put({type: 'GET_HH_PETS', payload: allRecentResponse.data})
  } catch(err) {
    console.log('error getting recent events for all pets in household', err);
  }
}

function* petsInHouseholdsSaga() {
  yield takeLatest('FETCH_PETS', getPets)
  yield takeLatest('FETCH_PET', getPetInfo)
  yield takeLatest('ADD_PET', addNewPet)
  yield takeLatest('FETCH_HH_EVENTS', allRecentEvents)
}

export default petsInHouseholdsSaga;