import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const MODEL_PATH = '/imagenes/models/MueladelDiablo1-v1 (1).glb';

export default function IntroModel() {
  const gltf = useGLTF(MODEL_PATH);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

// Preload del modelo para mejor performance
useGLTF.preload(MODEL_PATH);
