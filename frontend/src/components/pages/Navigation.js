import React from "react";
import { useAuth } from "../utils/authentication/auth";

const Navigation = () => {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/login'>Login</a></li>

        {auth.loggedIn() ? <li><a href='/dashboard' className='logged-in-color'>Dashboard</a></li> : ''}
      </ul>
    </nav>
  );
}

export default Navigation;
