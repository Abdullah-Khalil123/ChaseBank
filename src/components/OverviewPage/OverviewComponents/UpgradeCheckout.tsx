import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const UpgradeCheckout = () => {
  return (
    <div className="bg-white rounded-[10px] px-8 py-8 flex gap-4">
      <div className="w-[90px] h-[90px]">
        <Image alt="" src={""} width={90} height={90} />
      </div>
      <div>
        <h1 className="text-[14px] font-bold">Upgrade your checkout</h1>
        <p className="text-[15px] text-gray-500">
          Get $100 off Chase POS™ Terminal — our fast, reliable wireless
          terminal to take payments and track sales. Plus, get no-fee, same-day
          deposits.
        </p>
        <p className="flex items-center text-[#3c84c9] text-[14px]">
          Continue <ChevronRight size={20} />
        </p>
      </div>
    </div>
  );
};

export default UpgradeCheckout;
