'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

function Test(state = null, action) {
    switch (action.type) {
    default:
        return state;
    }
}

export default combineReducers({
    Test,
    form: formReducer
});