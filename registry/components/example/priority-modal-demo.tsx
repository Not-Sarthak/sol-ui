import { useState } from "react";
import PriorityModal from "@/registry/components/solui/priority-modal";

export default function PriorityModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-2 py-1 z-50 rounded text-sm bg-[#ededed] dark:text-black dark:hover:bg-[#ededed]/70 focus:text-white focus:bg-gradient-to-br from-[#090909] to-[#2C2C2C]/80 dark:focus:bg-gradient-to-br dark:from-[#ededed] dark:to-[#ffffff]/80 hover:bg-black/20"
      >
        Priority
      </button>

      <PriorityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
