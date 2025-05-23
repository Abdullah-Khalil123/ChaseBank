import React from "react";
import { ChevronUp } from "lucide-react";

const ExternalAccounts = () => {
  return (
    <div className="bg-white border-[1px] border-gray-300 rounded-[10px] py-4 flex flex-col gap-2">
      <div className="flex justify-between font-bold px-4 pb-4 border-b-[1px] border-gray-300">
        <h1>External accounts</h1>
        <ChevronUp />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[15px] text-gray-500 my-4">
          Link your external accounts to better organize your money, budget and
          plan for the future.
        </p>
        <button className="text-sm font-bold border-[1px] border-[#025fb9] w-fit px-2 rounded-[3px] text-[#1f72c1]">
          Link account
        </button>
      </div>
    </div>
  );
};

export default ExternalAccounts;
