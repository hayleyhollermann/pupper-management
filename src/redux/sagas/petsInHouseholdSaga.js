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



function* petsInHouseholdsSaga() {
  yield takeLatest('FETCH_PETS', getPets)
}

export default petsInHouseholdsSaga;