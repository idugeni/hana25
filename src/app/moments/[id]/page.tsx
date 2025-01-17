'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMetadata } from '@/utils/MetadataContext';

interface Moment {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaId: string;
  orientation: 'landscape' | 'portrait';
  createdAt: string;
}

const MomentDetail = () => {
  const [moment, setMoment] = useState<Moment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clientSide, setClientSide] = useState<boolean>(false);

  const { id } = useParams() as { id: string };

  useMetadata(moment?.title || 'Moment Detail', moment?.description);

  useEffect(() => {
    setClientSide(true);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchMoment = async () => {
      try {
        const momentDoc = doc(db, 'moments', id);
        const momentSnapshot = await getDoc(momentDoc);
        if (momentSnapshot.exists()) {
          setMoment(momentSnapshot.data() as Moment);
        } else {
          setError('Moment not found!');
        }
      } catch {
        setError('Error fetching moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoment();

    return () => {
      setLoading(false);
      setMoment(null);
      setError(null);
    };
  }, [id]);

  if (!clientSide) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center z-50">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (error || !moment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <p className="text-white text-xl">{error || 'Moment not found.'}</p>
      </div>
    );
  }

  const mediaUrl = `https://drive.google.com/uc?export=view&id=${moment.mediaId}`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-start px-6 py-12">
      <div className="bg-white/25 p-8 rounded-lg shadow-xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Media Container */}
          <div className="relative overflow-hidden rounded-lg w-full h-full flex items-center justify-center group">
            {moment.mediaType === 'image' && (
              <Image
                src={mediaUrl}
                alt={moment.title}
                width={1200}
                height={900}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  aspectRatio: moment.orientation === 'landscape' ? '16 / 9' : '9 / 16',
                }}
                priority
              />
            )}
            {moment.mediaType === 'video' && (
              <video
                controls
                className={`w-full h-full rounded-lg ${moment.orientation === 'landscape' ? 'aspect-[16/9]' : 'aspect-[9/16]'
                  } `}
              >
                <source src={mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Detail Section */}
          <div className="flex flex-col justify-center items-center md:items-start space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center sm:text-left text-gray-800 mb-6 tracking-wide">
              {moment.title}
            </h1>

            <blockquote className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl text-center sm:text-left px-6 md:px-12 leading-relaxed italic border-l-4 pl-4 border-gray-500 mb-8">
              {moment.description}
            </blockquote>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl font-bold">
                ES
              </div>
              <div>
                <p className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-semibold">Written by</p>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  <span className="font-bold text-gray-800">Eliyanto Sarage</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentDetail;
