require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { // Use environment variable for the connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schema
const Task = mongoose.model('Task', {
  name: String,
  Description:String,
  task: String,
  timings: Date,
  status: { type: Boolean, default: false },
  completionTime: Date,
  reminderTime: Date
});

// Routes
// Create a task
app.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Read all tasks
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Read a task by ID
app.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a task by ID
app.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete a task by ID
app.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});