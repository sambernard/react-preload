var path = require('path');
var webpack = require('webpack');

module.exports = [{
  devtool: 'eval',
  entry: {
    'react-preload': './modules/index',
    'examples': './examples/src/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'ReactPreload'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-preload': 'ReactPreload',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
    }]
  }
}];
