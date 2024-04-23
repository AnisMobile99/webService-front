import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("accessToken"), // Récupérer le token du localStorage au démarrage
    isAuthenticated: !!localStorage.getItem("accessToken"),
  });

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setAuth({
      token: token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
