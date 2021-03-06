const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/userController');
const Quiz = require('./controllers/quizController');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  // res.header('Access-Control-Allow-Origin', 'http://1a786a37.ngrok.io');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/login', User.find, (req, res) => res.json({ success: 'Login successful' }));

app.get('/quiz', Quiz.all, (req, res) => res.json(req._quizzes));

app.get('/quiz/:id', Quiz.findOne, (req, res) => res.json(req._quiz));

app.post('/quiz', Quiz.create, (req, res) => res.json({ success: 'Quiz created' }));

app.listen(3000, (err) => {
  if (err) console.error(err);
  console.log('Successfully connected to localhost:3000');
});
