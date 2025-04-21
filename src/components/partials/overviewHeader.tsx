"use client";

import React from "react";
import ChaseLogo from "../../../public/logo_chase_for_business_wht.svg";
import { Menu, Search, FlagIcon, UserCircle } from "lucide-react";
import Image from "next/image";

const OverviewHeader = () => {
  const IconClassName = "text-white";
  return (
    <div className="bg-[#002f6c] text-white">
      <div className=" h-[60px] flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <Menu color="white" />
          <div className="relative w-[220px] h-[32px]">
            <Image alt="Chase Logo" src={ChaseLogo} fill />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Search className={IconClassName} size={20} />
          <FlagIcon className={IconClassName} size={20} />
          <UserCircle className={IconClassName} size={20} />
          <button className="bg-white text-[#0d5fb6] px-2 rounded-[5px] text-[14px]">
            Open an account
          </button>
          <button className="text-[12px] font-bold">Sign out</button>
        </div>
      </div>
      <OverviewLinks />
      <OverviewLinkOptions />
    </div>
  );
};

import { useState } from "react";

const OverviewLinks = () => {
  const Links = [
    "Accounts",
    "Pay & transfer",
    "Collect & deposit",
    "Account management",
    "Security",
  ];
  const [activeLink, setActiveLink] = useState("Accounts");
  return (
    <>
      <div className="flex gap-4 py-2 px-6">
        {Links.map((link, index) => (
          <div
            key={index}
            className="relative text-[14px] hover:bg-[#00275b] px-1 rounded-[5px] cursor-pointer"
            onClick={() => setActiveLink(link)}
          >
            {link}
            {activeLink === link && (
              <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const OverviewLinkOptions = () => {
  const links = [
    "Overview",
    "Customer Insights",
    "Statements & documents",
    "Profile & settings",
  ];
  const [selectedLink, setSelectedLink] = useState("Overview");

  return (
    <div className="bg-white text-[#475969] flex items-center gap-4 h-14 px-6">
      {links.map((link, index) => (
        <div
          className={`rounded-[10px] border-2 p-1 px-2 cursor-pointer ${
            link === selectedLink
              ? "bg-[#ebeff3] text-[#0d5fb6] border-[#0d5fb6]"
              : "border-transparent"
          }`}
          onClick={() => setSelectedLink(link)}
          key={index}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default OverviewHeader;
