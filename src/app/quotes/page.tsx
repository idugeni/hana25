'use client';

import React, { useState } from 'react';
import { useMetadata } from '@/utils/MetadataContext';
import Swal from 'sweetalert2';
import { FaArrowsRotate } from 'react-icons/fa6';

const QuotesPage = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useMetadata(
    'Generate Inspiring Quotes',
    'Discover and create inspiring quotes to brighten your day!'
  );

  const generateQuote = async () => {
    setLoading(true);
    setQuote(null);
    setButtonDisabled(true);

    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate quote');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const htmlQuote = data.htmlQuote;
      const cleanedHtml = htmlQuote.replace(/```html/g, '').replace(/```/g, '');

      setQuote(cleanedHtml);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while generating the quote.',
      });
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6 transition-all duration-500'>
      {!quote && (
        <button
          onClick={generateQuote}
          className={`px-6 py-3 sm:px-5 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-white shadow-lg hover:opacity-90 transition-all`}
          disabled={buttonDisabled || loading}
        >
          {loading ? (
            <div className='flex items-center space-x-2'>
              <span className='loading loading-spinner text-sm sm:text-md md:text-lg lg:text-xl'></span>
              <span className='text-sm sm:text-md md:text-lg lg:text-xl'>
                Sedang membuat quotes...
              </span>
            </div>
          ) : (
            'Click to Inspire Me!'
          )}
        </button>
      )}

      {quote && (
        <div className='mt-8 text-sm sm:text-md md:text-lg lg:text-xl text-center max-w-6xl mx-auto space-y-4 transition-all duration-500 hover:text-gray-300 hover:opacity-90'>
          <div className='mb-4' dangerouslySetInnerHTML={{ __html: quote }} />
          <div className='flex items-center justify-center w-full mt-8'>
            <button
              onClick={generateQuote}
              className='flex items-center justify-center px-6 py-3 sm:px-5 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-white shadow-lg hover:opacity-90 transition-all'
              disabled={buttonDisabled || loading}
            >
              <FaArrowsRotate className='text-sm sm:text-md md:text-lg lg:text-xl' />
              <span className='ml-2 text-sm sm:text-md md:text-lg lg:text-xl'>
                Regenerated
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesPage;
