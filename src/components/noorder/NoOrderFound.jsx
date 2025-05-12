import React from "react";
import { BsEmojiTear } from "react-icons/bs";

function NoOrderFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          <BsEmojiTear />
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Order Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NoOrderFound;
