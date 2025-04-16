import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
    scheme: 'light',
    background: '#ffffff',
    text: '#000000',
    secondText: '#2b2a2a',
    buttonText: '#ffffff',
    buttonBg: '#2b2a2a',
};

const darkTheme = {
    scheme: 'dark',
    background: '#1a1a1a',
    text: '#ffffff',
    secondText: '#afafaf',
    buttonText: '#000000',
    buttonBg: '#afafaf',
};

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();

    const theme = useMemo(() => {
        console.log("systemScheme :", systemScheme);
        return systemScheme === 'dark' ? darkTheme : lightTheme;
    }, [systemScheme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
