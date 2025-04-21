import React from "react";
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
        <div className="w-[1024px]">
          <UncollectedFunds />
          <UpgradeCheckout
            head="Put cash flow tools at your fingertips"
            tag="Put cash flow tools at your fingertips"
            button="Start now"
            image="/website.avif"
            className="items-center"
          />

          <h3 className="my-4 font-[600]">Transactions</h3>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

const BalanceDetail = () => {
  return (
    <div className="bg-white pb-6">
      <OverviewHeader showOptions={false} />
      <div className="flex justify-center">
        <div className="w-[1024px]">
          <BreadCrumb />
          <Divider />
          <p className="text-[14px]">BUS COMPLETE CHK (...6032)</p>
          <p className="text-[12px] text-gray-600">TIGER PRODUCT INC.</p>
          <Balance />
          <div className="mt-4" />
          <Divider />
          <div className="mt-6" />
          <div className="flex gap-3">
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

const Balance = () => {
  return (
    <div>
      <div className="flex justify-between items-start font-[600] pt-4">
        <div className="mb-4">
          <h1 className="text-4xl">$20,151.91</h1>
          <p className="text-[12px] font-normal border-b border-dashed border-gray-500 w-fit">
            Available balance
          </p>
        </div>
        <AccountButton />
      </div>
      <div className="flex w-[50%] justify-between">
        <div>
          <h1>$20,151.91</h1>
          <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
            Present balance
          </p>
        </div>
        <div>
          <h1>$0</h1>
          <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
            Present balance
          </p>
        </div>
        <div>
          <h1>$0</h1>
          <p className="text-[12px] border-b border-dashed border-gray-500 w-fit">
            Present balance
          </p>
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
