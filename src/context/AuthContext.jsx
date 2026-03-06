import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const displayId = localStorage.getItem("displayId");
    const role = localStorage.getItem("role");

    if (token) {
      setUser({
        token,
        displayId,
        role,
      });
    }
  }, []);

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
