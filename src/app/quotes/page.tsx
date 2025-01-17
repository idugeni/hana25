'use client';

import React, { useState } from 'react';
import { useMetadata } from '@/utils/MetadataContext';

const QuotesPage = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useMetadata(
    'Generate Inspiring Quotes',
    'Discover and create inspiring quotes to brighten your day!'
  );

  const generateQuote = async () => {
    setLoading(true);
    setQuote(null);

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

      const cleanedHtml = htmlQuote
        .replace(/```html/g, '')
        .replace(/```/g, '');

      setQuote(cleanedHtml);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while generating the quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6 transition-all duration-500">
      {!quote && (
        <button
          onClick={generateQuote}
          className={`
            w-full sm:w-auto md:w-1/2 lg:w-1/3
            px-8 py-4
            bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500
            rounded-full text-lg font-semibold text-white shadow-lg
            hover:bg-gradient-to-r hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-400
            hover:shadow-2xl hover:opacity-90
            focus:outline-none focus:ring-4 focus:ring-teal-300
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={loading || !!quote}
        >
          {loading ? 'Creating something inspiring...' : 'Click to Inspire Me!'}
        </button>
      )}

      {quote && (
        <div
          className="mt-8 text-lg text-center max-w-6xl mx-auto space-y-4 transition-all duration-500 hover:text-gray-300 hover:opacity-90"
          dangerouslySetInnerHTML={{ __html: quote }}
        />
      )}
    </div>
  );
};

export default QuotesPage;
