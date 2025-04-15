import { Stack } from 'expo-router';
import "../global.css";
import { ThemeProvider } from "../theme/themeContext";
import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync(); // Important: Keep splash visible until fonts load

export default function Layout() {
    const [fontsLoaded] = useFonts({
        'RobotoMono': require('../assets/fonts/RobotoMono.ttf'),
        'Inter': require('../assets/fonts/Inter.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <ThemeProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="/" />
                    <Stack.Screen name="(auth)" />
                </Stack>
            </ThemeProvider>
        </View>
    );
}
