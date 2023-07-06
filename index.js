const express = require('express');
const { endpoint } = require('./endpoint');
const multer = require('multer');
const { fileStorage } = require('./multer/config');

const upload = multer({ storage: fileStorage });
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Pounds Detection API');
});

app.post('/upload', upload.array('images'), endpoint);

app.use((req, res) => {
    res.send('Wrong endpoint!');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});