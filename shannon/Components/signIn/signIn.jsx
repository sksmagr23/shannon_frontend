"use client";
import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const SignInModal = ({ isOpen, onClose, onBack }) => {
  if (!isOpen) return null;
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = async (provider) => {
    try {
      toast.loading("Signing in...");
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.ok) {
        const session = await getSession();

        if (session?.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            })
          );

          window.dispatchEvent(new Event("userStateChange"));
        }

        toast.success("Logged in successfully... 🎉");
        router.push("/");
      }
    } catch (err) {
      console.error("Error logging in: ", err);
      toast.error("An error occurred while logging in. Please try again. ❌");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-[#FFFFEF] p-8 rounded-lg shadow-lg max-w-md w-full relative min-h-[300px]">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-[#003092] hover:text-[#FFAB5B] hover:bg-[#003092] transition-colors duration-300 bg-amber-500 p-2 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-[#003092] text-center mb-6">
          Sign In
        </h2>

        {session ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Signed in as {session.user.email}
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full bg-[#001092] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#00879E] transition-colors duration-300 flex items-center justify-center shadow-md cursor-pointer"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8 text-center">
              Please sign in to continue
            </p>

            <div className="flex flex-col gap-y-4">
              <button
                onClick={() => handleSignIn("google")}
                className="w-full bg-[#001092] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#00879E] transition-colors duration-300 flex items-center justify-center shadow-md cursor-pointer"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                  className="w-6 h-6 mr-3 bg-white p-1 rounded-sm"
                />
                Sign in with Google
              </button>

              <button
                onClick={() => handleSignIn("github")}
                className="w-full bg-[#333333] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#555555] transition-colors duration-300 flex items-center justify-center shadow-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .5C5.648.5.5 5.648.5 12.04c0 5.1 3.292 9.415 7.86 10.954.574.105.784-.25.784-.555 0-.274-.01-1-.015-1.963-3.2.695-3.877-1.54-3.877-1.54-.523-1.328-1.278-1.682-1.278-1.682-1.045-.714.08-.699.08-.699 1.155.081 1.763 1.18 1.763 1.18 1.027 1.76 2.696 1.252 3.352.957.103-.744.402-1.253.73-1.54-2.554-.29-5.24-1.277-5.24-5.684 0-1.256.45-2.28 1.185-3.084-.12-.29-.513-1.454.113-3.033 0 0 .968-.31 3.17 1.179a10.927 10.927 0 0 1 2.884-.39c.978.005 1.964.132 2.884.39 2.2-1.49 3.167-1.18 3.167-1.18.628 1.58.235 2.743.116 3.033.738.804 1.183 1.828 1.183 3.084 0 4.418-2.69 5.39-5.255 5.676.413.353.78 1.05.78 2.116 0 1.526-.014 2.757-.014 3.133 0 .308.206.664.79.553C20.712 21.45 24 17.135 24 12.04 24 5.648 18.852.5 12 .5z"
                  />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
