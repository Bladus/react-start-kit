'use strict';

import { combineReducers } from 'redux';

class MultuReducerState {
    constructor(Constructor, def={}) {
        Object
            .keys(def)
            .forEach(key => this.setValue(key, def[key]));
        this.Constructor = Constructor;
    }
    getValue(key) {
        return this[key] || {
            payload: new this.Constructor()
        }
    }
    setValue(key, value) {
        return this[key] = value, this;
    }
}

function ApiState(pending=false, payload, error={}, status=null) {
    this.pending = pending;
    this.payload = payload;
    this.error   = error;
    this.status  = status;
}

export const apiReducer = (types, Constructor, prepare, state, action) => {
    switch (action.type) {
        case types.REQUEST:
            return new ApiState(true, state.payload, state.error, state.status);
        case types.RESET:
            return new ApiState(false, new Constructor());
        case types.SUCCESS: 
            action.data = action.data || new Constructor();
            return new ApiState(false, prepare(action), null, state.status);
        case types.FAILURE: 
            return new ApiState(false, state.payload, action.error, state.status);
        case types.STATUS:  
            return new ApiState(state.pending, state.payload, state.error, action.status);
        default: 
            return state || new ApiState(false, new Constructor());
    }
}

export const multiApiReducer = (types, Constructor, extendKey, prepare, state, action) => {
    let key;
    try {
        key = extendKey(action, state);
    } catch(error) {}
    if (key !== undefined) {
        let _state = new MultuReducerState(Constructor, state);
        let _curr = _state.getValue(key);
        switch (action.type) {
            case types.REQUEST:
                return _state.setValue(key, new ApiState(true, _curr.payload, null, _curr.status));
            case types.RESET:
                return _state.setValue(key, new ApiState(false, new Constructor()));
            case types.SUCCESS: 
                action.data = action.data || new Constructor();
                return _state.setValue(key, new ApiState(false, prepare(action), null, _curr.status));
            case types.FAILURE: 
                return _state.setValue(key, new ApiState(false, _curr.payload, action.error, _curr.status));
            case types.STATUS: 
                return _state.setValue(key, new ApiState(_curr.pending, _curr.payload, _curr.error, action.status));
            default: 
                return state || new MultuReducerState(Constructor);
        }
    }
    return state || new MultuReducerState(Constructor);
}

export const boundApiReducer = (types, Constructor, extendKey=null, prepare=(action)=>action.data) => {
    if (typeof extendKey === 'function') {
        return multiApiReducer.bind(null, types, Constructor, extendKey, prepare)
    }
    return apiReducer.bind(null, types, Constructor, prepare)
}

export function counterObjectReducer(setTypes, KEY, Constructor, ) {
    return combineReducers({
        get:  boundApiReducer(setTypes[`GET_${KEY}`], Constructor),
        add:  boundApiReducer(setTypes[`ADD_${KEY}`], Object),
        edit: boundApiReducer(setTypes[`EDIT_${KEY}`], Object),
        del:  boundApiReducer(setTypes[`DEL_${KEY}`], Object)
    });
}

export function reducer(reducerType, Constructor = Object) {
    return (state, action) => {
        switch (action.type) {
            case reducerType: return action.data;
            default: return state || new Constructor();
        }
    }
}
