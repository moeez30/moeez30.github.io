import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let validLogin = ''

  const handleLogin = (e) => {
    e.preventDefault();
    try{
    // Handle login logic here
    if (email === 'Moeez' && password === '123123') {
        // Authentication successful, perform necessary actions (e.g., store session)
        validLogin = 'Valid';
        window.location.href = '/FeaturePage'
        window.alert('Login successful');
      } else {
        // Authentication failed, display an error message or take appropriate action
        validLogin = 'Invalid';
        window.alert('Invalid credentials');
      }
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="User Name">User Name:</label>
        <input type="User Name" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="Password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;