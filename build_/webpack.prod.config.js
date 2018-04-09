'use strict';

var token = require('./generate_token');
const WEBPACK = require('webpack');
const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlConf = require('./html.config.json');
const CWD = PATH.join(__dirname, "/../static");
const VERSION = (process.env.VERSION || token.rand(10));

const common = require('./webpack.common.js');

module.exports = Object.assign(common, {
    plugins: [
        new WEBPACK.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new WEBPACK.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: "styles_" + VERSION + ".css",
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin(htmlConf)
    ]
});