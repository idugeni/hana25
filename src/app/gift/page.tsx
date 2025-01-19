'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useMetadata } from '@/utils/MetadataContext';
import { FaGift } from 'react-icons/fa6';

const GiftCard = () => {
  useMetadata(
    "Special Gift for Rikhanatun Ni'mah!",
    "A heartfelt and romantic gift card for Rikhanatun Ni'mah from Eliyanto Sarage."
  );

  const [showMessage, setShowMessage] = useState(false);
  const [animateGift, setAnimateGift] = useState(false);

  const handleClick = useCallback(() => {
    setAnimateGift(true);
    setTimeout(() => {
      setAnimateGift(false);
      setShowMessage(true);
    }, 1500);
  }, []);

  const giftMessage = `  
    🎁 Untukmu, Rikhanatun Ni'mah, Cinta Sejatiku 🎁
    Setiap hari bersamamu adalah hadiah terbesar dalam hidupku.
    Aku ingin memberimu sebuah kenangan indah, yang melambangkan betapa berharganya dirimu dalam hidupku.

    Kamu adalah seseorang yang luar biasa, dan aku sangat bersyukur bisa membangun masa depan bersamamu. 
    Dengan cinta yang tulus, aku ingin memberikanmu hadiah ini, meski sederhana, sebagai simbol dari semua yang telah kita lewati bersama.

    Semoga hidup kita terus dipenuhi dengan kebahagiaan, tawa, dan cinta yang tidak pernah pudar. 
    Terima kasih telah menjadi bagian dari hidupku. 💖
  `;

  const formattedMessage = giftMessage
    .split('\n')
    .filter((line) => line.trim() !== '');

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-5'>
      <div className='text-center'>
        {!showMessage ? (
          <motion.div
            className='cursor-pointer bg-pink-100 p-8 rounded-full shadow-lg'
            onClick={handleClick}
            animate={{
              scale: animateGift ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 1, repeat: animateGift ? Infinity : 0 }}
          >
            <FaGift className='text-5xl text-yellow-300' />
          </motion.div>
        ) : (
          <motion.div
            className='mt-10 max-w-3xl p-6 bg-white shadow-xl mx-4 rounded-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className='text-xl uppercase sm:text-2xl md:text-3xl font-bold text-gray-700 mb-3'>
              Selamat Ulang Tahun, <br />
              Rikhanatun Ni&apos;mah
            </h2>
            <div className='divider my-4 sm:my-5 md:my-6'></div>

            <div className='text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed space-y-1 sm:space-y-2 md:space-y-2'>
              {formattedMessage.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 1,
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className='divider my-4 sm:my-5 md:my-6'></div>

            <div className='mt-6'>
              <motion.h3
                className='text-sm sm:text-base md:text-lg text-pink-600 font-semibold'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: formattedMessage.length * 1,
                  duration: 2,
                }}
              >
                With All My Love 💖
              </motion.h3>
              <motion.p
                className='text-xs sm:text-sm md:text-base text-gray-700 italic mt-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: formattedMessage.length * 1 + 1,
                  duration: 1.5,
                }}
              >
                Wishing us a life full of happiness and endless love together.
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftCard;
