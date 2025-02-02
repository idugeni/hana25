'use client';

import Link from 'next/link';
import { FaBars } from 'react-icons/fa6';
import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const handleResize = () => {
      const drawer = document.getElementById('hana-drawer') as HTMLInputElement;
      if (window.innerWidth >= 1024 && drawer?.checked) {
        drawer.checked = false;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='drawer'>
      {/* Drawer Toggle Input */}
      <input id='hana-drawer' type='checkbox' className='drawer-toggle' />

      {/* Drawer Content */}
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='navbar bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg sticky top-0 z-50 w-full'>
          {/* Mobile View */}
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='hana-drawer'
              aria-label='open sidebar'
              className='btn btn-ghost hover:bg-transparent outline-none border-none shadow-none transition-all duration-300'
            >
              <FaBars size={24} className='text-white' />
            </label>
          </div>

          {/* Navbar Content */}
          <div className='flex-1 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 flex justify-between items-center'>
            {/* Logo */}
            <Link
              href='/'
              className='btn btn-ghost text-xl sm:text-2xl lg:text-3xl normal-case'
            >
              HANA25
            </Link>

            {/* Desktop Navbar */}
            <div className='hidden flex-none lg:block'>
              <ul className='menu menu-horizontal text-white space-x-6'>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <Link href='/gift'>Gift</Link>
                </li>
                <li>
                  <Link href='/moments'>Moments</Link>
                </li>
                <li>
                  <Link href='/quotes'>Quotes</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className='drawer-side z-10'>
        <label
          htmlFor='hana-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-full w-80 p-6 sm:p-8 md:p-10 lg:p-12 text-white space-y-4 mt-16'>
          <li>
            <Link
              href='/'
              className='w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/gift'
              className='w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out'
            >
              Gift
            </Link>
          </li>
          <li>
            <Link
              href='/moments'
              className='w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out'
            >
              Moments
            </Link>
          </li>
          <li>
            <Link
              href='/quotes'
              className='w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out'
            >
              Quotes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
