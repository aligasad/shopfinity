import React from "react";
import { BsEmojiTear } from "react-icons/bs";

function NoOrderFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md text-center mb-30">
        <h1 className="text-8xl font-bold text-gray-800 dark:text-white mb-4">
          <BsEmojiTear className="absolute top-[20%] left-[37%] md:top-[6%] md:left-[43%] text-red-500 " />
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Record Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You do not Try to Buy Anything till now. <br/> We provide items on cheapest price, shop now.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition duration-200 cursor-pointer"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NoOrderFound;
