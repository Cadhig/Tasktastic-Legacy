const { Notes } = require('../models')

const notesData = [
    {
        title: "Clean room",
        description: "Tomorrow @4pm"
    },
    {
        title: "Pick up milk",
        description: "From HEB on Friday"
    },
    {
        title: "Study",
        description: "Today at 2pm"
    },
]

const seedNotesData = () => Notes.bulkCreate(notesData)

module.exports = seedNotesData