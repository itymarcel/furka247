// components/AudioPlayer.tsx
import React, { useEffect } from 'react';

interface AudioPlayerProps {
  soundPath: string;
  audioElement: HTMLAudioElement;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioElement }) => {
  useEffect(() => {
    if (audioElement) {
      audioElement.play();
    }
  }, [audioElement]);

  return null;
};

export default AudioPlayer;
