import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// runs axios request to server to get all households that user is in 
function* getUsersHouseholds () {
  console.log('in getUsersHouseholds saga');
  try {
    const householdsResponse = yield axios.get('/user-households');
    console.log(householdsResponse.data);
    
    yield put({type: 'SET_HOUSEHOLDS', payload: householdsResponse.data})
  } catch(err) {
      console.log('error fetching households in householdsResponse', err);
  }
}
// changes selected household id for user
function* changeHousehold (action) {
  console.log('in changeHousehold saga', action.payload);
  try {
    yield axios.put(`/user-households`, action.payload);
    yield put({type: 'FETCH_HOUSEHOLDS'})
  } catch(err) {
    console.log('error changing households in changeHousehold saga', err);
  }
}

function* createHousehold (action) {
  console.log('in createHousehold saga', action.payload);
  try {
    yield axios.post(`/user-households`, action.payload);
    yield put({type: 'FETCH_HOUSEHOLDS'})
  } catch(err) {
    console.log('error ccreating households in createHousehold saga', err);
  }
}

function* householdsSaga() {
  yield takeLatest('FETCH_HOUSEHOLDS', getUsersHouseholds);
  yield takeLatest('CHANGE_HOUSEHOLD', changeHousehold);
  yield takeLatest('NEW_HOUSEHOLD', createHousehold);
}

export default householdsSaga;
