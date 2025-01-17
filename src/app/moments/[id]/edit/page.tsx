'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useMetadata } from '@/utils/MetadataContext';
import { useRouter } from 'next/navigation';

interface Moment {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaId: string;
  orientation: 'landscape' | 'portrait';
}

export default function EditMoment({ params }: { params: Promise<{ id: string }> }) {
  useMetadata(
    'Edit Moment | Update Your Cherished Memories',
    'Edit the details of your moment. You can change the title, description, and media type.'
  );

  const router = useRouter();
  const [moment, setMoment] = useState<Moment | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaId, setMediaId] = useState('');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const resolvedParams = await params;
        const docRef = doc(db, 'moments', resolvedParams.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMoment({ ...data, id: resolvedParams.id } as Moment);
          setTitle(data.title);
          setDescription(data.description);
          setMediaType(data.mediaType);
          setMediaId(data.mediaId);
          setOrientation(data.orientation);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchMoment();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (moment) {
      try {
        const docRef = doc(db, 'moments', moment.id);
        await updateDoc(docRef, {
          title,
          description,
          mediaType,
          mediaId,
          orientation,
          updatedAt: new Date(),
        });

        Swal.fire({
          title: 'Success!',
          text: 'Your moment has been updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        router.push(`/moments/${moment.id}`);
      } catch (error) {
        console.error('Error updating document: ', error);

        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while updating the moment.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  if (!moment) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center z-50">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center px-6 py-16 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white p-14 rounded-2xl shadow-xl transition-all duration-300">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8 sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300">Edit Moment</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="floating-label">
              <span className="text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">Title</span>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg transition-all duration-300"
                required
                autoComplete="off"
              />
            </label>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend sm:text-sm md:text-base lg:text-lg transition-all duration-300">Description</legend>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                className="textarea h-24 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg transition-all duration-300"
                required
                autoComplete="off"
                style={{ resize: 'none' }}
              />
            </fieldset>
          </div>

          <div className="space-y-4">
            <label className="block text-gray-800 text-lg sm:text-sm md:text-base lg:text-lg transition-all duration-300">Select Media Type</label>
            <div className="flex items-center space-x-4">
              <div>
                <input
                  type="radio"
                  id="image"
                  name="mediaType"
                  className="radio radio-xs radio-primary"
                  checked={mediaType === 'image'}
                  onChange={() => setMediaType('image')}
                />
                <label htmlFor="image" className="ml-2 text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">Image</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="video"
                  name="mediaType"
                  className="radio radio-xs radio-primary"
                  checked={mediaType === 'video'}
                  onChange={() => setMediaType('video')}
                />
                <label htmlFor="video" className="ml-2 text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">Video</label>
              </div>
            </div>
          </div>

          <div>
            <label className="floating-label">
              <span className="text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">
                {mediaType === 'image' ? 'Image ID' : 'Video ID'}
              </span>
              <input
                id="mediaId"
                type="text"
                value={mediaId}
                onChange={(e) => setMediaId(e.target.value)}
                placeholder={mediaType === 'image' ? 'Enter Image ID' : 'Enter Video ID'}
                className="input input-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg transition-all duration-300"
                required
                autoComplete="off"
              />
            </label>
          </div>

          <div className="space-y-4">
            <label className="block text-gray-800 text-lg sm:text-sm md:text-base lg:text-lg transition-all duration-300">Select Orientation</label>
            <div className="flex items-center space-x-4">
              <div>
                <input
                  type="radio"
                  id="landscape"
                  name="orientation"
                  className="radio radio-xs radio-primary"
                  checked={orientation === 'landscape'}
                  onChange={() => setOrientation('landscape')}
                />
                <label htmlFor="landscape" className="ml-2 text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">Landscape</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="portrait"
                  name="orientation"
                  className="radio radio-xs radio-primary"
                  checked={orientation === 'portrait'}
                  onChange={() => setOrientation('portrait')}
                />
                <label htmlFor="portrait" className="ml-2 text-gray-800 sm:text-sm md:text-base lg:text-lg transition-all duration-300">Portrait</label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Update Moment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
