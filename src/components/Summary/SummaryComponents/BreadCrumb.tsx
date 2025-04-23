"use client";
import React from "react";
import Link from "next/link";
import { useEffect } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  accountName: string;
  accountType: string;
  accountNumber: string;
  role: boolean;
  balance: number;
  availableCredit: number;
  createdAt: string;
  updatedAt: string;
}

const BreadCrumb = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [loading] = React.useState(true);

  useEffect(() => {
    const sessionUser =
      typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
    if (sessionUser) {
      try {
        setUserData(JSON.parse(sessionUser));
        console.log("User data from session:", JSON.parse(sessionUser));
        return;
      } catch (error) {
        console.error("Error parsing session user data:", error);
      }
    }
  }, [loading]);
  return (
    <div className="py-4">
      <p className="font-[500]">
        <span className="text-[#0d5fb6] underline underline-offset-[3px]">
          <Link href="/overview">Overview </Link>
        </span>
        / {userData?.accountType}
      </p>
    </div>
  );
};

export default BreadCrumb;
