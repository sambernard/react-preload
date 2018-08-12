var path = require('path');
var webpack = require('webpack');

module.exports = [{
  devtool: 'source-map',
  entry: {
    'react-preload': './modules/index',
    'examples': './examples/src/index',
  },
  output: {
    path: path.resolve('dist'),
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
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
}];
