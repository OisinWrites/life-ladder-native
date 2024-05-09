import React, { createContext, useContext, useState } from 'react';

const GlobalStylesContext = createContext();

export const useGlobalStyles = () => {
  return useContext(GlobalStylesContext);
};

export const GlobalStylesProvider = ({ children }) => {
  const [defaultFontSize] = useState(20);
  const [placeholderOpacity] = useState(0.8);

  return (
    <GlobalStylesContext.Provider value={{ defaultFontSize, placeholderOpacity }}>
      {children}
    </GlobalStylesContext.Provider>
  );
};
