const { Todos } = require('../models')

const todoData = [
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

const seedTodoData = () => Todos.bulkCreate(todoData)

module.exports = seedTodoData