const express = require('express');
const app = express();
const port = 3000;

// Example todoList array
let todoList = ["Complete Node Byte", "Play Cricket"];

// Use built-in middleware to parse incoming JSON requests
app.use(express.json());

// GET API for /todos - Responds with the todoList array
app.get('/todos', (req, res) => {
  res.status(200).json(todoList);
});

// POST API for /todos - Adds a new todo to the list
app.post('/todos', (req, res) => {
  const { name } = req.body;
  if (name) {
    todoList.push(name);  // Add new todo item to the list
    res.status(201).send();  // Respond with 201 Created and no body
  } else {
    res.status(400).json({ error: "Invalid request body" });
  }
});

// DELETE API for /todos - Deletes a todo from the list
app.delete('/todos', (req, res) => {
  const { name } = req.body;
  const index = todoList.indexOf(name);
  if (index > -1) {
    todoList.splice(index, 1);  // Remove the item if it exists
    res.status(204).send();  // Respond with 204 No Content
  } else {
    res.status(404).json({ error: "Todo not found" });  // Todo item not found
  }
});

// Any other request method to /todos should return a 501 Not Implemented
app.all('/todos', (req, res) => {
  res.status(501).send();  // Respond with 501 Not Implemented
});

// Requests to any other path should return a 404 Not Found
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});