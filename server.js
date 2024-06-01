const path = require('path')
const routes = require('./api')
const express = require('express');
const app = express();
const PORT = 6002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
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