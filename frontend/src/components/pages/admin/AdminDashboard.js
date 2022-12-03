import React from 'react';
import { toTitle } from '../../utils/String';

const AdminDashboard = ({ user, logout }) => {
  return (
    <>
      <button onClick={logout}>Logout</button>

      {/* PUT THIS CODE BELOW menu left-side WHEN DOING STYLING */}
      <div className="right-side"> 
        <h1>Welcome, {toTitle(user.username)}!</h1>
      </div>

      <div className="menu left-side">
        <button>Manage Sections</button>
        <button>Manage Students</button>
        <button>View Attendance</button>
      </div>

    </>
  );
}

export default AdminDashboard
