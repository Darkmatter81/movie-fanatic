var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/,  use: ['style-loader', 'css-loader']},
            {test: /\.(png|jpg|ico)$/,  loader: "file-loader", options:{name:'[name].[ext]'}},
        ]
    },
    devServer:{
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'app/index.html',
        favicon: 'app/assets/favicon.ico'
    })]
};

if (process.env.NODE_ENV === 'production'){
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;