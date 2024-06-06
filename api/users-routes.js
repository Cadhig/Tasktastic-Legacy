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
            res.status(400).json({ error: 'Account Already Exists' })
            return
        })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    try {
        const foundUser = await Users.findOne({
            attributes: ['id', 'username', 'password'],
            where: {
                username: username,
            }
        })
        console.log(foundUser.password)
        if (foundUser === null) {
            res.status(401).json({ error: 'Incorrect username/password' })
            return
        }
        if (password !== foundUser.password) {
            res.status(401).json({ error: "Incorrect username/password" })
            return
        }
        req.session.user_id = foundUser.id
        req.session.authorized = true
        res.status(200).json({ success: 'Logged in' })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})


//CREATE LOGIN

module.exports = router