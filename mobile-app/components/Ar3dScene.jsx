import React, { useRef } from 'react';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
    GestureHandlerRootView,
    PinchGestureHandler,
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';

export default function ARModelView() {
    const modelRef = useRef();
    const rotation = useRef({ x: 0, y: 0 });
    const scale = useRef(1);

    const panSensitivity = 0.0005;
    const pinchSensitivity = 1.0;

    const onPanEvent = (event) => {
        const { translationX, translationY } = event.nativeEvent;
        if (modelRef.current) {
            rotation.current.y += translationX * panSensitivity;
            rotation.current.x += translationY * panSensitivity;
        }
    };

    const onPinchEvent = (event) => {
        const pinchScale = event.nativeEvent.scale;
        if (modelRef.current) {
            let newScale = scale.current * pinchScale * pinchSensitivity;
            newScale = Math.max(0.1, Math.min(newScale, 5));
            modelRef.current.scale.set(newScale, newScale, newScale);
        }
    };

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.state === State.END && modelRef.current) {
            scale.current = modelRef.current.scale.x;
        }
    };

    const onContextCreate = async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2;

        const renderer = new Renderer({ gl, alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // Transparent background

        scene.add(new THREE.AmbientLight(0xffffff, 1));

        const modelAsset = Asset.fromModule(require('../assets/models/ball_pen.glb'));
        await modelAsset.downloadAsync();

        const loader = new GLTFLoader();
        loader.load(
            modelAsset.localUri || modelAsset.uri,
            (gltf) => {
                // const model = gltf.scene;
                // scene.add(model);
                // modelRef.current = model;

                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                const model = new THREE.Mesh(geometry, material);
                scene.add(model);

                const edges = new THREE.EdgesGeometry(geometry);
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // black edges
                const wireframe = new THREE.LineSegments(edges, lineMaterial);
                model.add(wireframe);

                modelRef.current=model;

                const box = new THREE.Box3().setFromObject(model);
                const size = new THREE.Vector3();
                const center = new THREE.Vector3();
                box.getSize(size);
                box.getCenter(center);

                const maxDim = Math.max(size.x, size.y, size.z);
                const scaleFactor = 1.5 / maxDim;
                model.scale.setScalar(scaleFactor);
                model.position.sub(center.multiplyScalar(scaleFactor));

                scale.current = scaleFactor;

                console.log('Model loaded and positioned');
            },
            undefined,
            (error) => {
                console.error('Model load error:', error);
            }
        );

        const animate = () => {
            requestAnimationFrame(animate);

            if (modelRef.current) {
                modelRef.current.rotation.x = rotation.current.x;
                modelRef.current.rotation.y = rotation.current.y;
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        animate();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler
                onGestureEvent={onPanEvent}
                minPointers={1}
                maxPointers={2}
            >
                <PinchGestureHandler
                    onGestureEvent={onPinchEvent}
                    onHandlerStateChange={onPinchStateChange}
                    minPointers={2}
                >
                    <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
                </PinchGestureHandler>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}
