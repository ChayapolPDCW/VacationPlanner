"use client";

import { createContext, useContext, useState, useEffect } from "react";

const APP_USER_STORAGE_KEY = "vacation-planner-user";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(APP_USER_STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(APP_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(APP_USER_STORAGE_KEY);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
