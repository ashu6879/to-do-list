import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskUpdateForm from './TaskUpdateForm'; // Import the TaskUpdateForm component
import axios from 'axios';
import { Container, Modal } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:80/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const completeTask = async (id, status) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const updatedTask = {
        ...taskToUpdate,
        status: !status,
        completionTime: !status ? new Date() : null
      };
      await axios.put(`http://localhost:80/${id}`, updatedTask);
      fetchTasks(); // Refresh tasks after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async id => {
    try {
      await axios.delete(`http://localhost:80/${id}`);
      fetchTasks(); // Refresh tasks after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedTaskId(id);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedTaskId(null);
    fetchTasks(); // Refresh tasks after closing the update modal
  };

  return (
    <Container className="mt-5">
      {/* <h1 className="text-center mb-4">To-Do List</h1> */}
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          completeTask={completeTask}
          removeTask={removeTask}
          onUpdateClick={() => handleUpdateClick(task._id)}
        />
      ))}
      {selectedTaskId && (
        <Modal show={showUpdateModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskUpdateForm taskId={selectedTaskId} onClose={handleCloseModal} />
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default TaskList;
