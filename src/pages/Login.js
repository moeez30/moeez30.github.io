import React, { useState } from 'react';
import { useHistory,Link  } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(0)
  

  const handleLogin = (e) => {
    e.preventDefault();
    try{
    // Handle login logic here
    if (email === 'Moeez' && password === '123123') {
        // Authentication successful, perform necessary actions (e.g., store session)
        setValidLogin(1);
        // window.location.href = '/FeaturePage'
        window.alert('Login successful');
      } else {
        // Authentication failed, display an error message or take appropriate action
        setValidLogin(0);
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
        <button type="submit">Submit</button>
        {validLogin ? 
          <Link to='/FeaturePage'><button type="submit">Login</button></Link> :
          null 
        }
      </form>


    </div>
  );
};

export default (Login);