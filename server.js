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
    res.sendFile(path.join(__dirname, './public', 'homepage.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'signup.html'))
})
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})




// app.use(express.static('public'))
// app.get('/', (req, res) => {
//     res.json('Hello World')
// });


// app.post('/', (req, res) => {
//     res.send(req.body)
// });
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`)
// });