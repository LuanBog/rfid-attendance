import React, { useState } from 'react';
import AdminDashboard from "./components/pages/admin/AdminDashboard"; 
import AdminLogin from "./components/pages/admin/AdminLogin";

const App = () => {
  // LOGIN & LOGOUT
  const adminUser = {
    username: 'luan',
    password: 'luan'
  }

  const [user, setUser] = useState({username: ''});
  const [error, setError] = useState('');

  const login = (details) => {
    if(details.username !== adminUser.username 
      || details.password !== adminUser.password) {
      console.log("User is not found!");
      setError("User is not found!");
      return;
    }

    setUser({
      username: details.username
    });

    console.log("Logged in! Welcome");
  }

  const logout = () => {
    setUser({username: ''});
    console.log("Logged out");
  }

  const forgotPassword = () => {
    alert("Tanga mo naman");
  }

  return (
    <div className="App">
      {(user.username !== '' && user.email !== '') ? (
        <AdminDashboard user={user} logout={logout} />
      ) : (
        <AdminLogin login={login} error={error} forgotPassword={forgotPassword} />
      )}
    </div>
  );
}

export default App;
