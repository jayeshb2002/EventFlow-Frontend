import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token-eventflow"));

  const login = (jwt) => {
    sessionStorage.setItem("token-eventflow", jwt);
    setToken(jwt);

    const decoded = jwtDecode(jwt);
    setRole(decoded.role); // new state
  };

  const logout = () => {
    sessionStorage.removeItem("token-eventflow");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
