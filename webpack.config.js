const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'app', 'src', 'js', 'index.js'),
  output: {
    path: path.join(__dirname, 'public','js'),
    filename: 'bundle.js'
  }
}