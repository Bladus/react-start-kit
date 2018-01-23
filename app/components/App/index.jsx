'use strict';

import React from 'react';

import 'utils/prototypes.js'

import './style.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}