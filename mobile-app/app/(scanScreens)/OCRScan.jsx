import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {router} from "expo-router";
import ARTextOverlay from "../../components/ArTextScene";

const OCRScan = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [scannedText, setScannedText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestPermission();
        MediaLibrary.requestPermissionsAsync();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedPhoto(photo);
        }
    };

    const sendToBackend = async () => {
        console.log("Data received from backend");
        setLoading(true);
        console.log("passing data to AR view");
        setScannedText("hello there");


    };

    return (
        scannedText ? (<ARTextOverlay scannedText={scannedText} />) :
        <View style={styles.container}>
            {!capturedPhoto ? (
                <CameraView ref={cameraRef} style={styles.camera} />
            ) : (
                <Image source={{ uri: capturedPhoto.uri }} style={styles.preview} />
            )}

            <View style={styles.buttonContainer}>
                {!capturedPhoto ? (
                    <Button title="Take Photo" onPress={takePhoto} />
                ) : (
                    <>
                        <Button title="Scan Text" onPress={sendToBackend} />
                        <Button title="Retake" onPress={() => setCapturedPhoto(null)} />
                    </>
                )}
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ margin: 10 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    camera: { flex: 1 },
    preview: { flex: 1, resizeMode: 'cover' },
    buttonContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
    },
    resultBox: {
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
});

export default OCRScan;
