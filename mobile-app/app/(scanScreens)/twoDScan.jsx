import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import logo from "../../assets/images/logoDark.png"

export default function TwoDScan() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedImage, setProcessedImage] = useState(null);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ base64: false });
            setCapturedPhoto(photo);
            await processPhoto(photo);
        }
    };

    const processPhoto = async (photo) => {
        setIsProcessing(true);
        // try {
        //     const formData = new FormData();
        //     formData.append('image', {
        //         uri: photo.uri,
        //         name: 'photo.jpg',
        //         type: 'image/jpeg',
        //     });
        //
        //     const response = await fetch('https://your-server.com/remove-background', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         body: formData,
        //     });
        //
        //     const result = await response.json();
        //     setProcessedImage(result.cleanedImageUrl); // server should return a cleanedImageUrl
        setProcessedImage(logo); // server should return a cleanedImageUrl
        // } catch (error) {
        //     console.error('Error processing image:', error);
        // } finally {
        setIsProcessing(false);
        // }
    };

    const resetScan = () => {
        setCapturedPhoto(null);
        setProcessedImage(null);
    };

    if (!permission?.granted) {
        return <Text>Camera permission is required.</Text>;
    }

    return (
        <View style={styles.container}>
            {!capturedPhoto ? (
                <CameraView ref={cameraRef} style={styles.camera} />
            ) : isProcessing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Processing...</Text>
                </View>
            ) : (
                <CameraView style={styles.camera}>
                    {/*<Image source={{ uri: processedImage }} style={styles.previewImage} />*/}
                    <Image source={logo} style={styles.previewImage} />
                </CameraView>
            )}

            <View style={styles.controls}>
                {!capturedPhoto ? (
                    <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
                        <Text style={styles.buttonText}>Capture</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={resetScan} style={styles.resetButton}>
                        <Text style={styles.buttonText}>Scan Again</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    controls: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    captureButton: {
        backgroundColor: '#00A8E8',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    resetButton: {
        backgroundColor: '#FF6363',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
    previewContainer: {
        flex: 1,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
