'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subdistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subdistrict.belongsToMany(models.Citizen,{through:models.Admin,foreignKey:'SubdistrictId'})
    }
  };
  Subdistrict.init({
    name: DataTypes.STRING,
    chief: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subdistrict',
  });
  return Subdistrict;
};