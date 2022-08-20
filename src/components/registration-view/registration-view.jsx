import React, { useState } from 'react';
import axios from 'axios';

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
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
