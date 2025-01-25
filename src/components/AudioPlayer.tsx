'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const useAudioPlayer = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayFailed, setAutoPlayFailed] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setAutoPlayFailed(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPageLoaded(true);
    const audio = audioRef.current;
    
    if (audio) {
      const handleStateChange = () => {
        setIsPlaying(!audio.paused);
      };

      const pauseOtherPlayers = () => {
        document.querySelectorAll('audio').forEach((el) => {
          if (el !== audio) el.pause();
        });
      };

      const handleError = () => {
        console.error('Error loading audio file');
        setAutoPlayFailed(true);
      };

      audio.addEventListener('play', handleStateChange);
      audio.addEventListener('pause', handleStateChange);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', pauseOtherPlayers);

      const tryAutoPlay = async () => {
        try {
          await audio.play();
        } catch {
          setAutoPlayFailed(true);
        }
      };

      tryAutoPlay();

      return () => {
        audio.removeEventListener('play', handleStateChange);
        audio.removeEventListener('pause', handleStateChange);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', pauseOtherPlayers);
      };
    }
  }, []);

  return { audioRef, isPlaying, autoPlayFailed, isPageLoaded, togglePlay };
};

const AudioPlayer = React.memo(() => {
  const { 
    audioRef, 
    isPlaying, 
    autoPlayFailed, 
    isPageLoaded, 
    togglePlay 
  } = useAudioPlayer('/assets/media/Ed Sheeran - Photograph.mp3');

  return (
    <div className='relative'>
      {isPageLoaded && autoPlayFailed && (
        <motion.div
          role='alert'
          className='alert alert-info alert-soft fixed bottom-4 right-18 p-2 shadow-lg rounded-md z-20 flex items-center space-x-2 w-72 sm:w-80 md:w-96 lg:w-[28rem] h-auto'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='stroke-info h-6 w-6 shrink-0'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <span className='text-sm'>
            Click the play button to start the music.
          </span>
        </motion.div>
      )}
      
      {isPageLoaded && (
        <motion.button
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className='fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full text-white shadow-md focus:outline-none transition-all duration-300 ease-in-out'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </motion.button>
      )}
      
      <audio
        ref={audioRef}
        preload="metadata"
        loop
        src='/assets/media/Ed Sheeran - Photograph.mp3'
        className='hidden'
      />
    </div>
  );
});

export default AudioPlayer;
