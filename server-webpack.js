const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const request = require('request-promise');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);

const app = express();
const server = http.createServer(app);
const io = socket(server);

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

app.get('/quiz/:id', (req, res) => {
  const options = {
    uri: `http://localhost:3000/quiz/${req.params.id}`,
    json: true,
  };

  request(options)
    .then((quiz) => {
      res.render(path.join(__dirname, 'src/views/quiz-student.jade'), { quiz });
    })
    .catch(() => res.status(500).end());
});

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'src/views/login.html')));

app.get('/host/:id', (req, res) => {
  const namespace = `/${req.params.id}`;
  const nsp = io.of(namespace);
  const clients = io.nsps[namespace].connected;

  const options = {
    uri: `http://localhost:3000/quiz/${req.params.id}`,
    json: true,
  };

  request(options)
    .then((quiz) => {
      nsp.on('connection', (socket) => {
        socket.on('update score', (data) => {
          // TODO: Handle data to update graphs
          socket.broadcast.to(clients.host).emit('update', data);
        });

        if (clients.host) {
          socket.emit('host', clients.host);
          res.end();
        } else {
          clients.host = socket.id;
        }
      });
      res.render(path.join(__dirname, 'src/views/quiz-teacher.jade'), { namespace, quiz });
    })
    .catch(() => res.status(500).end());
});

server.listen(8080, 'localhost', (err) => {
  if (err) return console.log(err);
  console.log('Listening at http://localhost:8080/');
});
