// LoginComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const doLogin = (e) => {
    e.preventDefault();
    const token = window.btoa(`${username}:${password}`);

    axios.post('http://localhost:8082/auth/login', {}, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
    .then(function(response) {
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('isLoggedIn', true);
      let role = response.data.user.role;
      switch(role) {
        case 'PATIENT':
          navigate('/patient/dashboard/'+ response.data.id);
          break;

          case 'DOCTOR':
          navigate('/doctor/dashboard/'+ response.data.id);
          break;

          case 'EXECUTIVE':
          navigate('/executive/dashboard/'+ response.data.id);
          break;

          case 'RECEPTIONIST':
          navigate('/receptionist/dashboard/'+ response.data.id);
          break;
        default:
          
        
      }

      
    })
    .catch(function(error) {
      setMsg('Invalid Credentials');
    });
  };

  return (
    <div
        style={{
          backgroundImage: `url('https://wallpaperaccess.com/full/1282799.jpg')`,
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "100px",

          backgroundAttachment: "fixed",
        }}
      >
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form onSubmit={doLogin} className="box">
              <h1>Login</h1>
              <p style={{ color: 'red' }}>Please enter your login and password!</p>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <input type="submit" />
              <div className="col-md-12" style={{ color: 'whitesmoke' }}>
                <a  href="/auth/signup">
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginComponent;
