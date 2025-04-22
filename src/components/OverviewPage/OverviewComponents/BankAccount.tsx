"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Printer, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

const BankAccount = () => {
  const [data, setData] = useState<{
    accountTitle: string;
    name: string;
    availableBalance: string;
    presentBalance: string;
    availableCredit: string;
  }>({
    accountTitle: "",
    name: "",
    availableBalance: "",
    presentBalance: "",
    availableCredit: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("accountData");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData({
        accountTitle: "BUS COMPLETE CHK (...6032)",
        name: "TIGER PRODUCTS LLC",
        availableBalance: "20,249.75",
        presentBalance: "20,249.75",
        availableCredit: "0.00",
      });
    }
  }, []);

  return (
    <div className="rounded-[10px] bg-white border-[1px] border-gray-300">
      <div className="text-sm font-bold text-gray-700 flex justify-between px-4 py-3">
        <h1>Bank account</h1>
        <div className="flex text-[#0a4386]">
          <Printer size={20} />
          <ChevronUp className="ml-2" />
        </div>
      </div>

      <h3 className="bg-[#f5f7fa] py-2 font-bold text-sm px-4 border-t-1 border-gray-300 uppercase">
        {data.name}
      </h3>

      <div>
        <div className="lg:flex justify-between items-center text-blue font-[600] px-4 pt-4">
          <Link
            href={"/summary"}
            className="flex hover:bg-[#ebeff3] max-lg:mb-2 px-2 py-1 rounded-[5px] cursor-pointer items-center"
          >
            {data.accountTitle} <ChevronRight />
          </Link>
          <div className="flex max-lg:justify-center">
            <button className="bg-darkBlue text-white text-sm font-[600] px-2 rounded-[5px]">
              Transfer money
            </button>
            <button className="flex items-center border-[1px] rounded-[5px] pl-2 pr-1 font-[12px] ml-4">
              More <ChevronDown />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-10 px-4 py-4 flex-wrap">
          <div className="grow-[1]">
            <h1 className="text-4xl font-[600]">${data.availableBalance}</h1>
            <p className="text-sm border-b border-dashed border-gray-500 w-fit">
              Available balance
            </p>
          </div>

          <div>
            <h1 className="font-[600] w-[180px] text-[18px]">
              ${data.presentBalance}
            </h1>
            <p className="text-sm border-b border-dashed border-gray-500 w-fit">
              Present balance
            </p>
          </div>

          <div>
            <h1 className="font-[600] w-[180px] text-[18px]">
              ${data.availableCredit}
            </h1>
            <p className="text-sm w-fit">Available credit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
