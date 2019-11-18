import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUsersHouseholds () {
  console.log('in getUsersHouseholds');
  try {
    const householdsResponse = yield axios.get('/user-households');
    console.log(householdsResponse.data);
    
    yield put({type: 'SET_HOUSEHOLDS', payload: householdsResponse.data})
  } catch(err) {
      console.log('error fetching households in householdsResponse', err);
  }
}



function* householdsSaga() {
  yield takeLatest('FETCH_HOUSEHOLDS', getUsersHouseholds);
}

export default householdsSaga;
