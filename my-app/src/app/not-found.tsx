'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

const NotFound: React.FC = () => {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setHasSession(!!session);
    };

    checkSession();
  }, []);

  const handleButtonClick = () => {
    if (hasSession === true) {
      router.push('/pages/Dashboard');
    } else {
      router.push('/');
    }
  };

  if (hasSession === null) {
    // Optionally display a loading state while checking the session
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleButtonClick}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        {hasSession ? 'Go to Dashboard' : 'Go to Home'}
      </button>
    </div>
  );
};

export default NotFound;