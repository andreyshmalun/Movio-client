import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      console.log('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      console.log('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      console.log('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      console.log('Password must be 6 characters long');
      isReq = false;
    }
    if (!email) {
      console.log('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      console.log('Email is invalid');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://movio-app.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          props.onRegister(data);
        })
        .catch((e) => {
          console.error('unable to register');
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
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="primary" type="submit" onClick={props.toLogin}>
            To login
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
