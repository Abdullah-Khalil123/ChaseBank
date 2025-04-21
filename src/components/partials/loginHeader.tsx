import React from "react";
import Image from "next/image";

const LoginHeader = () => {
  return (
    <div className="flex justify-center items-center h-[84px] bg-gradient-to-b from-black/70 to-transparent">
      <div className="relative w-[220px] h-[32px]">
        <Image
          src={"/wordmark-white.svg"}
          alt="Logo"
          fill
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default LoginHeader;
