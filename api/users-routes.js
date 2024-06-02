const router = require('express').Router();
const { Notes, Users } = require('../models')

router.get('/', (req, res) => {
    Users.findAll({
        attributes: ['id', 'username', 'password', 'created_at', 'updated_at']
    })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err);
            return res.json({
                message: 'Cannot fetch users!'
            })
        })
})

router.get('/:username', (req, res) => {
    Users.findAll({
        where: {
            username: req.params.username
        }
    })
        .then((result) => {
            if (result === null) {
                return res.json({
                    message: 'ERROR! Could not fetch that username.'
                })
            }
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.json({
                message: 'Could not fetch by username.'
            })
        })
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    Users.create({
        username: username,
        password: password
    })
        .then(() => {
            return res.json({
                message: 'Account created successfully!'
            })
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({ error: 'Account Already Exists' })
        })
})


//CREATE LOGIN

module.exports = router