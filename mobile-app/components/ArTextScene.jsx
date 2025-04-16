import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ARTextOverlay({ scannedText = 'Hello World' }) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) return null;
  if (!permission.granted) {
    return (
        <View style={styles.centered}>
          <Text>Camera permission is required</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing="back" />
        <Pressable style={styles.overlay}>
          <Text style={styles.arText}>{scannedText}</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  arText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
