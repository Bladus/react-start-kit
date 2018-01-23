'use strict';

import request from './superagent';
import { checkSuccess, checkFailure } from 'actions/checkAuth';
import { browserHistory } from 'react-router';
import store from './store';

const defaultLocation = '/counterlist';
const publicRoutes = [
    '/',
    '/auth',
    '/registration',
];

export default function check_auth(nextState, replace, callback) {
    let _public = publicRoutes.some(item => item == window.location.pathname);
    request('get', '/api/me').then(function(res){
        if (res.body == null) {
            store.dispatch(checkFailure({}));
            !_public && replace('/auth');
            callback();
        } else {
            store.dispatch(checkSuccess(JSON.stringify(res.body)));
            callback();
        }
    }, function(err) {
        store.dispatch(checkFailure(err));
        !_public && replace('/');
        callback();
    })
}