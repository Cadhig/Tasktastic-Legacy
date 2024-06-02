const Users = require('./users');
const Notes = require('./notes');

Notes.belongsTo(Users)
Users.hasMany(Notes)

module.exports = {
    Users,
    Notes
}