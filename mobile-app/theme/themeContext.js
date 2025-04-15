import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
    background: '#ffffff',
    text: '#000000',
};

const darkTheme = {
    background: '#1a1a1a',
    text: '#ffffff',
    secondText: '#504f4f',
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
