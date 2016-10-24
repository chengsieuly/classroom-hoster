/*
 * NOTE: THIS VERSION OF WEBPACK IS ^2.1.0-beta
 *
 * Webpack by default will look for this file for its configuration
 **/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Where webpack should begin its bundling process
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index',
  ],

  // Where webpack should output its bundled files
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Webpack will try to resolve extensions with these first if not provided
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // This is where we put our loaders to tell webpack how to load certain files
  module: {
    loaders: [
      { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'src') },
    ],
  },

  // Extensions for webpack
  plugins: [
    // Automatically generate our html page
    // https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      // Define the starting point for our dynamic html creation
      template: path.join(__dirname, 'src/index.html'),
      appMountId: 'root',
      title: 'Hello',
    }),
  ],
};
