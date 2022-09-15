import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validation = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required.');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
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
    <Row className="login-view justify-content-md-center mt-5">
      <Col sm="auto">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
          <Button
            className="me-3"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
