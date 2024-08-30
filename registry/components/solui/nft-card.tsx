import Image from "next/image";
import React from "react";

type NftCardProps = {
  nftImage: string;
  name: string;
  collectionName: string;
  cost: string;
  currency: string;
};

export default function NftCard({ nftImage, name, collectionName, cost, currency }: NftCardProps) {
  return (
    <div className="flex z-50 shadow-lg flex-col items-center justify-center dark:bg-white bg-[#1d1c21] rounded-lg w-44 h-64 p-2 py-4 pt-5">
      <Image
        src={nftImage}
        alt="NFT"
        width={160}
        height={192}
        className="rounded-lg"
      />
      <div className="flex justify-between items-center w-full mt-2">
        <div className="text-left text-sm">
          <div className="text-[14px] truncate dark:text-gray-500 text-white/60">{name}</div>
          <div className="text-lg font-semibold dark:text-black text-white">{collectionName}</div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm dark:text-gray-500 text-white/60 truncate mt-1">{cost}</span>
          <Image
            src={currency}
            alt="CurrencyLogo"
            width={18}
            height={18}
            className="ml-1"
          />
        </div>
      </div>
    </div>
  );
}