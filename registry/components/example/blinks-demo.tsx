import React from 'react';

export default function BlinksDemo() {
  const handleButtonClick = () => {
    const url = 'https://dial.to/developer?url=https%3A%2F%2Fblinks-starter.vercel.app%2Fapi%2Fdonate&cluster=mainnet';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button
        className="text-white bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80 px-2 py-1 rounded-md z-50"
        onClick={handleButtonClick}
      >
        Show Blink
      </button>
    </>
  );
}