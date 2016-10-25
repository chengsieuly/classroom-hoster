const models = require('../models');

const quizController = {};

quizController.all = function (req, res, next) {
  models.Quiz
    .findAll()
    .then((quizzes) => {
      req._quizzes = quizzes || [];
      next();
    })
    .catch(() => res.status(500).end());
};

quizController.create = function (req, res, next) {
  models.Quiz
    .create({
      title: 'Hello world',
      description: 'Testing the quiz',
    })
    .then(() => next())
    .catch(() => res.status(500).end());
};

module.exports = quizController;

