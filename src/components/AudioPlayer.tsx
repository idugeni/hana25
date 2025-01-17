'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => console.warn('Interaksi pengguna diperlukan.'));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full text-white shadow-md focus:outline-none transition-all duration-300 ease-in-out"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <FaPause size={16} />
        ) : (
          <FaPlay size={16} />
        )}
      </button>
      <audio
        ref={audioRef}
        loop
        autoPlay
        src="/assets/media/Ed Sheeran - Photograph.mp3"
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
