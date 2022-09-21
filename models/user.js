const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../config/connection");

class Users extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.passwords);
    }
}




Users.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          len: [6, 30],
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwords: {
        type: DataTypes.STRING,
        allowNull: false,
        // password must be 10chars long
        validate: {
          len: [10],
        },
      },
  
},
{
  hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newUserData) {
      newUserData.passwords = await bcrypt.hash(newUserData.passwords, 10);
      return newUserData;
    },

    async beforeUpdate(updatedUserData) {
      updatedUserData.passwords = await bcrypt.hash(updatedUserData.passwords, 10);
      return updatedUserData;
    }
  },
    sequelize, 
    timestamps: false, 
    freezeTableNames: true,
    underscored: true,
    modelName: 'users'
  });

module.exports = Users;