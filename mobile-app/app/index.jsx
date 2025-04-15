// app/index.jsx
import {View, Button, Text, Pressable} from 'react-native';
import { router } from 'expo-router';
import {useTheme} from "../theme/themeContext";

export default function HomeScreen() {
    const theme = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:theme.background}}>
            <Text style={{color:theme.text}}>Select Mode:</Text>
            <Pressable onPress={() => {router.push("/login")}}>
                <Text className={"bg-amber-400 p-4"}>login</Text>
            </Pressable>
        </View>
    );
}
