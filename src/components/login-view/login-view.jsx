import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    let isReq = true;
    if (!username) {
      console.log('Username required.');
      isReq = false;
    }
    if (!password) {
      console.log('Password required.');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validation();
    if (isReq) {
      axios
        .post('https://movio-app.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user');
        });
    }
  };

  return (
    <Row className="login-view justify-content-md-center">
      <Col sm="auto">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="mb-3"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button
            className="me-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button variant="secondary" type="submit" onClick={props.toRegister}>
            To register
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
