"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
  tags: string[]
  daily_volume: number
  freeze_authority: string | null
  mint_authority: string | null
}

const TokenDropdown: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("https://tokens.jup.ag/tokens?tags=verified");
        const data = await response.json();
        setTokens(data);
        setFilteredTokens(data);
      } catch (error) {
        console.error("Failed to fetch tokens", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm p-4 mx-auto" ref={dropdownRef}>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
          border: transparent;
        }

        .dark .custom-scrollbar {
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 w-56 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {selectedToken ? (
            <div className="flex items-center">
              <img
                src={selectedToken.logoURI}
                alt={`${selectedToken.name} logo`}
                className="w-6 h-6 mr-2 rounded-full"
              />
              <span className="font-medium dark:text-white">{selectedToken.symbol}</span>
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Select a token</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-56 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
            >
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
              <ul className="custom-scrollbar max-h-60 overflow-y-auto">
                <AnimatePresence>
                  {loading ? (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400"
                    >
                      Loading...
                    </motion.li>
                  ) : filteredTokens.length > 0 ? (
                    filteredTokens.map((token) => (
                      <motion.li
                        key={token.address}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectToken(token)}
                          className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors duration-200"
                        >
                          <img
                            src={token.logoURI}
                            alt={`${token.name} logo`}
                            className="w-6 h-6 mr-2 rounded-full"
                          />
                          <span className="font-medium dark:text-white">{token.symbol}</span>
                          {selectedToken?.address === token.address && (
                            <svg
                              className="ml-auto h-5 w-5 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </motion.li>
                    ))
                  ) : (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-2 text-gray-500 dark:text-gray-400"
                    >
                      No tokens found
                    </motion.li>
                  )}
                </AnimatePresence>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* {selectedToken && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-lg font-semibold dark:text-white"
        >
          Selected Token: {selectedToken.name}
        </motion.div>
      )} */}
    </div>
  );
};

export default TokenDropdown;