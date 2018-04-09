'use strict';

var token = require('./generate_token');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require("babel-polyfill");

const PATH = require('path');
const CWD = PATH.join(__dirname, "/../static");
const VERSION = (process.env.VERSION || token.rand(10));

module.exports = {
    entry: {
        bundle: ["babel-polyfill", './app'],
    },
    output: {
        path: CWD,
        filename: '[name]' + '_' + VERSION + '.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ 
                fallback: 'style-loader', 
                use: ['css-loader', 'resolve-url-loader']
            })
        },{
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
            loader: "file-loader?name=img/[hash].[ext]"
        }]
    },
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.json']
    },
    externals: {
        leaflet: 'L'
    }
}