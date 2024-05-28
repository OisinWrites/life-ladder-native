import React, { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    return (
        <KeyboardContext.Provider value={{ isKeyboardVisible, setIsKeyboardVisible }}>
            {children}
        </KeyboardContext.Provider>
    );
};

export const useKeyboard = () => useContext(KeyboardContext);
