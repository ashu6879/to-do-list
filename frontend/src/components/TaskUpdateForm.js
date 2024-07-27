import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const TaskUpdateForm = ({ taskId, onClose }) => {
  const [task, setTask] = useState({
    name: '',
    task: '',
    timings: '',
    status: false
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:80/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://to-do-list-gamma-one-27.vercel.app/${taskId}`, task);
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Card className="p-3 task-update-card">
      <Card.Body>
        <Card.Title>Update Task</Card.Title>
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
          <Button variant="primary" type="submit">
            Update Task
          </Button>
          <Button variant="secondary" className="ms-2" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskUpdateForm;
