import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa6';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='footer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white flex flex-col items-center py-4 px-6 shadow-lg transition-all duration-500 ease-in-out'>
      <div className='flex flex-col items-center gap-4 transition-all duration-500 ease-in-out'>
        {/* Logo Section */}
        <div className='mb-2 transition-all duration-500 ease-in-out'>
          <Image
            src='/next.svg'
            alt='HANA25 Logo'
            width={64}
            height={64}
            className='w-16 h-16'
          />
        </div>

        {/* Text Section */}
        <p className='text-xs sm:text-sm md:text-base lg:text-lg text-center transition-all duration-500 ease-in-out'>
          &copy; {new Date().getFullYear()}{' '}
          <span className='text-yellow-300 font-semibold'>[HANA25]</span> - All
          rights reserved. Built with{' '}
          <FaHeart className='text-red-500 inline-block mx-1' /> by{' '}
          <span className='text-yellow-300 font-semibold'>
            [Eliyanto Sarage]
          </span>
        </p>

        {/* Social Media Icons */}
        <div className='flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 transition-all duration-500 ease-in-out'>
          <Link href='https://facebook.com'>
            <FaFacebookF className='w-8 h-8 bg-neutral-focus text-white p-2 rounded-full hover:bg-blue-500 transition-colors duration-300' />
          </Link>
          <Link href='https://twitter.com'>
            <FaTwitter className='w-8 h-8 bg-neutral-focus text-white p-2 rounded-full hover:bg-blue-400 transition-colors duration-300' />
          </Link>
          <Link href='https://instagram.com'>
            <FaInstagram className='w-8 h-8 bg-neutral-focus text-white p-2 rounded-full hover:bg-pink-500 transition-colors duration-300' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
