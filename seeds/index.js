const seedUsers = require('./users-seeds')
const seedTodos = require('./todo-seeds')

const sequelize = require('../db/connection')

const seedAll = async () => {
    await sequelize.sync({ force: true, alter: true })
    console.log('----------------Database Synced!-----------------------')
    await seedUsers()
    console.log('-----------------Users Seeded!-------------------------')
    await seedTodos()
    console.log('-----------------Todos Seeded!-------------------------')
    process.exit(0)
}

seedAll()