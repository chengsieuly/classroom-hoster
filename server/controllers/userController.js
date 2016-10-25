const models = require('../models');

const userController = {};

userController.find = function (req, res, next) {
  const { username } = req.body;
  models.User
    .find({ username })
    .then((user) => {
      if (!user) res.status(400).end();
      req._user = user;
      next();
    })
    .catch(() => res.status(500).end());
};

module.exports = userController;
