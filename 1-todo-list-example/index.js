const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const todos = [];


// GET /todos - get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET /todos/:id - get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        res.json(todo);
    }
});

// POST /todos - create a new todo
app.post('/todos', (req, res) => {
    const todo = {
        id: uuidv4(),
        name: req.body.name,
        isCompleted: false
    };
    todos.push(todo);
    res.json(todo);
});

// PUT /todos/:id - update a todo by ID
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        todo.name = req.body.name || todo.name;
        todo.isCompleted = req.body.isCompleted || todo.isCompleted;
        res.json(todo);
    }
});

// DELETE /todos/:id - delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        res.status(404).send('Todo not found');
    } else {
        todos.splice(index, 1);
        res.sendStatus(204);
    }
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
