const Users = require('./users');
const Todos = require('./todos');

Todos.belongsTo(Users)
Users.hasMany(Todos)

module.exports = {
    Users,
    Todos
}