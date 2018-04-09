'use strict';

import superagent from 'utils/superagent';
import req from 'superagent';
import { dispatch } from 'redux';

const error_time = 7 * 1000;

export const get  = (...args) => request('GET',    ...args);
export const post = (...args) => request('POST',   ...args);
export const put  = (...args) => request('PUT',    ...args);
export const del  = (...args) => request('DELETE', ...args);
export const json  = (...args) => request('JSON', ...args);

get.makeQueryString = makeQueryString;

export default function request(method, actions, dispatch, url, data, ...otherArgs) {
    dispatch({ type: actions.REQUEST, params: otherArgs || [] });

    if (method == 'GET') {
        let ts = new Date().getTime();
        let symbol = ~url.indexOf('?')
            ? '&'
            : '?'
        url += `${symbol}ts=${ts}`
    }
    if (method == 'JSON') {
        return req
           .post(url)
           .send(data)
           .set('Content-Type', 'application/json')
           .then(requestSuccess(actions, dispatch, ...otherArgs))
           .catch(requestFailure(actions, dispatch, ...otherArgs));
    }
    return superagent(method, url, { credentials: true, body: data })
        .then(requestSuccess(actions, dispatch, ...otherArgs))
        .catch(requestFailure(actions, dispatch, ...otherArgs));
}

function prepareReport(body) {
    let re = /(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}).*/ig;
    if (body && body.Rows && body.Rows.length && body.Rows[0].Attribute.match(re)) {
        body.Rows.forEach(row => {
            row.Attribute = row.Attribute.replace(re, '$1T$2.000Z')
        });
    }
    return body;
}

function requestSuccess(acts, disp, ...actionParams) {
    return response => {
        requestStatus(acts, disp, response);
        disp({ 
            type: acts.SUCCESS, 
            data: response.body, 
            params: actionParams || []
        });
        return response
    }
}

function requestFailure(acts, disp, ...actionParams) {
    return error => {
        requestStatus(acts, disp, error);
        disp({ type: acts.FAILURE, error, params: actionParams || [] });
        return error;
    }
}

function requestStatus(acts, disp, resp) {
    if (acts.hasOwnProperty('STATUS')) {
        disp({ 
            type: acts.STATUS, 
            status: resp.statusCode || resp.status 
        });
        setTimeout(function() {
            disp({ type: acts.STATUS });
        }, error_time);
    }
}

export function actionCreator(type, data, params = []) {
    return { type, data, params }
}

export function ApiActions(...actions) {
    actions.forEach(config => {
        let [ name, traceStatus ] = typeof config == 'string'
            ? [config]
            : config;
        this[name] = new ApiAction(name, traceStatus);
    })
}

export function ApiAction(name, traceStatus = false) {
    this.REQUEST = `${name}_REQUEST`;
    this.SUCCESS = `${name}_SUCCESS`;
    this.FAILURE = `${name}_FAILURE`;
    this.RESET = `${name}_RESET`;
    if (traceStatus) {
        this.STATUS  = `${name}_STATUS`;
    }
}

export function makeQueryString(object) {
    if ( typeof object == 'string') {
        return object;
    }
    let queryString = [];
    for (let key in object) {
        let item = object[key];
        let param = Array.isArray(item) 
            ? item.map(value => `${key}=${encodeURIComponent(value)}`).join('&')
            : `${key}=${encodeURIComponent(item)}`;
        queryString.push(param);
    }
    return queryString.length 
        ? '?' + queryString.join('&')
        : '';
}