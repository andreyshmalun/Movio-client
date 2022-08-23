import React, { useState } from 'react';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    let isReq = true;
    if (!username) {
      let setUsernameError = console.log('Username required.');
      isReq = false;
    }
    if (!password) {
      let setPasswordError = console.log('Password required.');
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password);
  //   props.onLoggedIn(username);
  // };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <button onClick={props.toRegister}>To Register</button>
      </div>
    </div>
  );
}
