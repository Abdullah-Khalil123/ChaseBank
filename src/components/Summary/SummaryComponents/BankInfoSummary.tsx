import { ChevronRight, ChevronUp, Printer } from "lucide-react";
import Link from "next/link";
import React from "react";
import AccountButton from "./AccountButton";

const BankInfoSummary = () => {
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
        <div className="flex justify-between items-center text-[#0d5fb6] font-[600] px-4 pt-4">
          <Link
            href={"/summary"}
            className="flex hover:bg-[#ebeff3] px-2 py-1 rounded-[5px] cursor-pointer items-center"
          >
            BUS COMPLETE CHK (..6032) <ChevronRight />
          </Link>
          <AccountButton />
        </div>
        <div className="flex items-end justify-between w-[50%] px-4 py-4">
          <div>
            <h1 className="text-4xl font-[600]">$20,151.91</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Available balance
            </p>
          </div>

          <div>
            <h1>$0</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Present balance
            </p>
          </div>

          <div>
            <h1>$0</h1>
            <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
              Available credit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInfoSummary;
