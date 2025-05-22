// src/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://macro-tracker-api.onrender.com/login/',
        new URLSearchParams({
          username: email,
          password: password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      setToken(response.data.access_token);
      alert('Login successful!');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
      {token && (
        <div>
          <h3>Access Token:</h3>
          <code>{token}</code>
        </div>
      )}
    </div>
  );
}

export default Login;
