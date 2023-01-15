import React, { useState } from 'react';
import topRight from '../images/landing-page/top-right.png';
import topLeft from '../images/landing-page/top-left.png';
import '../css/landing-page-styles.css';

import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authentication/auth';
import Cookies from 'js-cookie';

const LandingPage = () => {
  const [user, setUser] = useState({username: '', password: ''});
  const [error, setError] = useState();
  const auth = useAuth();
  const navigate = useNavigate();

  if(auth.loggedIn() && Cookies.get('user')) {
    console.log("Already logged in, go back to the dashboard");
    return <Navigate to="/dashboard" />
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Set Error when failed

    auth.login(user);
    navigate('/dashboard', { replace: true });
  }

  return (
    <>
      <img src={topRight} width="600" id="top-right-design" className="design" />
      <img src={topLeft} alt="" width="600" id="top-left-design" className="design" />

      <div className="container">
        <div className="left-side">
          <h1 className="title">DMDPNHS</h1>
          <h2 className="sub-title">RFID-Based Attendance</h2>
        </div>

        <div className="right-side">
          <form onSubmit={handleLogin}>
            <div className="form-input">
              <input type="text" placeholder="Username" onChange={e => setUser({...user, username: e.target.value})} value={user.name} />
            </div>

            <div className="form-input">
              <input type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value})} value={user.password} />
            </div>
            
            <div className="form-input">
              <input type="submit" value="Log in" className="cta" />
            </div>

            <div>
              <button className="create-acc">Create new account</button>
            </div>
            
            <div>
              <a href="#" id="forgot-pass">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>

      <footer>
          <div>SSP-Einstein Project 2023</div>
          <div>RFID-Based Attendance</div>
          <div>2nd Grading</div>
      </footer>
    </>
  );
}

export default LandingPage;
