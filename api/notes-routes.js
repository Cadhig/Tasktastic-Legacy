const router = require('express').Router();
const { where } = require('sequelize');
const { Notes, Users } = require('../models');
const sequelize = require('sequelize');

router.get('/', async (req, res) => {
    console.log(req.session.user_id)
    if (!req.session.user_id) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const allNotes = await Notes.findAll({
        attributes: ['id', 'title', 'description', 'user_id', 'is_completed', 'created_at', 'updated_at'],
        order: [['created_at', 'DESC']],
        where: {
            user_id: req.session.user_id,
        },
    });

    return res.json(allNotes);
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    Notes.findAll({
        where: {
            id: id
        },
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
});

router.post('/', (req, res) => {
    const { title, description } = req.body
    Notes.create({
        title: title,
        description: description,
        user_id: req.session.user_id,
        where: {
            user_id: req.session.user_id
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
    Notes.update({
        title: title,
        description: description,
        is_completed: is_completed,
        user_id: req.session.user_id,

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
    Notes.destroy({
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
        });
});

module.exports = router
