import { Stack } from 'expo-router';
import "../global.css"
import {ThemeProvider, useTheme} from "../theme/themeContext";
import {StatusBar} from "expo-status-bar";


export default function Layout() {
    const theme=useTheme()
    console.log(theme);
  return (
      <ThemeProvider>
        <StatusBar backgroundColor={theme.background} />
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name={"/"} />
            <Stack.Screen name="(auth)" />
        </Stack>
      </ThemeProvider>
  )
}
