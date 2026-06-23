// components/ModelSoundViewer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ModelViewer from './ModelViewer';
import AudioPlayer from './AudioPlayer';
import { usePreload } from './PreloadContext'; // Import the preload hook

interface ModelSoundViewerProps {
  modelPath: string;
  soundPath: string;
  zoom: number;
  onNext: () => void;
  onPrevious: () => void;
}

const ModelSoundViewer: React.FC<ModelSoundViewerProps> = ({ modelPath, soundPath, zoom, onNext, onPrevious }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const { models, audio } = usePreload(); // Use preloaded assets

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      onNext();
    } else if (event.key === 'ArrowLeft') {
      onPrevious();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Check if the model is already loaded
    if (models[modelPath]) {
      setIsModelLoaded(true);
    }
  }, [modelPath, models]);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isModelLoaded ? (
          <motion.div
            key={modelPath}
            initial={{ opacity: 0, transform: 'scale(0.8)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(2)' }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <ModelViewer modelPath={modelPath} zoom={zoom} />
          </motion.div>
        ) : (
          <div
            key="loading"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          >
            Loading...
          </div>
        )}
      </AnimatePresence>
      <AudioPlayer soundPath={soundPath} audioElement={audio[soundPath]} />
    </div>
  );
};

export default ModelSoundViewer;
