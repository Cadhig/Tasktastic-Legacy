
const router = require('express').Router()
const userRoutes = require('./users-routes')
const todoRoutes = require('./todo-routes')

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);

module.exports = router