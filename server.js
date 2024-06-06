const path = require('path')
const routes = require('./api')
const express = require('express');
const app = express();
const PORT = 6002;
const cors = require('cors')
const session = require('express-session')

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))
app.use(cors())
app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html', 'homepage.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html', 'signup.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html', 'notes.html'))
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})