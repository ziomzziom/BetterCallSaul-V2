import React, { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set the default value to true/false

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export { DarkModeProvider, useDarkMode };
