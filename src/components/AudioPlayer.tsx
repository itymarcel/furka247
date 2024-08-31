// components/AudioPlayer.tsx
import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  soundPath: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ soundPath }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioEnd = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
          }
        }, 1000); // Fade-in effect
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleAudioEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [soundPath]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={soundPath} loop />
      {!isPlaying ? (
        <button onClick={handlePlay}>Play</button>
      ) : (
        <button onClick={handlePause}>Pause</button>
      )}
    </div>
  );
};

export default AudioPlayer;
