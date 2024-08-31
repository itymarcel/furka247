// components/ModelSoundViewer.tsx
import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';  // Importing motion from Framer Motion
import ModelViewer from './ModelViewer';
import AudioPlayer from './AudioPlayer';

interface ModelSoundViewerProps {
  modelPath: string;
  soundPath: string;
  zoom: number;
  onNext: () => void;
  onPrevious: () => void;
}

const ModelSoundViewer: React.FC<ModelSoundViewerProps> = ({ modelPath, soundPath, zoom, onNext, onPrevious }) => {
  const modelRef = useRef(null);


  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      onNext();
    } else if (event.key === 'ArrowLeft') {
      onPrevious();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AnimatePresence>
        <ModelViewer modelPath={modelPath} zoom={zoom} />
      </AnimatePresence>
      <AudioPlayer soundPath={soundPath} />
    </div>
  );
};

export default ModelSoundViewer;
