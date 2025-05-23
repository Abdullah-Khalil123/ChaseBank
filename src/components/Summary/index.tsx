"use client";
import React, { useEffect, useState } from "react";
import Button from "./SummaryComponents/Button";
import BreadCrumb from "./SummaryComponents/BreadCrumb";
import Divider from "./SummaryComponents/Divider";
import AccountButton from "./SummaryComponents/AccountButton";
import OverviewHeader from "../partials/overviewHeader";
import { ChevronDown, Printer } from "lucide-react";
import UpgradeCheckout from "../OverviewPage/OverviewComponents/UpgradeCheckout";
import TransactionsTable from "./SummaryComponents/TransactionTable";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const InfoCard = [
  {
    img: "/website.avif",
    head: "Put cash flow tools at your fingertips",
    tag: "Put cash flow tools at your fingertips",
    button: "Start now",
  },
  {
    img: "/1000dollar.jpg",
    head: "Refer a business to earn a cash bonus",
    tag: "Earn up to $1,000 per calendar year by referring businesses that open a new, qualifying Chase business checking account.",
    button: "Get started",
  },
  {
    img: "/dollar.webp",
    head: "Business offers just for you",
    tag: "Find the right solution to help you manage your business finances.",
    button: "Check your offers",
  },
  {
    img: "/save.jpg",
    head: "Upgrade your checkout",
    tag: "Get $100 off Chase POSTM Terminal — our fast, reliable wireless terminal to take payments and track sales. Plus, get no-fee, same-day deposits.",
    button: "Continue",
  },
];

const SummaryPage = () => {
  const [cardData] = useState(
    InfoCard[Math.floor(Math.random() * InfoCard.length)]
  );

  return (
    <div>
      <BalanceDetail />
      <div className="flex justify-center">
        <div className="w-[968px] ">
          <UncollectedFunds />

          <UpgradeCheckout
            head={cardData.head}
            tag={cardData.tag}
            button={cardData.button}
            image={cardData.img}
            className="items-center"
          />

          <h3 className="my-4 font-bold max-lg:ml-4">Transactions</h3>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

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

const BalanceDetail = () => {
  const { user, isAuthenticated } = useAuth(); // ✅ Add isAuthenticated
  const router = useRouter(); // Initialize router
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined" && userData) {
      document.title = `${
        userData.accountType +
          " (..." +
          userData.accountNumber?.slice(-4) +
          ")" || "Account"
      }`;
    }
  }, [userData]);

  useEffect(() => {
    // Set page title when component mounts
    const getUserData = () => {
      if (!isAuthenticated()) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }

      if (user) {
        setUserData({
          ...user,
          phone: user.phone || "",
          address: user.address || "",
          accountName: user.accountName || "",
          accountNumber: user.accountNumber || "",
          accountType: user.accountType || "",
        } as UserData);
        setLoading(false);
        return;
      }

      const sessionUser =
        typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
      if (sessionUser) {
        try {
          setUserData(JSON.parse(sessionUser));
          setLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing session user data:", error);
        }
      }

      const localUser =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (localUser) {
        try {
          setUserData(JSON.parse(localUser));
        } catch (error) {
          console.error("Error parsing local user data:", error);
        }
      }
      if (typeof document !== "undefined" && userData) {
        document.title = `${
          userData.accountType +
            " (..." +
            userData.accountNumber?.slice(-4) +
            ")" || "Account"
        }`;
      }
      setLoading(false);
    };

    getUserData();
  }, [user, isAuthenticated, router]); // Include dependencies

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-white pb-6">
      <OverviewHeader showOptions={false} />
      <div className="flex justify-center">
        <div className="w-[968px] mx-screen-x">
          <BreadCrumb />
          <Divider />
          {userData && (
            <>
              <p className="text-sm">{`${
                userData.accountType +
                  " (..." +
                  userData.accountNumber?.slice(-4) +
                  ")" || "Account"
              }`}</p>
              <p className="text-[12px] text-gray-600">
                {userData.accountName || userData.name}
              </p>
              <Balance
                balance={userData.balance}
                availableCredit={userData.availableCredit}
                user={userData}
              />
            </>
          )}
          <div className="mt-4" />
          <Divider />
          <div className="mt-6" />
          <div className="flex gap-3 flex-wrap max-md:justify-center">
            <Button>Statements</Button>
            <Button>Paperless</Button>
            <Button>Accept card payments</Button>
            <Button className="flex items-center">
              More
              <ChevronDown />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BalanceProps {
  balance: number;
  availableCredit: number;
  user: UserData | null;
}

