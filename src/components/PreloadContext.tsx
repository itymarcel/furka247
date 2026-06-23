// PreloadContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// Define a type for the cache
interface AssetCache {
  models: Record<string, GLTF>;
  audio: Record<string, HTMLAudioElement>;
}

// Create context
const PreloadContext = createContext<AssetCache | null>(null);

// PreloadProvider component
const PreloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache, setCache] = useState<AssetCache>({ models: {}, audio: {} });

  useEffect(() => {
    // List of all models and audio files to preload
    const modelsToPreload = ['/marcel.glb', '/marcel2.glb'];
    const audioToPreload = ['/marcel.mp3', '/philipp.mp3'];

    // Preload models
    modelsToPreload.forEach((modelPath) => {
      const loader = new GLTFLoader();
      loader.load(modelPath, (gltf: GLTF) => {
        setCache((prevCache) => ({
          ...prevCache,
          models: { ...prevCache.models, [modelPath]: gltf }, // Store the entire GLTF object
        }));
      });
    });

    // Preload audio files
    audioToPreload.forEach((audioPath) => {
      const audio = new Audio(audioPath);
      audio.load();
      setCache((prevCache) => ({
        ...prevCache,
        audio: { ...prevCache.audio, [audioPath]: audio },
      }));
    });
  }, []);

  return <PreloadContext.Provider value={cache}>{children}</PreloadContext.Provider>;
};

// Custom hook to use preload context
export const usePreload = () => {
  const context = useContext(PreloadContext);
  if (!context) {
    throw new Error('usePreload must be used within a PreloadProvider');
  }
  return context;
};

export default PreloadProvider;
