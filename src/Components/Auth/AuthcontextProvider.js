import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime, isAdmin) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const isAdmin = localStorage.getItem("isAdmin");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isAdmin");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    isAdmin: isAdmin,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  let initialIsAdmin = false
  if (tokenData) {
    initialToken = tokenData.token;
    initialIsAdmin = tokenData.isAdmin;
  }

  const [token, setToken] = useState(initialToken);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isAdmin");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, isAdmin) => {
    setToken(token);
    setIsAdmin(isAdmin);
    
    // Calculate expiration time (30 days from now)
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const expirationDate = new Date(new Date().getTime() + thirtyDaysInMs).toISOString();
    
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationDate);
    localStorage.setItem("isAdmin", isAdmin);

    const remainingTime = calculateRemainingTime(expirationDate);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isAdmin: isAdmin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
