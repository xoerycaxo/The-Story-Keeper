const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");


class Books extends Model {

}
// class Users extends Model {
//     checkPassword(loginPw){
//         return bcrypt.compareSync(loginPw, this.passwords);
//     }
// }

Books.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bookImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
  
},
{
  hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    // async beforeCreate(newUserData) {
    //   newUserData.passwords = await bcrypt.hash(newUserData.passwords, 10);
    //   return newUserData;
    // },

    // async beforeUpdate(updatedUserData) {
    //   updatedUserData.passwords = await bcrypt.hash(updatedUserData.passwords, 10);
    //   return updatedUserData;
    // }
  },
    sequelize, 
    timestamps: false, 
    freezeTableNames: true,
    underscored: true,
    modelName: 'books'
  });


module.exports = Books;
