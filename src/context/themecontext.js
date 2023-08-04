// ThemeContext.js

import React, {createContext, useState, useContext} from 'react';
import {darkTheme, lightTheme} from '../components/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const themetype = isDarkMode;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, themetype}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
