'use strict';

import React from 'react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    showResult() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        return async values => {
          await sleep(500); // simulate server latency
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
        };
    }
    render() {
        return (
            <div>
                <span>Hello startkit!</span>
            </div>
        )
    }
}