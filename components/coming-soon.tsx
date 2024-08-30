"use client";
import React from 'react';

const ComingSoon: React.FC = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className={`text-center transition-all duration-1000 ease-out`}>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          We're working hard to bring you something amazing!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;