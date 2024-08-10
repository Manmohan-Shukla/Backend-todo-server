const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')// let request have cors error
const app = express();
const path =require("path")
app.use(cors())
app.use(bodyParser.json());
app.listen(3000) //gives port 3000 listen
let todos = [];
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

//posting method for posting newtodo
app.post('/todos', (req, res) => {
  const newTodo = {                       //json object for new posted todo
    id: Math.floor(Math.random() * 10000), //gets a random id b/w 0-10000
    title: req.body.title,               
    description: req.body.description,                
  };
  todos.push(newTodo)
  res.status(201).json(newTodo);//this return json of posted todo in status of 201
})


// for changing certain title desc at a specific id

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});
//get request get all todo
app.get('/todos', (req, res) => {
  res.json(todos);
});
//get specific id todo
app.get('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    res.json(todos[todoIndex]);
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.get('*', (req, res)=> {
  const index = path.join(__dirname, 'index.html' );
  res.sendFile(index);
});//connect index.html file


module.exports = app;
