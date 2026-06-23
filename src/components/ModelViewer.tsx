// components/ModelViewer.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePreload } from './PreloadContext'; // Import the preload hook

interface ModelViewerProps {
  modelPath: string;
  zoom: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, zoom }) => {
  const { models } = usePreload(); // Use preloaded models
  const gltf = models[modelPath]; // Get the preloaded model
  
  return (
    <Canvas camera={{ position: [0, 0, 2] }} style={{ width: '100%', height: '100%' }}>
      <ambientLight />
      {gltf && <primitive object={gltf.scene} />} {/* Accessing gltf.scene correctly */}
      <OrbitControls enableZoom={true} zoom0={zoom} enablePan={false} />
    </Canvas>
  );
};

export default ModelViewer;
