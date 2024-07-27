import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    name: '',
    task: '',
    timings: '',
    status: false
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting to add a task
    try {
      const response = await axios.post('http://localhost:80/', task);
      addTask(response.data);
      // Clear the form fields
      setTask({
        name: '',
        task: '',
        timings: '',
        status: false
      });
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false); // Set loading to false once the task is added or an error occurs
    }
  };

  return (
    <Card className="mb-4 p-3 task-form-card">
      <Card.Body>
        <Card.Title>Add New Task</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTaskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter task name"
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="task"
              value={task.task}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </Form.Group>
          <Form.Group controlId="formTaskTiming">
            <Form.Label>Completion Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="timings"
              value={task.timings}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskStatus">
            <Form.Check
              type="checkbox"
              name="status"
              checked={task.status}
              onChange={handleChange}
              label="Completed"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} style={{ position: 'relative' }}>
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              />
            )}
            {loading ? ' Adding...' : 'Add Task'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
