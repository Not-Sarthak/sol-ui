import "@/styles/globals.css";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  TrezorWalletAdapter,
  BitpieWalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import { EyeOff, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Connect() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitpieWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new LedgerWalletAdapter(),
      new TrustWalletAdapter(),
      new TrezorWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  const WalletConnect: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);
    const { select, publicKey, disconnect } = useWallet();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleShowAll = () => setShowAll(!showAll);

    const displayedWallets = showAll ? wallets : wallets.slice(0, 4);

    return (
      <div className="z-50">
        <div className="mt-4">
          {publicKey ? (
            <>
              <button
                onClick={disconnect}
                className="w-48 z-50 bg-black text-white hover:scale-95 flex items-center p-4 text-lg font-medium dark:text-black dark:bg-gradient-to-tl dark:from-[#F7F7F7] dark:to-[#EDEDED] py-2 rounded-lg border"
              >
                <div className="truncate"> {publicKey.toBase58()}</div>
                <LogOut className="w-28" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openModal}
                className="px-6 py-2 text-white bg-black dark:text-black dark:bg-gradient-to-tl dark:from-[#F7F7F7] dark:to-[#EDEDED] hover:scale-95 transition-all rounded-lg"
              >
                Connect Wallet
              </button>
            </>
          )}
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Connect Wallet</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 max-h-56 overflow-y-auto custom-scrollbar">
                {displayedWallets.map((wallet) => (
                  <motion.button
                    key={wallet.name}
                    onClick={() => select(wallet.name)}
                    className={`flex flex-col items-center truncate justify-center p-2 rounded-lg ${
                      wallet.readyState !== "Installed"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={wallet.readyState !== "Installed"}
                    onHoverStart={() => setHoveredWallet(wallet.name)}
                    onHoverEnd={() => setHoveredWallet(null)}
                  >
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      className="w-10 h-10 mb-2"
                    />
                    <AnimatePresence mode="wait">
                      {hoveredWallet === wallet.name ? (
                        <motion.span
                          key="connect"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm text-black"
                        >
                          Connect
                        </motion.span>
                      ) : (
                        <motion.span
                          key="wallet-name"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm dark:text-black"
                        >
                          {wallet.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={toggleShowAll}
                className={`text-sm ${
                  showAll ? "bg-gray-200 text-black/60" : "bg-black"
                } text-white w-full py-2 rounded-lg flex items-center justify-center gap-2`}
              >
                {showAll ? "Hide" : "More wallets"}
                {showAll ? (
                  <EyeOff className="w-4" />
                ) : (
                  <Image
                    src={"https://svgshare.com/i/19pH.svg"}
                    width={40}
                    height={40}
                    alt="logos"
                  />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletConnect />
      </WalletProvider>
    </ConnectionProvider>
  );
}