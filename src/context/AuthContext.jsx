import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const displayId = localStorage.getItem("displayId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        id,
        displayId,
        role,
        token,
        name,
      });
    }
  }, []);

  const login = (data) => {
    setUser(data);

    localStorage.setItem("id", data.id);
    localStorage.setItem("displayId", data.displayId);
    localStorage.setItem("role", data.role);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
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
