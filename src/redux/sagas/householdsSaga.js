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

function* changeHousehold (action) {
  console.log('in changeHousehold', action.payload);
  try {
    yield axios.put(`/user-households`, action.payload);
    yield put({type: 'FETCH_HOUSEHOLDS'})
  } catch(err) {
    console.log('error changing households in changeHousehold', err);
  }
}



function* householdsSaga() {
  yield takeLatest('FETCH_HOUSEHOLDS', getUsersHouseholds);
  yield takeLatest('CHANGE_HOUSEHOLD', changeHousehold);
}

export default householdsSaga;
