import React from 'react';
import AdminDashboard from "./components/pages/admin/AdminDashboard"; 
import Login from "./components/pages/Login";

import StudentView from './components/pages/admin/students/StudentView';
import StudentCreate from './components/pages/admin/students/StudentCreate';
import StudentEdit from './components/pages/admin/students/StudentEdit';

import SectionView from './components/pages/admin/sections/SectionView';
import SectionCreate from './components/pages/admin/sections/SectionCreate';
import SectionEdit from './components/pages/admin/sections/SectionEdit';

import LandingPage from './components/pages/LandingPage';
import Navigation from './components/pages/Navigation';

import { AuthProvider } from './components/utils/authentication/auth';
import { RequireAuth } from './components/utils/authentication/RequireAuth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './components/css/styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />

      <Router> 
        <Routes>
          <Route path='/dashboard' element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          <Route path='/studentview' element={<RequireAuth><StudentView /></RequireAuth>} />
          <Route path='/studentcreate' element={<RequireAuth><StudentCreate /></RequireAuth>} />
          <Route path='/studentedit/:id' element={<RequireAuth><StudentEdit /></RequireAuth>} />

          <Route path='/sectionview' element={<RequireAuth><SectionView /></RequireAuth>} />
          <Route path='/sectioncreate' element={<RequireAuth><SectionCreate /></RequireAuth>} />
          <Route path='/sectionedit/:id' element={<RequireAuth><SectionEdit /></RequireAuth>} />

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </Router> 
    </AuthProvider>
  );
}

export default App;
