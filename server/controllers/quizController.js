const models = require('../models');

const quizController = {};

quizController.findOne = function (req, res, next) {
  models.Quiz
    .findById(req.params.id)
    .then((quiz) => {
      if (!quiz) return res.status(404).end();
      req._quiz = quiz;
      next();
    })
    .catch(() => res.status(500).end());
};

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
