import React from "react";
import OverviewHeader from "../partials/overviewHeader";
import OverviewDetail from "./overviewDetail";
import BankAccount from "./OverviewComponents/BankAccount";
import PendingApprovals from "./OverviewComponents/PendingApprovals";
import ExternalAccounts from "./OverviewComponents/ExternalAccounts";
import UpgradeCheckout from "./OverviewComponents/UpgradeCheckout";
import Disclosure from "./Disclosure";
import CustomerInsight from "./OverviewComponents/CustomerInsight";
import HelpSupport from "./OverviewComponents/HelpSupport";
import ExploreBusiness from "./OverviewComponents/ExploreBusiness";

const OverviewPage = () => {
  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good morning";
  //   if (hour < 18) return "Good afternoon";
  //   return "Good evening";
  // };
  return (
    <div>
      <OverviewHeader showOptions />
      <OverviewDetail />

      <div className="flex justify-center">
        <div className="flex max-w-[1416px] max-lg:flex-col gap-6">
          <div className="flex flex-col gap-6 pl-[4px] py-[36px]">
            {/* <h2 className="text-[24px] font-bold">{getGreeting()}</h2> */}
            <BankAccount />
            <PendingApprovals />
            <ExternalAccounts />
            <UpgradeCheckout
              button="Continue"
              head="Upgrade your checkout"
              image="/save.jpg"
              tag="Get $100 off Chase POS™ Terminal — our fast, reliable wireless terminal to take payments and track sales. Plus, get no-fee, same-day deposits."
            />
          </div>
          <div className="flex flex-col py-[36px] pr-[4px] max-lg:pl-screen-x gap-6">
            <CustomerInsight />
            <ExploreBusiness />
            <HelpSupport />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[1416px] px-[10px] max-lg:pt-4">
          <Disclosure />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
