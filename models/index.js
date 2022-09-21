const Users = require('./user');
const Books = require('./books')

Users.hasMany(Books, {
    foreignKey: 'user_id'
  });

  Books.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

module.exports = { Users, Books };