const Balance = ({ balance, availableCredit, user }: BalanceProps) => {
  // Format numbers for display
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const availableBalance = formatCurrency(balance);
  const presentBalance = formatCurrency(balance);
  const availableCreditFormatted = formatCurrency(availableCredit);
  const totalAvailable = formatCurrency(balance + availableCredit);

  return (
    <div>
      <div className="flex justify-between gap-2 pb-2 items-start font-bold pt-4">
        <div className="mb-4">
          <h1 className="text-4xl">${availableBalance}</h1>
          <p className="text-sm font-normal border-b border-dashed border-gray-500 w-fit">
            Available balance
          </p>
        </div>
        <div className="flex">
          {/* <AccountButton /> */}
          <AccountInfoModal user={user} />
        </div>
      </div>
      <div className="flex">
        <div className="w-[218px]">
          <h1 className="font-bold">${presentBalance}</h1>
          <p className="text-sm border-b border-dashed border-gray-500 w-fit">
            Present balance
          </p>
        </div>
        <div className="w-[218px]">
          <h1 className="font-bold">${availableCreditFormatted}</h1>
          <p className="text-sm w-fit text-gray-text">Available credit</p>
        </div>
        <div className="w-[218px]">
          <h1 className="font-bold">${totalAvailable}</h1>
          <p className="text-sm w-fit text-gray-text">Available plus credit</p>
        </div>
      </div>
    </div>
  );
};

const UncollectedFunds = () => {
  return (
    <div className="my-4 flex justify-between bg-white w-full border-[1px] border-gray-300 rounded-[5px] px-4 py-4">
      <p className="font-bold">Uncollected funds</p>
      <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
        Total $ 0.00
      </p>
    </div>
  );
};

export default SummaryPage;

// Modal component that displays account and routing information
export function AccountInfoModal({ user }: { user: UserData | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Account Button that triggers the modal */}
      <button onClick={toggleModal} className="px-4 py-2 text-white rounded">
        <AccountButton />
      </button>

      {/* Modal overlay - only visible when isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 bg-black-opacity-40 flex items-center justify-center z-50">
          {/* Modal card */}
          <div className="bg-white rounded-md w-full max-w-[870px] mx-4">
            {/* Header */}
            <div className="pt-4 pl-4">
              <h2 className="font-semibold">Full Account and Routing Number</h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Account number row */}

              <div className="flex justify-start items-center">
                <span className="text-sm font-medium min-w-[370px]">
                  Account number
                </span>
                <span className="text-sm font-medium">
                  {user?.accountNumber}
                </span>
                <div className="flex items-center justify-end gap-4 w-full">
                  <button className="text-blue-600 ">
                    <Printer size={20} />
                  </button>
                </div>
              </div>

              {/* Routing number row */}
              <div className="flex justify-start items-center">
                <span className="text-sm font-medium w-[370px]">
                  Routing number
                </span>
                <span className="text-sm font-medium">{user?.phone}</span>
              </div>

              {/* Note about routing number */}
              <div className="pt-4">
                <p className="text-sm font-medium">
                  This routing number can only be used for direct deposits and
                  ACH transactions. For wire transfers, please use routing
                  number {user?.phone}.
                </p>
              </div>
            </div>

            {/* Footer with close button */}
            <div className="p-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="px-6 py-2 bg-[#021e45] w-[160px] text-white font-medium rounded hover:bg-blue-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
