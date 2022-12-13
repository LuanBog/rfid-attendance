import React, { useState } from 'react';
import AdminDashboard from "./components/pages/admin/AdminDashboard"; 
import AdminLogin from "./components/pages/admin/AdminLogin";
import StudentView from './components/pages/StudentView';
import StudentCreate from './components/pages/StudentCreate';
import StudentEdit from './components/pages/StudentEdit';
import { AuthProvider } from './components/utils/auth';
import { RequireAuth } from './components/utils/RequireAuth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  // LOGIN & LOGOUT
  // const adminUser = {
  //   username: 'luan',
  //   password: 'luan'
  // }

  // const [user, setUser] = useState({username: 'luan'});
  // const [error, setError] = useState('');

  // const login = (details) => {
  //   if(details.username !== adminUser.username 
  //     || details.password !== adminUser.password) {
  //     console.log("User is not found!");
  //     setError("User is not found!");
  //     return;
  //   }

  //   setUser({
  //     username: details.username
  //   });

  //   console.log("Logged in! Welcome");
  // }

  // const logout = () => {
  //   setUser({username: ''});
  //   console.log("Logged out");
  // }

  return (
    <AuthProvider>
      <Router> 
        <Routes>
          <Route path="studentview" element={<RequireAuth><StudentView /></RequireAuth>} />
          <Route path="studentcreate" element={<RequireAuth><StudentCreate /></RequireAuth>} />
          <Route path="studentedit/:id" element={<RequireAuth><StudentEdit /></RequireAuth>} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        </Routes>
      </Router> 
    </AuthProvider>
  );
}

export default App;

// TODOS:
// - Make a page for the route of "/" or the landing page
// - Make actual authentication, so that there's only 1 right credential or 1 wrong credential
// - Change AdminLogin to just login and put StudentCreate,Edit,View to admin folder 
