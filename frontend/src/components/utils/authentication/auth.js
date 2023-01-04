import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({username: '', password: ''});

  useEffect(() => {
    const userCookie = Cookies.get('user');

    if(userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 2 });
    setUser(user);
    console.log('Logged in!');
  }
  
  const logout = () => {
    Cookies.remove('user');
    setUser({username: '', password: ''});
  }

  const loggedIn = () => {
    return user.username !== '' && user.password !== '';
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
