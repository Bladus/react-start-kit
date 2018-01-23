'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
require("babel-polyfill");

module.exports = {
    entry: {
        bundle: ["babel-polyfill", './app'],
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
                use: 'css-loader' 
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