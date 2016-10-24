const express = require('express');
const models = require('./models');

// Set up an instance of our express application
const app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(3000, (err) => {
  if (err) console.error(err);
  console.log('Successfully connected to localhost:3000');
});
