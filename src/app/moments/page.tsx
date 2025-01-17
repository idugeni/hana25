'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useMetadata } from '@/utils/MetadataContext';

interface Moment {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaId: string;
  orientation: 'landscape' | 'portrait';
  createdAt: string; // Formatted date string
}

export default function Moments() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useMetadata(
    'Moments | Discover Our Cherished Memories',
    'Explore a collection of our precious memories captured in photos and stories.'
  );

  const fetchMoments = useCallback(async () => {
    try {
      const momentsCollection = collection(db, 'moments');
      const momentsSnapshot = await getDocs(momentsCollection);

      const momentsList = momentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString() || '', // Convert Firebase Timestamp
        } as Moment;
      });

      // Sort moments by date, newest first
      momentsList.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setMoments(momentsList);
    } catch {
      setError('Failed to load moments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoments();
  }, [fetchMoments]);

  const generateImageUrl = (mediaId: string, mediaType: 'image' | 'video') => {
    return mediaType === 'image'
      ? `https://drive.google.com/uc?export=view&id=${mediaId}`
      : `https://drive.google.com/uc?export=view&id=1eOmuK9rkAmfwR-sMoItUKCUdZK6f4O2L`; // Default video thumbnail URL
  };

  const renderLandscapeImage = (src: string, alt: string) => (
    <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="absolute inset-0 object-cover"
        priority
      />
    </div>
  );

  const renderPortraitImage = (src: string, alt: string) => (
    <div className="relative w-full pb-[177.78%] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="absolute inset-0 object-cover"
        priority
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-center transition-all duration-1000">
        Our Moments
      </h1>

      {/* Loading state */}
      {loading && <p className="text-white text-center">Loading moments...</p>}

      {/* Error state */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Moments display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-xl items-start">
        {moments.length === 0 && !loading && !error ? (
          <p className="text-white col-span-full text-center">
            No moments to display yet.
          </p>
        ) : (
          moments.map((moment) => (
            <Link key={moment.id} href={`/moments/${moment.id}`} passHref>
              <div className="relative group bg-white rounded-lg shadow-md transition-all duration-300 cursor-pointer">
                {/* Image with hover overlay */}
                <div className="relative overflow-hidden rounded-lg w-full h-full">
                  {moment.orientation === 'landscape'
                    ? renderLandscapeImage(
                      generateImageUrl(moment.mediaId, moment.mediaType),
                      moment.title
                    )
                    : renderPortraitImage(
                      generateImageUrl(moment.mediaId, moment.mediaType),
                      moment.title
                    )}

                  {/* Overlay on hover without scale effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {moment.title}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
