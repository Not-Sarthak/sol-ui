"use client";
import React, { useState } from "react";
import SlippageSettingModal from "../solui/slippage-settings-modal";

export default function SlippageSettingExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-black hover:bg-black/90 hover:scale-95 text-white text-sm p-2 rounded-lg transition-all dark:bg-white dark:text-black"
      >
        Set Slippage
      </button>
      <SlippageSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};