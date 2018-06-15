'use strict';

const WEBPACK = require('webpack');
const PATH = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const htmlConf = require('./html.config.json');

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
        new ExtractTextPlugin("css/styles.css"),
        new HtmlWebpackPlugin(htmlConf),
        new HtmlWebpackHarddiskPlugin()
    ],
    devServer: {
        contentBase: PATH.join(__dirname, "/../static"),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        open : true,
        /* example */
        /*proxy: {
            '/api-config': {
                target: 'http://ooi-dev.dev.search.km:55705',
                pathRewrite: { '^/api-config': '' }
            },
            '/api-stats': {
                target: 'http://ooi-dev.dev.search.km:55507',
                pathRewrite: { '^/api-stats': '' }
            }
        }*/
    }

});