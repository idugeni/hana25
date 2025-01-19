'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useMetadata } from '@/utils/MetadataContext';
import { motion } from 'framer-motion';

export default function DeleteMoment() {
  const router = useRouter();
  const [momentId, setMomentId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');

  // Menambahkan metadata untuk halaman delete
  useMetadata(
    'Delete Moment | Remove Your Cherished Memories',
    'Delete a cherished moment permanently. Please be careful, this action cannot be undone.'
  );

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const validToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    if (accessToken !== validToken) {
      setError('Invalid access token');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the moment.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const docRef = doc(db, 'moments', momentId);
        await deleteDoc(docRef);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your moment has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        router.push('/moments');
      } catch (error) {
        console.error('Error deleting moment: ', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while deleting the moment.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center px-6 py-16 transition-all duration-300'>
      <motion.div
        className='w-full max-w-2xl bg-white p-14 rounded-2xl shadow-xl'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-semibold text-center text-gray-900 mb-8 sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300'>
          Delete Moment
        </h1>
        <form onSubmit={handleDelete} className='space-y-8'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className='floating-label'>
              <span className='text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300'>
                Moment ID
              </span>
              <input
                type='text'
                value={momentId}
                onChange={(e) => setMomentId(e.target.value)}
                placeholder='Enter the moment ID'
                className='input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg transition-all duration-300'
                required
              />
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className='floating-label'>
              <span className='text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300'>
                Access Token
              </span>
              <input
                type='text'
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder='Enter your access token'
                className='input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg transition-all duration-300'
                required
              />
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              type='submit'
              className='w-full px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300'
            >
              Delete Moment
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
