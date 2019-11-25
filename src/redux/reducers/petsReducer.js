import { combineReducers } from 'redux';

const pets = (state=[], action) => {
    switch (action.type) {
        case 'SET_PETS':
            console.log('in pets reducer');
            return action.payload;
        default:
            return state;
    }
};

const petInfo = (state={}, action) => {    
    switch (action.type) {
        case 'SET_PET':
            console.log('in pet Info reducer', action.payload);
            return action.payload;
        default:
            return state;
    }
}

const petMeds = (state=[], action) => {
    switch (action.type) {
        case 'SET_MEDS':
            console.log('in pet Meds reducer', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
  pets,
  petInfo,
  petMeds,
});
