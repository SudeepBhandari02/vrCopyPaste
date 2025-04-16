import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet, Pressable} from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <Pressable onPress={() => {router.replace("/home")}}>
                <Text>home</Text>
            </Pressable>
        </View>
);
}

