'use strict';

import './utils/polyfills.js'
import './utils/prototypes.js'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/App';
import Index from 'components/Index';
import NotFound from 'components/NotFound';

import store from 'utils/store';

const routing = (
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route component={App} path='/' >
                <IndexRoute component={Index} />
            </Route>
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));