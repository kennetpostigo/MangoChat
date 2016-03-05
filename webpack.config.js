var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'source-map',

  entry: [
    './client/App.jsx'
  ],

  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'App.js',
    publicPath: '/public/js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ]
}
