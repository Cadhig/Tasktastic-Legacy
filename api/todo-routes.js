const router = require('express').Router();
const { where } = require('sequelize');
const { Todos, Users } = require('../models')

router.get('/', (req, res) => {
    Todos.findAll({
        attributes: ['id', 'title', 'description', 'user_id', 'is_completed', 'created_at', 'updated_at'],
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Could not fetch notes!'
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Todos.findAll({
        where: {
            id: id
        }
    })
        .then((result) => {
            if (id === null) {
                return res.json({
                    message: 'Could not fetch note by ID'
                })
            }
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Could not fetch by ID'
            })
        })
})

router.post('/:user_id', (req, res) => {
    const { title, description } = req.body
    Todos.create({
        title: title,
        description: description,
        user_id: req.params.user_id,
        where: {
            user_id: req.params.user_id
        }
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Could not create note!'
            })
        })
})

router.put('/:id', (req, res) => {
    const { title, description, is_completed, user_id } = req.body
    Todos.update({
        title: title,
        description: description,
        is_completed: is_completed,
        user_id: user_id,

    }, {
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            return res.json('Note updated!')
        })
        .catch((err) => {
            console.error(err)
            return res.json('ERROR note not updated.')
        })
})

router.delete('/:id', (req, res) => {
    Todos.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            return res.json({
                message: 'Note successfully deleted!'
            })
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Could not delete note!'
            })
        })
})

module.exports = router