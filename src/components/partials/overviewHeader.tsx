"use client";

import React from "react";
import ChaseLogo from "../../../public/logo_chase_for_business_wht.svg";
import { Menu, Search, FlagIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider"; // Import the auth context

const OverviewHeader = ({ showOptions = true }: { showOptions?: boolean }) => {
  const { logout } = useAuth(); // Get the logout function from auth context
  const IconClassName = "text-white";

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="bg-[#002f6c] text-white">
      <div className="h-[60px] flex justify-between items-center px-[32px] max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <Menu color="white" />
          <div className="relative min-w-[288px] min-h-[24px] max-lg:hidden">
            <Image alt="Chase Logo" src={ChaseLogo} fill objectFit="contain" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Search className={IconClassName} size={20} />
          <FlagIcon className={IconClassName} size={20} />
          <UserCircle className={IconClassName} size={20} />
          <button className="bg-white font-sm font-bold text-[#0d5fb6] px-2 py-1 rounded-[5px] text-sm max-lg:hidden">
            Open an account
          </button>
          <button className="text-sm font-bold" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
      <OverviewLinks />
      {showOptions && <OverviewLinkOptions />}
    </div>
  );
};

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
      <div className="flex gap-4 py-3 px-[32px] max-w-[1440px] mx-auto max-lg:hidden">
        {Links.map((link, index) => (
          <div
            key={index}
            className="relative font-bold hover:bg-[#00275b] px-1 rounded-[5px] cursor-pointer"
            onClick={() => setActiveLink(link)}
          >
            {link}
            {activeLink === link && (
              <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
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
    <div className="bg-white text-[#475969] h-14 max-lg:hidden">
      <div className="flex items-center gap-4 h-full max-w-[1440px] px-[32px] mx-auto">
        {links.map((link, index) => (
          <div
            className={`rounded-[8px] text-sm font-bold border-1 py-1 px-2 cursor-pointer ${
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
    </div>
  );
};

import { useState } from "react";

export default OverviewHeader;
