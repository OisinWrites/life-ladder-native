import React, { createContext, useContext } from 'react';

const GlobalStylesContext = createContext();

const GlobalStylesProvider = ({ children }) => {
  const styles = {
    defaultFontSize: 17,
    placeholderOpacity: 0.7,
  };

  return (
    <GlobalStylesContext.Provider value={styles}>
      {children}
    </GlobalStylesContext.Provider>
  );
};

const useGlobalStyles = () => useContext(GlobalStylesContext);

export { GlobalStylesProvider, useGlobalStyles };
