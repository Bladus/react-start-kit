'use strict';

var token = require('./generate_token');
const WEBPACK = require('webpack');
const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const htmlConf = require('./html.config.json');
const VERSION = (process.env.VERSION || token.rand(10));

const CWD = PATH.join(__dirname, "/../static");

const common = require('./webpack.common.js');

module.exports = Object.assign(common, {
    watch: true,
    devtool: 'eval',
    plugins: [
        new WEBPACK.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("styles_" + VERSION + ".css"),
        new HtmlWebpackPlugin(htmlConf),
        new HtmlWebpackHarddiskPlugin()
    ]

});