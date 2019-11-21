import { combineReducers } from 'redux';

// stores all recent events for selected pet 
const petEvents = (state=[], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            console.log('in petEvents reducer');
            return action.payload;
        default:
            return state;
    }
};
// stores all recent events for all pets in selected household
const householdPetsEvents = (state=[], action) => {
    switch (action.type) {
        case 'GET_HH_PETS':
            console.log('in householdPetsEvents reducer');
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    petEvents,
    householdPetsEvents
});
