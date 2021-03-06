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
  console.log('in getPetInfo', action.payload);
  try {
    const petInfoResponse = yield axios.get(`/pets/petInfo/${action.payload}`);
    console.log('response in getPetInfo', petInfoResponse.data);
    yield put({type: 'SET_PET', payload: petInfoResponse.data})
  } catch(err) {
    console.log('error fetching info on this pet in getPetInfo', err);
  }
}
// gets all medications for a pet
function* getPetMeds (action) {
  console.log('in getPetMeds', action.payload);
  try {
    const petInfoResponse = yield axios.get(`/pets/petInfo/meds/${action.payload}`);
    console.log('response in getPetInfo', petInfoResponse.data);
    yield put({type: 'SET_MEDS', payload: petInfoResponse.data})
  } catch(err) {
    console.log('error fetching info on this pet in getPetInfo', err);
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
// adds new medication for a pet
function* addNewMed (action) {
  console.log('in addNewMed Saga', action.payload);
  try {
    yield axios.post(`/pets/petInfo/meds`, action.payload)
    yield put({type: 'FETCH_MEDS', payload: action.payload.petId})
  } catch(err) {
    console.log('error adding med for pet', err);
  }
}
// Upodates info for a pet
function* editPetInfo (action) {
  console.log('in editPetInfo Saga', action.payload);
  try {
    yield axios.put(`/pets/petInfo`, action.payload)
    yield put({type: 'FETCH_PET', payload: action.payload.petId})
  } catch(err) {
    console.log('error editing pet info', err);
  }
}

function* deletePetMed (action) {
  console.log('in editPetInfo Saga', action.payload);
  try {
    yield axios.delete(`/pets/petInfo/meds/${action.payload.medId}`)
    yield put({type: 'FETCH_MEDS', payload: action.payload.petId})
  } catch(err) {
    console.log('error editing pet info', err);
  }
}


function* petsInHouseholdsSaga() {
  yield takeLatest('FETCH_PETS', getPets)
  yield takeLatest('FETCH_PET', getPetInfo)
  yield takeLatest('ADD_PET', addNewPet)
  yield takeLatest('FETCH_HH_EVENTS', allRecentEvents)
  yield takeLatest('FETCH_MEDS', getPetMeds)
  yield takeLatest('ADD_MED', addNewMed)
  yield takeLatest('EDIT_INFO', editPetInfo)
  yield takeLatest('DELETE_MED', deletePetMed)
}

export default petsInHouseholdsSaga;