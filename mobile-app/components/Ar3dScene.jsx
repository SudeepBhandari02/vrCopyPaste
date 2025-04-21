import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ARModelView() {
    const modelRef = useRef();

    const onContextCreate = async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2;

        // Renderer setup
        const renderer = new Renderer({ gl, alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // Transparent background

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Load GLB model
        const modelAsset = Asset.fromModule(require('../assets/models/ball_pen.glb'));
        await modelAsset.downloadAsync();

        const loader = new GLTFLoader();
        loader.load(
            modelAsset.localUri || modelAsset.uri,
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
                modelRef.current = model;

                // Center and scale the model using bounding box
                const box = new THREE.Box3().setFromObject(model);
                const size = new THREE.Vector3();
                const center = new THREE.Vector3();
                box.getSize(size);
                box.getCenter(center);

                const maxDim = Math.max(size.x, size.y, size.z);
                const scaleFactor = 1 / maxDim;

                model.scale.setScalar(scaleFactor);
                model.position.sub(center.multiplyScalar(scaleFactor)); // Move to center

                console.log('✅ Final Model Position:', model.position);
                console.log('✅ Final Model Scale:', model.scale);
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        const render = () => {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        render();
    };

    return (
            <GLView
                style={StyleSheet.absoluteFill}
                onContextCreate={onContextCreate}
            />
    );
}
