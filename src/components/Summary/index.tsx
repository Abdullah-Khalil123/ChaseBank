"use client";
import React, { useEffect, useState } from "react";
import Button from "./SummaryComponents/Button";
import BreadCrumb from "./SummaryComponents/BreadCrumb";
import Divider from "./SummaryComponents/Divider";
import AccountButton from "./SummaryComponents/AccountButton";
import OverviewHeader from "../partials/overviewHeader";
import { ChevronDown } from "lucide-react";
import UpgradeCheckout from "../OverviewPage/OverviewComponents/UpgradeCheckout";
import TransactionsTable from "./SummaryComponents/TransactionTable";

const SummaryPage = () => {
  return (
    <div>
      <BalanceDetail />
      <div className="flex justify-center">
        <div className="w-[968px] ">
          <UncollectedFunds />
          <UpgradeCheckout
            head="Put cash flow tools at your fingertips"
            tag="Put cash flow tools at your fingertips"
            button="Start now"
            image="/website.avif"
            className="items-center"
          />

          <h3 className="my-4 font-[600] max-lg:ml-4">Transactions</h3>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

interface BalanceData {
  accountTitle: string;
  name: string;
  availableBalance: string;
  presentBalance: string;
  availableCredit: string;
}

const BalanceDetail = () => {
  const [data, setData] = useState<BalanceData>({
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
    <div className="bg-white pb-6">
      <OverviewHeader showOptions={false} />
      <div className="flex justify-center">
        <div className="w-[968px] mx-screen-x">
          <BreadCrumb />
          <Divider />
          <p className="text-sm">{data.accountTitle}</p>
          <p className="text-[12px] text-gray-600">{data.name}</p>
          <Balance data={data} />
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

const Balance = ({ data }: { data: BalanceData }) => {
  return (
    <div>
      <div className="flex justify-between gap-2 pb-2 items-start font-[600] pt-4">
        <div className="mb-4">
          <h1 className="text-4xl">${data.availableBalance}</h1>
          <p className="text-sm font-normal border-b border-dashed border-gray-500 w-fit">
            Available balance
          </p>
        </div>
        <div className="flex">
          <AccountButton />
        </div>
      </div>
      <div className="flex">
        <div className="w-[218px]">
          <h1 className="font-[600]">${data.presentBalance}</h1>
          <p className=" text-sm border-b border-dashed border-gray-500 w-fit">
            Present balance
          </p>
        </div>
        <div className="w-[218px]">
          <h1 className="font-[600]">${data.availableBalance}</h1>
          <p className="text-sm w-fit text-gray-text">Available credit</p>
        </div>
        <div className="w-[218px]">
          <h1 className="font-[600]">
            ${data.availableBalance + data.availableCredit}
          </h1>
          <p className="text-sm w-fit text-gray-text">Available plus credit</p>
        </div>
      </div>
    </div>
  );
};

const UncollectedFunds = () => {
  return (
    <div className="my-4 flex justify-between bg-white w-full border-[1px] border-gray-300 rounded-[5px] px-4 py-4">
      <p className="font-[600]">Uncollected funds</p>
      <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
        Total $ 0.00
      </p>
    </div>
  );
};
export default SummaryPage;
