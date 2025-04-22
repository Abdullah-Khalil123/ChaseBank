"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Printer, Download } from "lucide-react";
import { transactions as initialTransactions } from "../data";

export default function TransactionsTable() {
  const [transactions] = useState(initialTransactions);

  const shouldShowDate = (index: number) => {
    if (index === 0) return true;
    return transactions[index].date !== transactions[index - 1].date;
  };

  const getAmountColor = (amount: string) => {
    return amount.startsWith("-") ? "text-gray-900" : "text-blue-600";
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto ">
        <div className="bg-white shadow-md border-[1px] border-gray-300 rounded-lg overflow-hidden">
          <div className="py-3 border-b border-gray-200">
            <TransactionFilterBar />
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="px-6 py-3 text-left text-[13px] uppercase max-lg:hidden">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[13px] uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-[13px] uppercase max-lg:hidden">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-[13px] uppercase ">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-[13px] uppercase max-lg:hidden">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-[13px] uppercase "></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  // Check if this is the last transaction of the date group
                  const isLastInDateGroup =
                    index === transactions.length - 1 ||
                    transaction.date !== transactions[index + 1].date;

                  return (
                    <tr
                      key={index}
                      className={`bg-white ${
                        isLastInDateGroup ? "border-b border-black" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-lg:hidden">
                        {shouldShowDate(index) ? transaction.date : ""}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm text-gray-900 max-lg:max-w-[100px] ${
                          !isLastInDateGroup
                            ? "border-b border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        {transaction.description}
                      </td>
                      <td
                        className={`align-top px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-lg:hidden ${
                          !isLastInDateGroup
                            ? "border-b border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        {transaction.type}
                      </td>
                      <td
                        className={`align-top px-6 py-4 whitespace-nowrap text-sm text-right font-bold ${getAmountColor(
                          transaction.amount
                        )} ${
                          !isLastInDateGroup
                            ? "border-b border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        {transaction.amount}
                      </td>
                      <td
                        className={`align-top px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 max-lg:hidden ${
                          !isLastInDateGroup
                            ? "border-b border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        {transaction.balance}
                      </td>
                      <td
                        className={`align-top px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                          !isLastInDateGroup
                            ? "border-b border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        {transaction.hasDetails && (
                          <button className="text-blue-600 hover:text-blue-900 hover:cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TransactionFilterBar() {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white">
      <div className="flex items-center gap-4 w-full">
        <span className="text-[18px] font-medium text-gray-700 whitespace-nowrap">
          Showing
        </span>
        <select className="flex-1 border px-2 py-1 text-[18px] w-full mr-4">
          <option>All transactions</option>
          <option>All credit transactions</option>
          <option>All debit transactions</option>
          <option>ACH vendor payment</option>
          <option>Account transfer</option>
          <option>ACH credit</option>
          <option>ACH debit</option>
          <option>ACH employee payment</option>
          <option>Adjustment or reversal</option>
          <option>eGift debit</option>
          <option>ATM transaction</option>
          <option>Bill payment</option>
          <option>Zelle credit</option>
          <option>Zelle debit</option>
          <option>Card</option>
          <option>Checks under 2 years</option>
          <option>Checks over 2 years</option>
          <option>Deposit</option>
          <option>Incoming wire transfer</option>
          <option>Loan payment</option>
          <option>Misc. credit</option>
          <option>Misc. debit</option>
          <option>Outgoing wire transfer</option>
          <option>Overnight check</option>
          <option>Refund</option>
          <option>Returned deposit item</option>
          <option>Tax payment</option>
        </select>
      </div>
      <div className="flex items-center gap-4 text-blue-700">
        <Search className="w-5 h-5 cursor-pointer" />
        <SlidersHorizontal className="w-5 h-5 cursor-pointer" />
        <Printer className="w-5 h-5 cursor-pointer" />
        <Download className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
