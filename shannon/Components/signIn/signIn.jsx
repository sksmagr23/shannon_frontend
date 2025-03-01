import React from 'react';
import { signIn } from 'next-auth/react';

const SignInModal = ({ isOpen, onClose, onBack }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-[#003092] hover:text-[#FFAB5B] hover:bg-[#003092] transition-colors duration-300 bg-amber-500 p-2 rounded-full cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-[#003092] text-center mb-6">Sign In</h2>
        <p className="text-gray-600 mb-8 text-center">Please sign in to continue</p>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-[#4285F4] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#00879E] transition-colors duration-300 flex items-center justify-center shadow-md cursor-pointer"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6 mr-3 bg-white p-1 rounded-sm" />
          Sign in with Google
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">By signing in, you agree to our <a href="#" className="text-[#003092] hover:text-[#FFAB5B]">Terms of Service</a> and <a href="#" className="text-[#003092] hover:text-[#FFAB5B]">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
