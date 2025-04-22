import React, { useState } from 'react';
import {
    Text,
    Pressable,
    SafeAreaView,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import { router } from 'expo-router';
import {useTheme} from "../../theme/themeContext";
import logoDark from "../../assets/images/logoDark.png"
import logoLight from "../../assets/images/logoLight.png"
import {Formik} from "formik";
import {Entypo} from "@expo/vector-icons";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const logo = theme.scheme==="dark"? logoDark : logoLight;

    const handleSignin = async =>{
        console.log("signing in...");
    }

    return (
        <SafeAreaView className={"flex-1 justify-center items-center gap-6"} style={{backgroundColor:theme.background}}>
            <View className={"w-full flex justify-center items-center "}>
                <Image source={logo} resizeMode={"cover"} style={{height:350,width:350}} />
            </View>
            <View className={"px-10 my-2 gap-3 w-full"}>
            {/*    <Formik*/}
            {/*    initialValues={{ email: "", password: "" }}*/}
            {/*    validationSchema={validationSchema}*/}
            {/*    onSubmit={handleSignin}*/}
            {/*    >*/}
            {/*    {({*/}
            {/*          handleChange,*/}
            {/*          handleBlur,*/}
            {/*          handleSubmit,*/}
            {/*          values,*/}
            {/*          errors,*/}
            {/*          touched,*/}
            {/*      }) => (*/}
            {/*        <View className="w-full">*/}
            {/*            <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>*/}
            {/*            <TextInput*/}
            {/*                className="h-16 border border-white text-white rounded px-2"*/}
            {/*                keyboardType="email-address"*/}
            {/*                onChangeText={handleChange("email")}*/}
            {/*                value={values.email}*/}
            {/*                onBlur={handleBlur("email")}*/}
            {/*            />*/}

            {/*            {touched.email && errors.email && (*/}
            {/*                <Text className="text-red-500 text-xs mb-2">*/}
            {/*                    {errors.email}*/}
            {/*                </Text>*/}
            {/*            )}*/}
            {/*            <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>*/}
            {/*            <View className="h-16 border border-white text-white rounded px-2 flex flex-row justify-between items-center">*/}
            {/*                <TextInput className={"flex-1 text-white"}*/}
            {/*                           secureTextEntry={passwordVisibility}*/}
            {/*                           onChangeText={handleChange("password")}*/}
            {/*                           value={values.password}*/}
            {/*                           onBlur={handleBlur("password")}*/}
            {/*                />*/}
            {/*                <TouchableWithoutFeedback className={"p-2"} onPress={toggleIconName}>*/}
            {/*                    <Entypo name={iconName} size={28} color={colors.PRIMARY} />*/}
            {/*                </TouchableWithoutFeedback>*/}
            {/*            </View>*/}

            {/*            {touched.password && errors.password && (*/}
            {/*                <Text className="text-red-500 text-xs mb-2">*/}
            {/*                    {errors.password}*/}
            {/*                </Text>*/}
            {/*            )}*/}

            {/*            <TouchableOpacity*/}
            {/*                onPress={handleSubmit}*/}
            {/*                className="p-2 my-2 bg-[#f49b33]  text-black rounded-lg mt-10"*/}
            {/*            >*/}
            {/*                <Text className="text-lg font-semibold text-center">*/}
            {/*                    Sign In*/}
            {/*                </Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*</Formik>*/}
                <TouchableOpacity className={"w-full rounded-full p-4"} style={{backgroundColor:theme.buttonBg}} onPress={() => {router.replace("/home")}}>
                    <Text className={"text-center text-lg font-semibold"} style={{color:theme.buttonText}}>SignUp</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
);
}

