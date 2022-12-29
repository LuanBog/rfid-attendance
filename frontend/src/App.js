import React from 'react';
import AdminDashboard from "./components/pages/admin/AdminDashboard"; 
import Login from "./components/pages/Login";
import StudentView from './components/pages/admin/StudentView';
import StudentCreate from './components/pages/admin/StudentCreate';
import StudentEdit from './components/pages/admin/StudentEdit';
import { AuthProvider } from './components/utils/authentication/auth';
import { RequireAuth } from './components/utils/authentication/RequireAuth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router> 
        <Routes>
          <Route path='/dashboard' element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          <Route path='/studentview' element={<RequireAuth><StudentView /></RequireAuth>} />
          <Route path='/studentcreate' element={<RequireAuth><StudentCreate /></RequireAuth>} />
          <Route path='/studentedit/:id' element={<RequireAuth><StudentEdit /></RequireAuth>} />

          <Route path='/login' element={<Login />} />
        </Routes>
      </Router> 
    </AuthProvider>
  );
}

export default App;
