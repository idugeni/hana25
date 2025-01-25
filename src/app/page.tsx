'use client';

import Link from 'next/link';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';
import { FaGifts } from 'react-icons/fa6';

export default function Home() {
  const message =
    'Di usia ke-25 ini, semoga selalu diberkahi dengan cinta, kebahagiaan, dan kesuksesan. Terima kasih telah menjadi bagian terbaik dalam hidupku.';

  const characters = message.split('');

  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white relative flex items-center justify-center'>
      <Snowfall
        snowflakeCount={
          typeof window !== 'undefined' && window.innerWidth < 768 ? 75 : 150
        }
        speed={[0.5, 0.5]}
        radius={[1, 3]}
        color='white'
      />

      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='max-w-5xl text-center'>
          <motion.h1
            className='text-[clamp(2rem,5vw,4rem)] font-extrabold mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className='text-yellow-300'>Selamat</span>{' '}
            <span className='text-blue-800'>Ulang Tahun!</span>
          </motion.h1>

          <motion.h2
            className='text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-shadow-lg'
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
          >
            <span className='bg-secondary rounded-full text-white px-4 sm:px-6 py-2 shadow-md'>
              Rikhanatun Ni&apos;mah
            </span>
          </motion.h2>

          <motion.p
            className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.1,
                  ease: [0.42, 0, 0.58, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          <Link href='/gift'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn btn-wide btn-primary btn-circle px-6 sm:px-10 transition-colors duration-300 ease-in-out hover:bg-purple-600 hover:text-white'
            >
              <FaGifts className='mr-3 sm:mr-4 text-xl sm:text-2xl md:text-3xl transition-colors duration-300 ease-in-out' />
              Lihat Kejutan
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
