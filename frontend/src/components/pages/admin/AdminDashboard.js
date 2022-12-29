import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../utils/authentication/auth';
import { toTitle } from '../../utils/String';

const AdminDashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/login');
  }

  return (
    <>
      <button onClick={logout}>Logout</button>

      {/* PUT THIS CODE BELOW menu left-side WHEN DOING STYLING */}
      <div className="right-side"> 
        <h1>Welcome, {toTitle(auth.user.username)}!</h1>
      </div>

      <div className="menu left-side">
        <button>Manage Sections</button>
        <Link to='/studentview'><button>Manage Students</button></Link>
        <button>View Attendance</button>
      </div>

    </>
  );
}

export default AdminDashboard
