import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Task = ({ task, completeTask, removeTask, onUpdateClick }) => {
  const handleCompleteClick = () => {
    completeTask(task._id, task.status);
  };

  const handleRemoveClick = () => {
    removeTask(task._id);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {task.task}
        </Card.Text>
        <Card.Text>
          <strong>Timing:</strong> {new Date(task.timings).toLocaleString()}
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {task.status ? 'Completed' : 'Not Completed'}
        </Card.Text>
        <Card.Text>
          <strong>Completion Time:</strong> {task.status ? new Date(task.completionTime).toLocaleString() : 'Task is not completed yet'}
        </Card.Text>
        <Button variant="info" onClick={handleCompleteClick}>
          {task.status ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Button>
        <Button variant="danger" onClick={handleRemoveClick} className="ml-2">
          Remove
        </Button>
        <Button variant="secondary" onClick={onUpdateClick} className="ml-2">
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
