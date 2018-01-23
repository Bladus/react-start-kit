'use strict';

const WEBPACK = require('webpack');
const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = Object.assign(common, {
    output: {
        path: __dirname + '/../static/',
        filename: '[name].js',
        publicPath: '/static/'
    },
    watch: true,
    devtool: 'eval',
    plugins: [
        new WEBPACK.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("css/styles.css")
    ]

});