import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ARModelView from "../components/Ar3dScene";

export default function ThreeDScanScreen({ navigation }) {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photos, setPhotos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isObjectProcessed, setIsObjectProcessed] = useState(false);
    const [modelUrl, setModelUrl] = useState(null);
    const staticModelUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';


    const capturePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotos([...photos, photo]);
        }
    };

    // const uploadPhotos = async () => {
    //     setIsUploading(true);
    //     const formData = new FormData();
    //     photos.forEach((photo, index) => {
    //         formData.append('images', {
    //             uri: photo.uri,
    //             name: `image_${index}.jpg`,
    //             type: 'image/jpeg',
    //         });
    //     });
    //
    //     const res = await fetch('https://your-server.com/generate-3d', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: formData,
    //     });
    //
    //     const result = await res.json();
    //     setModelUrl(result.modelUrl); // e.g., link to .glb model
    //     setIsUploading(false);
    //
    //     navigation.navigate('ARModelView', { modelUrl: result.modelUrl });
    // };

    const uploadPhotos = async () => {
        setIsUploading(true);

        // simulate backend delay
        setTimeout(() => {
            setIsUploading(false);
            setIsObjectProcessed(true);
        }, 2000);
    };


    if (!permission?.granted) {
        return <Text>Camera permission is required.</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} />

            {isObjectProcessed ? (
                <ARModelView />
            ) : (
                <View style={styles.controls}>
                    <TouchableOpacity onPress={capturePhoto} style={styles.button}>
                        <Text style={styles.buttonText}>Capture Angle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={uploadPhotos} style={styles.button}>
                        <Text style={styles.buttonText}>Generate 3D</Text>
                    </TouchableOpacity>
                    {isUploading && <ActivityIndicator color="#fff" />}
                </View>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    controls: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#00A8E8',
        padding: 12,
        borderRadius: 20,
    },
    buttonText: { color: '#fff', fontSize: 16 },
});
