import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* getPetInfo (action) {
  console.log('in getPetInfo');
try {
  const petInfoResponse = yield axios.get(`/pets/petInfo/${action.payload}`);
  console.log('response in getPetInfo', petInfoResponse.data);
  // yield put({type: 'SET_PET', payload: petInfoResponse.data})
  } catch(err) {
    console.log('error fetching info on this pet in getPetInfo', err);
  }
}



function* petsInHouseholdsSaga() {
  yield takeLatest('FETCH_PETS', getPets)
  yield takeLatest('FETCH_PET', getPetInfo)
}

export default petsInHouseholdsSaga;