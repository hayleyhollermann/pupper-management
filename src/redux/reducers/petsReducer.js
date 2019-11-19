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

export default combineReducers({
  pets,
});
