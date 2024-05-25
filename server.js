const express = require('express');
const app = express();
const PORT = 6000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Hello World')
});

app.post('/', (req, res) => {
    res.send(req.body)
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});