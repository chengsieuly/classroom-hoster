const models = require('../models');

const userController = {};

userController.find = function (req, res, next) {
  const { username } = req.body;
  models.User
    .find({ username })
    .then((user) => {
      req._user = user;
      next();
    })
    .catch(() => res.status(400).json({ error: 'Error getting user' }));
};

module.exports = userController;
