"use client";

import React, { useState } from "react";
import Link from "next/link";
import SignInModal from "../signIn/signIn";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const user = session?.user;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="bg-gradient-to-r from-[#005092] to-[#001092] p-5 shadow-[0_4px_20px_-2px_rgba(0,48,146,0.5)]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-[#FFF2DB] text-3xl font-bold filter drop-shadow-[0_2px_4px_rgba(255,171,91,0.1)] flex items-center">
              <img src="/nav.png" alt="Logo" className="h-12 w-12 mr-2" />
              <Link
                href="/"
                className="text-[#FFAB5B] transition-all duration-300 ease-in-out relative group"
              >
                Shannon
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  <Link
                    href="/map"
                    className="text-[#FFF2DB] hover:text-[#FFAB5B] transition-all duration-300 ease-in-out relative group py-2 filter drop-shadow-[0_2px_4px_rgba(255,242,219,0.1)]"
                  >
                    Map
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFAB5B] to-[#FFF2DB] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.image || "/dafault-avatar.png"}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <button
                      onClick={handleLogout}
                      className="bg-[#FFAB4B] text-[#003092] px-6 py-2 rounded-full font-semibold hover:bg-transparent border-2 border-[#FFAB5B] transition-all duration-300 ease-in-out shadow-lg cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="bg-[#FFAB4B] text-[#003092] px-6 py-2 rounded-full font-semibold hover:bg-transparent border-2 border-[#FFAB5B] transition-all duration-300 ease-in-out shadow-lg cursor-pointer"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#FFF2DB] hover:text-[#FFAB5B] transition-colors duration-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6 fill-current filter drop-shadow-[0_2px_4px_rgba(255,242,219,0.1)]"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0-2H4a1 1 0 1 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 bg-gradient-to-b from-[#003092] to-[#004092] backdrop-blur-sm rounded-lg p-4 border border-[#00879E]/20 shadow-[0_4px_20px_-2px_rgba(0,48,146,0.4)]">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 mb-4 px-4">
                    <img
                      src={user.image || "/dafault-avatar.png"}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-[#FFF2DB]">{user.name || 'User'}</span>
                  </div>
                  <Link
                    href="/map"
                    className="block text-[#FFF2DB] hover:text-[#FFAB5B] hover:bg-[#00879E]/10 py-3 px-4 rounded-md transition-all duration-300 ease-in-out mb-2"
                  >
                    Map
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#FFAB5B] text-[#003092] py-3 rounded-md font-semibold hover:bg-transparent transition-all duration-300 ease-in-out shadow-lg mb-3"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="w-full bg-[#FFAB5B] text-[#003092] py-3 rounded-md font-semibold hover:bg-transparent transition-all duration-300 ease-in-out shadow-lg mb-3"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onBack={() => setShowSignInModal(false)}
      />
    </>
  );
};

export default Navbar;
