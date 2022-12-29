import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import Cookies from "js-cookie";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if(!auth.loggedIn() && !Cookies.get('user')) {
    console.log('Blocked');
    return <Navigate to="/login" />
  }

  return children;
}
