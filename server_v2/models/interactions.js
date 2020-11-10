'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Interactions.init({
    user_name_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interactions',
  });
  return Interactions;
};