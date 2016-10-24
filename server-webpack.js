const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  colors: true,
  historyApiFallback: true,
  // TODO: Something weird with hot reload in using webpack@^2.0.0 and react-hot-loader@^3.0.0
  hot: false,
  noInfo: false,
  progress: true,
  quiet: false,
  stats: 'minimal',
}).listen(3000, 'localhost', (err) => {
  if (err) return console.log(err);

  console.log('Listening at http://localhost:3000/');
});
