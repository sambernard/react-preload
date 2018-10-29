var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    devtool: 'source-map',
    entry: {
        // 'react-preload': './modules/index',
        // 'examples': './examples/src/index',
        main: ['./examples/src/index'],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        // libraryTarget: 'var',
        // library: 'ReactPreload'
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'react-preload': 'ReactPreload',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './examples/index.html',
            chunks: ['main', 'vendor'],
        }),
    ]

}];
