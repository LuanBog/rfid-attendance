import React from 'react';
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
  return (
    <AuthProvider>
      <Router> 
        <Routes>
          <Route path='/dashboard' element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          <Route path='/studentview' element={<RequireAuth><StudentView /></RequireAuth>} />
          <Route path='/studentcreate' element={<RequireAuth><StudentCreate /></RequireAuth>} />
          <Route path='/studentedit/:id' element={<RequireAuth><StudentEdit /></RequireAuth>} />

          <Route path='/login' element={<AdminLogin />} />
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

// https://www.youtube.com/watch?v=GihQAC1I39Q
//! WATCH: https://www.youtube.com/results?search_query=how+to+use+usecontext+in+react
