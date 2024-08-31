// components/ModelViewer.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

interface ModelViewerProps {
  modelPath: string;
  zoom: number; // Accept zoom prop
}

const Model: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);
  console.log('using model path: ', modelPath)
  return <primitive object={gltf.scene}/>;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, zoom }) => {
  // Define Framer Motion variants for enter and exit animations
  const variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }} // Adjust the duration for smooth transition
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas camera={{ position: [0, 0, 2] }} style={{width: '100%', height: '100%'}}>
        <ambientLight />
        <Model modelPath={modelPath} />
        <OrbitControls zoom0={zoom} enablePan={false} />
      </Canvas>
      <div style={{position: 'absolute', left: 0, top: 0, zIndex: 100}}>{modelPath}</div>
    </motion.div>
  );
};

export default ModelViewer;
