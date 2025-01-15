"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleResize = () => {
      const drawer = document.getElementById("hana-drawer") as HTMLInputElement;
      if (window.innerWidth >= 1024 && drawer?.checked) {
        drawer.checked = false;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="drawer">
      {/* Drawer Toggle Input */}
      <input id="hana-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg sticky top-0 z-50 w-full">
          {/* Mobile View */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="hana-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost hover:bg-transparent transition-all duration-300">
              <FaBars size={24} className="text-white" />
            </label>
          </div>

          {/* Navbar Title */}
          <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center">
            <Link href="/" className="btn btn-ghost text-xl sm:text-2xl lg:text-3xl normal-case lg:ml-0 ml-auto">
              HANA25
            </Link>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal text-white space-x-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side z-10">
        <label htmlFor="hana-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-full w-80 p-6 sm:p-8 md:p-10 lg:p-12 text-white space-y-4 mt-16">
          <li>
            <Link
              href="/"
              className="w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="w-full p-4 sm:p-6 md:p-8 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
