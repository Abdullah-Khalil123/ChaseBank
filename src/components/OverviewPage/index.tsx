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

const OverviewPage = () => {
  return (
    <div className="">
      <OverviewHeader />
      <OverviewDetail />
      <div className="flex">
        <div className="flex flex-col gap-6 px-screen-x py-screen-y">
          <BankAccount />
          <PendingApprovals />
          <ExternalAccounts />
          <UpgradeCheckout />
        </div>
        <div className="flex flex-col py-screen-y pr-screen-x gap-6">
          <CustomerInsight />
          <HelpSupport />
        </div>
      </div>
      <Disclosure />
    </div>
  );
};

export default OverviewPage;
