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
      <div className="w-[90px] h-[90px] max-lg:h-[140px]">
        <Image alt="" src={image} width={90} height={90} />
      </div>
      <div className="flex flex-col justify-between h-[80px]">
        <h1 className="text-[14px] font-bold">{head}</h1>
        <p className="text-[15px] text-gray-500">{tag}</p>
        <p className="flex items-center text-[#3c84c9] text-[14px]">
          {button} <ChevronRight size={20} />
        </p>
      </div>
    </div>
  );
};

export default UpgradeCheckout;
