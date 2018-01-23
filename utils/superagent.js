'use strict';

import superagent from 'superagent';

export default function request(method, url, options = {}) {
    return new Promise(function(resolve, reject) {
        let sa = superagent(method, url);
        if (options.credentials) {
            sa = sa.withCredentials();
        }
        sa = sa.set('Content-Type', 'application/x-www-form-urlencoded')
        sa = sa.send(options.body)
        sa = sa.end(function(err, res) {
            if(err || !res.ok) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}