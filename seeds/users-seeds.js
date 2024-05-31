const { Users } = require('../models')

const userData = [
    {
        username: "Cosmiqz",
        password: "pass222"
    },
    {
        username: "Ahrens",
        password: "lions51"
    },
    {
        username: "Pinot",
        password: "tablePlate!2"
    }
]

const seedUserData = () => Users.bulkCreate(userData)

module.exports = seedUserData