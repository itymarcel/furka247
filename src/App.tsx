// App.tsx
import React, { useState } from 'react';
import ModelSoundViewer from './components/ModelSoundViewer';
import InfoModal from './components/InfoModal';
import { AnimatePresence } from 'framer-motion';

const models = [
  { modelPath: '/marcel.glb', soundPath: '/marcel.mp3', zoom: 2 },
  { modelPath: '/marcel2.glb', soundPath: '/philipp.mp3', zoom: 5 },
  // Add paths for all 6 models and sounds
];

const App: React.FC = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentModelIndex((prevIndex) => {
      if (prevIndex === models.length - 1) {
        return 0
      } else {
        return prevIndex + 1
      }
    })
  }

  const handlePrevious = () => {
    setCurrentModelIndex((prevIndex) => {
      if (prevIndex === 0) {
        return models.length - 1
      } else {
        return prevIndex - 1
      }
    })
  };

  const toggleInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <div className="app" style={{ background: 'rgba(0,0,0, 0.3)', position: 'relative', height: '100vh', width: '100%' }}>
      <ModelSoundViewer
        modelPath={models[currentModelIndex].modelPath}
        soundPath={models[currentModelIndex].soundPath}
        zoom={models[currentModelIndex].zoom}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <div className="info-button" style={{ position: 'absolute', bottom: 10, right: 10, cursor: 'pointer' }} onClick={toggleInfoModal}>
        Info
      </div>
      {isInfoModalOpen && <InfoModal onClose={toggleInfoModal} />}
    </div>
  );
};

export default App;
