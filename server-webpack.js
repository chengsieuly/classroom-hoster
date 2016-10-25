const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  proxy: {
    '**': { target: 'http://localhost:3000', secure: false },
  },
  contentBase: config.output.path,
  colors: true,
  historyApiFallback: true,
  // TODO: Something weird with hot reload in using webpack@^2.0.0 and react-hot-loader@^3.0.0
  hot: true,
  noInfo: false,
  progress: true,
  quiet: false,
  stats: 'minimal',
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
}));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'src/views/login.html')));

app.listen(8080, 'localhost', (err) => {
  if (err) return console.log(err);
  console.log('Listening at http://localhost:8080/');
});
