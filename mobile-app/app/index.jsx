// app/index.jsx
import {View,  Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import {useTheme} from "../theme/themeContext";
import {StatusBar} from "expo-status-bar";
import logo from "../assets/images/logo.png"

export default function HomeScreen() {
    const theme = useTheme();

    return (
        <>
         <StatusBar backgroundColor={theme.background} />
            <SafeAreaView className={"flex-1 justify-center"} style={{backgroundColor:theme.background}}>
                <View className={"w-full flex justify-center items-center "}>
                    <Image source={logo} resizeMode={"cover"} style={{height:350,width:350}} />
                </View>
                <View className={"ml-10 mb-20 gap-4"}>
                    <Text className={"text-4xl font-semibold "} style={{color:theme.text,fontFamily:"Inter"}}>
                        The bridge </Text>
                    <Text className={"text-4xl font-semibold "} style={{color:theme.text,fontFamily:"Inter"}}>between  real </Text>
                    <Text className={"text-4xl font-semibold "} style={{color:theme.text,fontFamily:"Inter"}}>and virtual </Text>
                    <Text className={"text-4xl font-semibold "} style={{color:theme.text,fontFamily:"Inter"}}>worlds.</Text>
                </View>
                <View className={"px-10 my-2 gap-3"}>
                    <Text className={"font-semibold text-xl ml-6"} style={{color:theme.secondText}}>New User ?</Text>
                   <View className={"w-full rounded-full p-2 border-2"} style={{borderColor:theme.buttonBg}} >
                       <TouchableOpacity className={"w-full rounded-full p-4"} style={{backgroundColor:theme.buttonBg}}>
                           <Text className={"text-center text-lg font-semibold"}>Create Account</Text>
                       </TouchableOpacity>
                   </View>
                </View>
                <View className={"px-10 my-2 gap-6"}>
                    <View className={"flex flex-row justify-center w-full gap-3"} style={{borderColor:theme.text}} >
                        <View className={"border-b w-28"}  style={{borderColor:theme.text}}/>
                        <Text className={"text-md text-center font-semibold"} style={{color:theme.text}}>OR</Text>
                        <View className={"border-b w-28"}  style={{borderColor:theme.text}}/>
                    </View>
                    <TouchableOpacity className={"w-full rounded-full border-2 p-5"} style={{borderColor:theme.buttonBg}} >
                        <Text className={"text-center text-xl font-semibold"} style={{color:theme.text}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
           </SafeAreaView>
        </>
    );
}
