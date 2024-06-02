
const router = require('express').Router()
const userRoutes = require('./users-routes')
const notesRoutes = require('./notes-routes')

router.use('/api/users', userRoutes);
router.use('/api/notes', notesRoutes);

module.exports = router