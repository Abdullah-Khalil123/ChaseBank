"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Printer, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

// Define types for our data
interface AccountData {
  accountTitle: string;
  name: string;
  availableBalance: string;
  accountType?: string;
  presentBalance: string;
  availableCredit: string;
  id?: string;
}

const BankAccount = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AccountData>({
    accountTitle: "",
    name: "",
    availableBalance: "",
    presentBalance: "",
    accountType: "",
    availableCredit: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First check if authenticated
        if (!isAuthenticated()) {
          // Redirect to login - let middleware handle it
          router.push("/login");
          // router.replace("/login");
          return;
        }

        // First check if we have user data from auth context
        if (user && user.id) {
          // Use that data directly
          setData({
            id: user.id,
            accountTitle: `${user.accountNumber || "Account"} (...${
              user.id?.slice(-4) || "0000"
            })`,
            name: user.accountName?.toUpperCase() || user.name.toUpperCase(),
            availableBalance: user.balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            presentBalance: user.balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            availableCredit: user.availableCredit.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            accountType: `${user.accountType || "Account"} (...${
              user.accountNumber?.slice(-4) || "0000"
            })`,
          });
          setIsLoading(false);
          return;
        }

        // If not in auth context, check localStorage and sessionStorage
        let userJson = sessionStorage.getItem("user");

        // If not in session storage, try local storage
        if (!userJson) {
          userJson = localStorage.getItem("user");
        }

        const parsedUser = userJson ? JSON.parse(userJson) : null;
        const userId = parsedUser?.id;

        if (!userId) {
          // Instead of throwing an error that might flash before redirect,
          // just trigger a redirect to login
          console.error("User ID not found, redirecting to login");
          router.push("/login");
          return;
        }

        // Format the data for display from storage
        const formattedData = {
          id: parsedUser.id,
          accountTitle: `${parsedUser.accountType || "Account"} (...${
            parsedUser.accountNumber?.slice(-4) || "0000"
          })`,
          name:
            parsedUser.accountName?.toUpperCase() ||
            parsedUser.name.toUpperCase(),
          availableBalance: parsedUser.balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          presentBalance: parsedUser.balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          availableCredit: parsedUser.availableCredit.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        };

        setData(formattedData);
        setIsLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching account data:", err);

        // Only show error if not authentication related
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof err.message === "string" &&
          err.message !== "User not logged in"
        ) {
          setError("Could not load account data");
        }
        // Use unknown type for error and then narrow it down
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof err.message === "string"
        ) {
          if (err.message === "User not logged in") {
            router.push("/login");
          } else {
            setError("Could not load account data");
          }
        } else {
          setError("An unexpected error occurred");
        }
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, router, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="rounded-[10px] bg-white border-[1px] border-gray-300 p-8 text-center">
        <p>Loading account information...</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-white border-[1px] border-gray-300">
      <div className="font-bold flex justify-between px-4 py-3">
        <h1>Bank accounts</h1>
        <div className="flex text-[#0a4386]">
          <Printer size={20} />
          <ChevronUp className="ml-2" />
        </div>
      </div>

      <h3 className="bg-[#f5f7fa] py-2 font-bold px-4 border-t-1 border-gray-300 uppercase">
        {data.name}
      </h3>

      <div>
        <div className="lg:flex justify-between items-center text-blue font-bold px-4 pt-4">
          <Link
            href={`/summary?id=${data.id}`}
            className="flex hover:bg-[#ebeff3] max-lg:mb-2 px-2 py-1 rounded-[5px] cursor-pointer items-center"
          >
            {data.accountType} <ChevronRight />
          </Link>
          <div className="flex max-lg:justify-center">
            <button className="bg-darkBlue text-white text-sm font-bold px-2 rounded-[5px]">
              Transfer money
            </button>
            <button className="flex items-center border-[1px] rounded-[5px] pl-2 pr-1 font-[12px] ml-4">
              More <ChevronDown />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-10 px-4 py-4 flex-wrap">
          <div className="grow-[1]">
            <h1 className="text-4xl font-bold">${data.availableBalance}</h1>
            <p className="text-sm border-b border-dashed border-gray-500 w-fit">
              Available balance
            </p>
          </div>

          <div>
            <h1 className="font-bold w-[180px] text-[18px]">
              ${data.presentBalance}
            </h1>
            <p className="text-sm border-b border-dashed border-gray-500 w-fit">
              Present balance
            </p>
          </div>

          <div>
            <h1 className="font-bold w-[180px] text-[18px]">
              ${data.availableCredit}
            </h1>
            <p className="text-sm w-fit">Available credit</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-2 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default BankAccount;
