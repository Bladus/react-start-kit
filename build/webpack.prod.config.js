'use strict';

const WEBPACK = require('webpack');
const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = Object.assign(common, {
    output: {
        path: __dirname + '/../dist/static',
        filename: '[name].js',
        publicPath: '/public/'
    },
    plugins: [
        new WEBPACK.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new WEBPACK.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({ 
            filename: 'css/styles.css', 
            disable: false, 
            allChunks: true 
        })
    ]
});