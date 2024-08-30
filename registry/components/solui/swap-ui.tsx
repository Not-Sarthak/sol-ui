"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Repeat } from "lucide-react";

type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

const TokenDropdown: React.FC<{
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  tokens: Token[];
}> = ({ selectedToken, onSelect, tokens }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (token: Token) => {
    onSelect(token);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        {selectedToken ? (
          <div className="flex items-center w-28">
            <img
              src={selectedToken.logoURI}
              alt={`${selectedToken.name} logo`}
              className="w-6 h-6 mr-2 rounded-full"
            />
            <span className="font-medium text-gray-700">
              {selectedToken.symbol}
            </span>
          </div>
        ) : (
          <span className="text-gray-500 w-28">Select a token</span>
        )}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
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

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <ul
            className="max-h-60 overflow-y-auto"
            style={{
              scrollbarWidth: "thin", 
              scrollbarColor: "black transparent", 
              overflowX: "hidden", 
            }}
          >
            {tokens.map((token) => (
              <li key={token.address}>
                <button
                  type="button"
                  onClick={() => handleSelect(token)}
                  className="w-full p-2 text-left hover:bg-gray-100 flex items-center transition-colors duration-200"
                >
                  <img
                    src={token.logoURI}
                    alt={`${token.name} logo`}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  <span className="font-medium text-gray-700">
                    {token.symbol}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

// SwapUI Component
const SwapUI: React.FC = () => {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(2);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://tokens.jup.ag/tokens?tags=verified"
        );
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Failed to fetch tokens", error);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    const fetchSolBalance = async () => {
      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const wallet = new PublicKey(
          "G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY"
        );
        const balance = await connection.getBalance(wallet);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch SOL balance", error);
      }
    };

    fetchSolBalance();
  }, []);

  const handleMaxClick = () => {
    setFromAmount(solBalance.toString());
    const toValue = (solBalance * conversionRate).toFixed(6);
    setToAmount(toValue);
  };

  const handleHalfClick = () => {
    const halfBalance = solBalance / 2;
    setFromAmount(halfBalance.toString());
    const toValue = (halfBalance * conversionRate).toFixed(6);
    setToAmount(toValue);
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const newFromAmount = toAmount;
    const newToAmount =
      newFromAmount && !isNaN(parseFloat(newFromAmount))
        ? (parseFloat(newFromAmount) * conversionRate).toString()
        : "";

    setFromAmount(newFromAmount);
    setToAmount(newToAmount);

    setConversionRate((prevRate) => (prevRate !== 0 ? 1 / prevRate : prevRate));
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const toValue = (parseFloat(value) * conversionRate).toFixed(6);
      setToAmount(toValue);
    } else {
      setToAmount("");
    }
  };

  return (
    <motion.div
      className="p-4 rounded-lg max-w-[600px] mx-auto bg-[#F7F7F7] shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="-space-y-3">
        <motion.div
          className="p-4 rounded-lg bg-gray-100 border border-gray-200"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">You’re selling</span>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-gray-200 text-[#6E6E6E] text-xs rounded-md">
                {parseFloat(fromAmount || "0").toFixed(2)}
              </div>
              <button
                onClick={handleHalfClick}
                className="px-2 py-1 bg-gray-200 text-[#6E6E6E] text-xs rounded-md"
              >
                HALF
              </button>
              <button
                onClick={handleMaxClick}
                className="px-2 py-1 bg-gray-200 text-[#6E6E6E] text-xs rounded-md"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <TokenDropdown
              selectedToken={fromToken}
              onSelect={setFromToken}
              tokens={tokens}
            />
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="bg-transparent text-right outline-none text-gray-900 w-1/2"
              placeholder="0.00"
              min="0"
            />
          </div>
          <div className="text-right text-lg text-gray-900 font-bold"></div>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleSwapTokens}
            className="bg-white cursor-pointer p-2 rounded-md transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!fromToken || !toToken}
            title="Swap Tokens"
          >
            <Repeat className="rotate-90 text-[#6E6E6E]" />
          </motion.button>
        </div>

        <motion.div
          className="p-4 rounded-lg bg-gray-100 border border-gray-200"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">You’re buying</span>
          </div>
          <div className="flex items-center justify-between">
            <TokenDropdown
              selectedToken={toToken}
              onSelect={setToToken}
              tokens={tokens}
            />
            <div className="flex flex-col justify-end items-end">
              <div className="pr-3">
                <div className="px-2 py-1 bg-gray-200 text-[#6E6E6E] text-xs rounded-md">
                  {parseFloat(fromAmount || "0").toFixed(2)}
                </div>
              </div>
              <input
                type="number"
                value={toAmount}
                readOnly
                className="bg-transparent outline-none text-right text-gray-900 w-full mt-1"
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={`mt-4 ${
          fromAmount && fromToken && toToken
            ? "cursor-pointer"
            : "cursor-not-allowed"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: fromAmount && fromToken && toToken ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={`w-full py-3 rounded-lg ${
            fromAmount && fromToken && toToken
              ? "bg-gradient-to-b from-[#161616] to-[#2C2C2C] text-white hover:scale-95 transition-all"
              : "bg-gradient-to-b from-[#2C2C2C] to-[#3B3B3B] cursor-not-allowed text-[#6E6E6E]"
          } transition-colors duration-200`}
          disabled={!fromAmount || !fromToken || !toToken}
        >
          {fromAmount ? "Swap" : "Enter an amount"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SwapUI;