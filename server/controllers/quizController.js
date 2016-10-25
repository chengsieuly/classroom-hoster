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
  const { title, description, questions } = req.body;
  models.Quiz
    .create({ title, description, questions })
    .then(() => next())
    .catch(() => res.status(500).end());
};

module.exports = quizController;

