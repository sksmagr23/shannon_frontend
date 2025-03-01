import React from 'react';
// import { signIn } from 'next-auth/react';
import { auth, provider } from "../../src/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const SignInModal = ({ isOpen, onClose, onBack }) => {
  if (!isOpen) return null;
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (!user || !user.email) {
            throw new Error('No user data available');
        }


        localStorage.setItem('user', JSON.stringify({
            email: user.email,
            name: user.displayName,
            avatar: user.photoURL
        }));

        toast.success('Logged in successfully... 🎉');
        window.dispatchEvent(new Event('userStateChange'));
        onClose();
        setTimeout(() => {
            router.push('/');
        }, 1000);
    } catch (err) {
        console.error("Error logging in: ", err);
        toast.error(err.message || "An error occurred while logging in. Please try again. ❌");
    }
};

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-[#FFFFEF] p-8 rounded-lg shadow-lg max-w-md w-full relative">
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
          onClick={signInWithGoogle}
          className="w-full bg-[#001092] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#00879E] transition-colors duration-300 flex items-center justify-center shadow-md cursor-pointer"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6 mr-3 bg-white p-1 rounded-sm" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
