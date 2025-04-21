import React from "react";
import { ChevronRight, Printer, ChevronUp, ChevronDown } from "lucide-react";

const BankAccount = () => {
  return (
    <div className="rounded-[10px] bg-white border-[1px] border-gray-300">
      <div className="text-[14px] font-bold text-gray-700 flex justify-between px-4 py-3">
        <h1>Bank account</h1>
        <div className="flex text-[#0a4386]">
          <Printer size={20} />
          <ChevronUp className="ml-2" />
        </div>
      </div>
      <h3 className="bg-[#f5f7fa] py-2 font-bold text-[14px] px-4 border-t-1 border-gray-300">
        TIGER PRODUCT INC.
      </h3>
      <div>
        <div className="flex justify-between items-center text-[#005eb8] px-4">
          <p className="flex pt-2">
            BUS COMPLETE CHK (..6032) <ChevronRight />
          </p>
          <div className="flex">
            <button className="bg-[#002f6c] text-white text-[14px] font-bold px-2 rounded-[5px]">
              Transfer money
            </button>
            <button className="flex items-center border-[1px] rounded-[5px] pl-2 pr-1 font-[12px] ml-4">
              More <ChevronDown />
            </button>
          </div>
        </div>
        <div className="flex items-end gap-10 px-4 py-4">
          <div>
            <h1 className="text-4xl font-bold">$20,151.91</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Available balance
            </p>
          </div>

          <div>
            <h1>$20,151.91</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Present balance
            </p>
          </div>

          <div>
            <h1>$20,151.91</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Available credit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
