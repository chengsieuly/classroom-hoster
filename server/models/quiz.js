const sj = require('sequelize-json');

module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    // _id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    // _id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    questions: sj(sequelize, 'Quiz', 'questions'),
  });

  return Quiz;
};
