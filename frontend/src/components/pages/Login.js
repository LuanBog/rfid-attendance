import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authentication/auth';

const AdminLogin = () => {
  const [user, setUser] = useState({username: '', password: ''});
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    // Set Error when failed

    auth.login(user);
    navigate('/dashboard', { replace: true });
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      {auth.loggedIn() ? "You're already logged in" : ''}

      <div className="error">{error}</div>

      <div className="form-group">
        <input type="text" placeholder="Username" id="username" onChange={e => setUser({...user, username: e.target.value})} value={user.name} />
      </div>

      <div className="form-group">
        <input type="password" placeholder="Password"  id="password" onChange={e => setUser({...user, password: e.target.value})} value={user.password} />
      </div>

      <input type="submit" value="Login" />

      <div>
        <a href="#">Forgot Password?</a>
      </div>
    </form>
  );
}

export default AdminLogin
