'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useMetadata } from '@/utils/MetadataContext';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface Moment {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaId: string;
  orientation: 'landscape' | 'portrait';
  createdAt: string;
}

export default function Moments() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useMetadata(
    'Moments | Discover Our Cherished Memories',
    'Explore a collection of our precious memories captured in photos and stories.'
  );

  const cachedFetchMoments = useMemo(() => {
    const cache = new Map<number, Moment[]>();

    return async (page: number) => {
      if (cache.has(page)) {
        return cache.get(page);
      }

      try {
        const momentsCollection = collection(db, 'moments');
        const momentsSnapshot = await getDocs(momentsCollection);
        const momentsList = momentsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || '',
          } as Moment;
        });

        momentsList.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        const paginatedData = momentsList.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );

        cache.set(page, paginatedData);
        return paginatedData;
      } catch {
        throw new Error('Failed to load moments.');
      }
    };
  }, [itemsPerPage]);

  const fetchMoments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const paginatedMoments = await cachedFetchMoments(currentPage);
      if (paginatedMoments) {
        setMoments(paginatedMoments);
        setHasNextPage(paginatedMoments.length === itemsPerPage);
      } else {
        setMoments([]);
        setHasNextPage(false);
      }
    } catch {
      setError('Failed to load moments.');
    } finally {
      setLoading(false);
    }
  }, [cachedFetchMoments, currentPage]);

  useEffect(() => {
    fetchMoments();
  }, [fetchMoments]);

  const generateImageUrl = (mediaId: string, mediaType: 'image' | 'video') => {
    return mediaType === 'image'
      ? `https://drive.google.com/uc?export=view&id=${mediaId}`
      : `https://drive.google.com/uc?export=view&id=1eOmuK9rkAmfwR-sMoItUKCUdZK6f4O2L`;
  };

  const renderImage = useCallback(
    (src: string, alt: string, orientation: string) => {
      const aspectRatio =
        orientation === 'landscape' ? 'pb-[56.25%]' : 'pb-[177.78%]';
      return (
        <div
          className={`relative w-full ${aspectRatio} overflow-hidden rounded-lg`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='absolute inset-0 object-cover'
            priority={currentPage === 1}
          />
        </div>
      );
    },
    [currentPage]
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center px-6 py-12'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center transition-all duration-1000'>
        Our Moments
      </h1>

      {/* Loading state */}
      {loading && <p className='text-white text-center'>Loading moments...</p>}

      {/* Error state */}
      {error && <p className='text-red-500 text-center'>{error}</p>}

      {/* Moments display */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-xl items-start'>
        {moments.length === 0 && !loading && !error ? (
          <p className='text-white col-span-full text-center'>
            No moments to display yet.
          </p>
        ) : (
          moments.map((moment) => (
            <Link key={moment.id} href={`/moments/${moment.id}`} passHref>
              <div className='relative group bg-white rounded-lg shadow-md transition-all duration-300 cursor-pointer'>
                <div className='relative overflow-hidden rounded-lg w-full h-full'>
                  {renderImage(
                    generateImageUrl(moment.mediaId, moment.mediaType),
                    moment.title,
                    moment.orientation
                  )}

                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {moment.title}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center space-x-4 py-6 mt-8'>
        {/* Tombol Previous */}
        <button
          className='btn btn-primary btn-sm text-sm hover:bg-primary-focus disabled:opacity-50'
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <FaAnglesLeft />
          Previous
        </button>

        {/* Tombol Page */}
        <div className='flex items-center space-x-2'>
          <button
            className='btn btn-outline btn-sm text-sm text-white bg-white hover:bg-primary hover:text-white'
            disabled
          >
            {currentPage}
          </button>
        </div>

        {/* Tombol Next */}
        <button
          className='btn btn-primary btn-sm text-sm hover:bg-primary-focus disabled:opacity-50'
          onClick={goToNextPage}
          disabled={!hasNextPage}
        >
          Next
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
}
