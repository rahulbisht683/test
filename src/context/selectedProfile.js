// ThemeContext.js

import React, {createContext, useState, useContext} from 'react';

const SelectedProfileContext = createContext();

export const SelectedProfileProvider = ({children}) => {
  const [selectedData, setSelectedData] = useState();

  const changeData = sprofile => {
    setSelectedData(data);
  };

  const selecteddata = selectedData;

  return (
    <SelectedProfileContext.Provider value={{selecteddata, changeData}}>
      {children}
    </SelectedProfileContext.Provider>
  );
};

export const selectedprofile = () => useContext(SelectedProfileContext);
