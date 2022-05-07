const express = require('express');
const { v4 } = require('uuid');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong')
});

app.get('/tasks', (req, res) => {
    res.json([])
        /* res.json({
            tasks: []
        }) */
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send('Bad Request');
    }

    res.json({
        id: v4(),
        title,
        description
    });
});

module.exports = app;