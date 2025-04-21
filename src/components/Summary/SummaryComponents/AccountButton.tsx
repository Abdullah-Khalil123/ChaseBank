import React from "react";
import Image from "next/image";

const AccountButton = () => {
  return (
    <div className="text-[#0d5fb6] flex gap-2 items-center hover:bg-[#ecf0f6] cursor-pointer w-fit rounded-[5px] px-4 py-1">
      <div className="w-[18px] h-[18px]">
        <Image src={"/hash.svg"} alt="Hash Icon" width={18} height={18} />
      </div>
      Account & routing number
    </div>
  );
};

export default AccountButton;
