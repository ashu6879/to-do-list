import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">To-Do List</Navbar.Brand>
          <Nav className="ml-auto">
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <TaskForm />
          </Col>
          <Col md={6}>
            <TaskList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
