import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const usersHouseholds = (state=[], action) => {
    switch (action.type) {
        case 'SET_HOUSEHOLDS':
            return action.payload;
        default:
            return state;
    }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  usersHouseholds,
});
