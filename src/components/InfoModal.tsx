// components/InfoModal.tsx
import React from 'react';

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', zIndex: 1000 
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 5 }}>
        <h2>Information</h2>
        <p>This is some information about the landscapes and the recordings.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InfoModal;
