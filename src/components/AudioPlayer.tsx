'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleError = () => console.error('Error loading audio file');
      const handleOtherPlayers = () => {
        document.querySelectorAll('audio').forEach((el) => {
          if (el !== audio) el.pause();
        });
      };

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handleOtherPlayers);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', handleOtherPlayers);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  return (
    <div>
      <button
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className='fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full text-white shadow-md focus:outline-none transition-all duration-300 ease-in-out'
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>
      <audio
        ref={audioRef}
        loop
        src='/assets/media/Ed Sheeran - Photograph.mp3'
        className='hidden'
      />
    </div>
  );
};

export default AudioPlayer;
