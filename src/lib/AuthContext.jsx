import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState({ name: "Victor", email: "victor@example.com" });
  const [isAuthenticated] = useState(true);
  const [isLoadingAuth] = useState(false);
  const [isLoadingPublicSettings] = useState(false);
  const [authError] = useState(null);

  const logout = () => {
    console.log("Logout clicked");
  };

  const navigateToLogin = () => {
    console.log("Navigate to login");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      authChecked: true,
      appPublicSettings: {},
      logout,
      navigateToLogin,
      checkUserAuth: () => {},
      checkAppState: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};