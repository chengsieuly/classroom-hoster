const express = require('express');
const models = require('./models');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  models.User
    .findOne({ username, password })
    .then(() => res.json({ success: 'Login successful' }))
    .catch(err => res.status(400).json({ error: err }));
});

app.get('/quiz', (req, res) => {
  models.Quiz
    .findAll()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.post('/quiz', (req, res) => {
  models.Quiz
    .create({
      title: 'Hello world',
      description: 'Testing the quiz',
    })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.listen(3000, (err) => {
  if (err) console.error(err);
  console.log('Successfully connected to localhost:3000');
});
