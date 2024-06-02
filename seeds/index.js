const seedUsers = require('./users-seeds')
const seedNotes = require('./notes-seeds')

const sequelize = require('../db/connection')

const seedAll = async () => {
    await sequelize.sync({ force: true, alter: true })
    console.log('----------------Database Synced!-----------------------')
    await seedUsers()
    console.log('-----------------Users Seeded!-------------------------')
    await seedNotes()
    console.log('-----------------Notes Seeded!-------------------------')
    process.exit(0)
}

seedAll()