module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    _id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  return Quiz;
};
