import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/map" className="text-white hover:text-gray-300">
                Map
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
