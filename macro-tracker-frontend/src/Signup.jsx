import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password || password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSignup = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await axios.post('https://macro-tracker-api.onrender.com/users/', {
      email,
      password: password
    });
    const accessToken = response.data.access_token;
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    setError('');
    navigate('/dashboard'); // ✅ Redirect here instead of alert
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || 'Signup failed');
  }
};


  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p>{errors.password}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
