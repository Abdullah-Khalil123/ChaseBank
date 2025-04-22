"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const UpgradeCheckout = ({
  head,
  tag,
  button,
  image,
  className,
}: {
  head: string;
  tag: string;
  button: string;
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={
        `bg-white border-[1px] border-gray-300 rounded-[10px] px-8 py-8 flex gap-4 ` +
        className
      }
    >
      <div className="min-w-[90px] min-h-[90px] max-lg:h-[140px]">
        <Image alt="" src={image} width={90} height={90} />
      </div>
      <div className="flex h-full flex-col gap-2 justify-between">
        <h1 className="font-bold">{head}</h1>
        <p className="text-sm text-gray-text">{tag}</p>
        <p className="flex items-center text-blue text-sm">
          {button} <ChevronRight size={20} />
        </p>
      </div>
    </div>
  );
};

export default UpgradeCheckout;
