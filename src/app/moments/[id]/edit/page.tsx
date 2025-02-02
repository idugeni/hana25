'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useMetadata } from '@/utils/MetadataContext';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

export default function EditMoment() {
  useMetadata(
    'Edit Moment | Update Your Memory',
    'Edit an existing moment in your collection. Update the title, description, and media details.'
  );

  const router = useRouter();
  const params = useParams();
  const momentId = params.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaId, setMediaId] = useState('');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(
    'landscape'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const momentRef = doc(db, 'moments', momentId);
        const momentSnap = await getDoc(momentRef);

        if (momentSnap.exists()) {
          const data = momentSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setMediaType(data.mediaType);
          setMediaId(data.mediaId);
          setOrientation(data.orientation);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Moment not found.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          router.push('/moments');
        }
      } catch (error) {
        console.error('Error fetching moment: ', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load moment details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMoment();
  }, [momentId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const momentRef = doc(db, 'moments', momentId);
      await updateDoc(momentRef, {
        title,
        description,
        mediaType,
        mediaId,
        orientation,
        updatedAt: new Date()
      });

      Swal.fire({
        title: 'Success!',
        text: 'Your moment has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      router.push('/moments');
    } catch (error) {
      console.error('Error updating document: ', error);

      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while updating the moment.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center'>
        <div className='text-white text-2xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center px-6 py-16'>
      <motion.div
        className='w-full max-w-2xl bg-white p-14 rounded-2xl shadow-xl'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-3xl font-semibold text-center text-gray-900 mb-8 sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300'>
          Edit Moment
        </h1>
        <motion.form
          onSubmit={handleSubmit}
          className='space-y-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <motion.label
              className='floating-label'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <span className='text-gray-800'>Title</span>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter the title'
                className='input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                autoComplete='off'
              />
            </motion.label>
          </div>

          <div>
            <motion.fieldset
              className='fieldset'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <legend className='fieldset-legend'>Description</legend>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter the description'
                className='textarea h-24 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                autoComplete='off'
                style={{ resize: 'none' }}
              />
            </motion.fieldset>
          </div>

          <div className='space-y-4'>
            <motion.label
              className='block text-gray-800 text-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              Select Media Type
            </motion.label>
            <div className='flex items-center space-x-4'>
              <div>
                <input
                  type='radio'
                  id='image'
                  name='mediaType'
                  className='radio radio-xs radio-primary'
                  checked={mediaType === 'image'}
                  onChange={() => setMediaType('image')}
                />
                <label htmlFor='image' className='ml-2 text-gray-800'>
                  Image
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='video'
                  name='mediaType'
                  className='radio radio-xs radio-primary'
                  checked={mediaType === 'video'}
                  onChange={() => setMediaType('video')}
                />
                <label htmlFor='video' className='ml-2 text-gray-800'>
                  Video
                </label>
              </div>
            </div>
          </div>

          <div>
            <motion.label
              className='floating-label'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <span className='text-gray-800'>
                {mediaType === 'image' ? 'Image ID' : 'Video ID'}
              </span>
              <input
                id='mediaId'
                type='text'
                value={mediaId}
                onChange={(e) => setMediaId(e.target.value)}
                placeholder={
                  mediaType === 'image' ? 'Enter Image ID' : 'Enter Video ID'
                }
                className='input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                autoComplete='off'
              />
            </motion.label>
          </div>

          <div className='space-y-4'>
            <motion.label
              className='block text-gray-800 text-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              Select Orientation
            </motion.label>
            <div className='flex items-center space-x-4'>
              <div>
                <input
                  type='radio'
                  id='landscape'
                  name='orientation'
                  className='radio radio-xs radio-primary'
                  checked={orientation === 'landscape'}
                  onChange={() => setOrientation('landscape')}
                />
                <label htmlFor='landscape' className='ml-2 text-gray-800'>
                  Landscape
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='portrait'
                  name='orientation'
                  className='radio radio-xs radio-primary'
                  checked={orientation === 'portrait'}
                  onChange={() => setOrientation('portrait')}
                />
                <label htmlFor='portrait' className='ml-2 text-gray-800'>
                  Portrait
                </label>
              </div>
            </div>
          </div>

          <div className='flex space-x-4'>
            <motion.button
              type='submit'
              className='flex-1 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              Update Moment
            </motion.button>
            <motion.button
              type='button'
              onClick={() => router.push('/moments')}
              className='flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
