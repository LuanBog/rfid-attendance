import React, { useState} from 'react';

const AdminLogin = ({ login, error, forgotPassword }) => {
  const [details, setDetails] = useState({username: '', password: ''});

  const submitHandler = (e) => {
    e.preventDefault();

    login(details);
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="error">{error}</div>

      <div className="form-group">
        <input type="text" placeholder="Username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.name} />
      </div>

      <div className="form-group">
        <input type="password" placeholder="Password"  id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
      </div>

      <input type="submit" value="Login" />

      <div>
        <a href="#" onClick={forgotPassword}>Forgot Password?</a>
      </div>
    </form>
  );
}

export default AdminLogin
