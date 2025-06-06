import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
const CustomerInsight = () => {
  return (
    <div className="px-4 py-4 w-[446px] bg-white rounded-[10px] border-1 border-gray-300 h-fit">
      <h1 className="text-[15px] font-bold">Customer Insight</h1>
      <div className="flex items-center h-[80px]">
        <div className="min-w-[50px] h-[50px]">
          <Image src={"bulb.svg"} alt="" width={50} height={60} />
        </div>
        <p className="text-sm">
          Get to know your customers, track your sales and access industry
          trends
        </p>
        <ChevronRight />
      </div>
    </div>
  );
};

export default CustomerInsight;
