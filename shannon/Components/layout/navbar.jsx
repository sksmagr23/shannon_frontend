"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#003092] p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-[#FFF2DB] text-3xl font-bold">
            <Link href="/" className="hover:text-[#FFAB5B] transition duration-300">Shannon</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-[#FFF2DB] hover:text-[#FFAB5B] transition duration-300">Dashboard</Link>
            <Link href="/map" className="text-[#FFF2DB] hover:text-[#FFAB5B] transition duration-300">Map</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#FFF2DB] focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4">
            <Link href="/dashboard" className="block text-[#FFF2DB] hover:text-[#FFAB5B] py-2 transition duration-300">Dashboard</Link>
            <Link href="/map" className="block text-[#FFF2DB] hover:text-[#FFAB5B] py-2 transition duration-300">Map</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

