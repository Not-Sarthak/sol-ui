"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChipProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Chip: React.FC<ChipProps> = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80"
          : "text-black hover:bg-black/20"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriorityModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const primaryTabs = useMemo(() => ["Max Cap", "Exact Fee"], []);
  const tabs = useMemo(() => ["Fast", "Turbo", "Ultra"], []);

  const [priorityLevel, setPriorityLevel] = useState(tabs[0]);
  const [priorityMode, setPriorityMode] = useState(primaryTabs[0]);
  const [fee, setFee] = useState<number>(0.0003);

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      setFee(0);
    } else {
      setFee(value);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const slideUpVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  useEffect(() => {
    if (!isOpen) {
      setPriorityLevel(tabs[0]);
      setPriorityMode(primaryTabs[0]);
      setFee(0.0003);
    }
  }, [isOpen, primaryTabs, tabs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
      <motion.div
        className="bg-white text-black rounded-lg w-full max-w-md sm:max-w-lg p-6 mx-4 sm:mx-6 md:mx-auto shadow-lg relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h2 className="text-md text-[#090909] mb-2">
          Transaction Priority Fee
        </h2>
        <p className="text-sm mb-6 text-[#6d6d6d]">
          Fee settings are applied across all Raydium features, including Swap,
          Liquidity, and Staking.
        </p>
        <div>
          <div className="mb-6">
            <h3 className="text-sm text-[#090909] mb-2">Priority Mode</h3>
            <div className="flex items-center flex-wrap gap-2">
              {primaryTabs.map((tab) => (
                <Chip
                  text={tab}
                  selected={priorityMode === tab}
                  setSelected={setPriorityMode}
                  key={tab}
                />
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {priorityMode === "Max Cap" && (
              <motion.div
                className="mb-6 overflow-hidden"
                variants={slideUpVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h3 className="text-sm text-[#090909] mb-2">Priority Level</h3>
                <div className="flex items-center flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <Chip
                      text={tab}
                      selected={priorityLevel === tab}
                      setSelected={setPriorityLevel}
                      key={tab}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-6">
            <label
              htmlFor="fee-input"
              className="text-sm text-[#090909] mb-2 block"
            >
              {priorityMode === "Max Cap" ? "Set Max Cap" : "Exact Fee"}
            </label>
            <input
              id="fee-input"
              type="text"
              value={fee}
              onChange={handleFeeChange}
              className="w-full px-2 py-1 rounded text-black border border-gray-700 focus:outline-none focus:ring-1 focus:ring-black bg-[#ededed] dark:bg-[#ededed]"
              min="0"
              step="0.0001"
            />
            <p className="text-xs mt-2 text-gray-400">~$0.00 SOL</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-2 py-1 rounded text-sm bg-[#ededed] focus:text-white focus:bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80 hover:bg-black/20"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="px-2 py-1 rounded text-sm bg-[#ededed] focus:text-white focus:bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80 hover:bg-black/20"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PriorityModal;