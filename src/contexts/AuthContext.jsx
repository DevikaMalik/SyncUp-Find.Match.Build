// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('syncup_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('syncup_user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('syncup_user');
//   };

//   const updateUser = (updatedData) => {
//     const updatedUser = { ...user, ...updatedData };
//     setUser(updatedUser);
//     localStorage.setItem('syncup_user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     updateUser,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("syncup_user");
    const storedToken = localStorage.getItem("syncup_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("syncup_user", JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem("syncup_token", userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("syncup_user");
    localStorage.removeItem("syncup_token");
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("syncup_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    token: localStorage.getItem("syncup_token"),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
