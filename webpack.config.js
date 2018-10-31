var webpack = require("webpack");
var path = require("path");

module.exports = {
  mode: 'development', /* Минимизация js ===> mode: 'development' || 'production' */
  entry: {
    'bundle': './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/assets/js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  performance: { 
    hints: false 
  }
}