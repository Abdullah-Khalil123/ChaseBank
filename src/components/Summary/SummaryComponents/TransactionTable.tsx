"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Printer, Download } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: string;
  balance: string;
  hasDetails: boolean;
  userId: string;
}

interface PaginationData {
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

export default function TransactionsTable() {
  const { user } = useAuth(); // Get user from auth context
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Try to get the user ID from auth context first
        let userId = user?.id;

        // If no user in context, check storages as fallback
        if (!userId) {
          // Try session storage
          const sessionUser = sessionStorage.getItem("user");
          if (sessionUser) {
            try {
              const parsedUser = JSON.parse(sessionUser);
              userId = parsedUser.id;
            } catch (error) {
              console.error("Error parsing session user data:", error);
            }
          }

          // If still no userId, try local storage
          if (!userId) {
            const localUser = localStorage.getItem("user");
            if (localUser) {
              try {
                const parsedUser = JSON.parse(localUser);
                userId = parsedUser.id;
              } catch (error) {
                console.error("Error parsing local user data:", error);
              }
            }
          }
        }

        // If still no userId, we need to handle this error
        if (!userId) {
          setError("User data not found. Please try logging in again.");
          setLoading(false);
          return;
        }

        // If we have a userId, fetch the transactions
        const response = await axiosInstance.get(`/transactions/${userId}`, {
          params: {
            limit: 20,
            page: pagination.currentPage,
          },
        });

        const { data, totalPages, currentPage, results } = response.data;

        setTransactions(data.transactions);
        setPagination({
          totalPages,
          currentPage,
          totalResults: results,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [pagination.currentPage, user]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const shouldShowDate = (index: number) => {
    if (index === 0) return true;
    return transactions[index].date !== transactions[index - 1].date;
  };

  const getAmountColor = (amount: string) => {
    return amount.toString().startsWith("-") ? "text-gray-900" : "text-blue";
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-md border-[1px] border-gray-300 rounded-lg overflow-hidden p-8 text-center">
            Loading transactions...
          </div>
        </div>
      </div>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-md border-[1px] border-gray-300 rounded-lg overflow-hidden p-8 text-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
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
                  <th className="px-6 py-3 text-right text-[13px] uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-[13px] uppercase max-lg:hidden">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-[13px] uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  (() => {
                    let computedBalance = parseFloat(
                      transactions[0]?.balance ?? "0"
                    );

                    return transactions.map((transaction, index) => {
                      const formattedDate = new Date(
                        transaction.date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                      const isLastInDateGroup =
                        index === transactions.length - 1 ||
                        transaction.date !== transactions[index + 1].date;

                      const amount = parseFloat(transaction.amount.toString());

                      // Compute and format new balance
                      computedBalance -= amount;
                      const displayedBalance = computedBalance.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      );

                      return (
                        <tr
                          key={transaction.id}
                          className={`bg-white ${
                            isLastInDateGroup ? "border-b border-black" : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-lg:hidden">
                            {shouldShowDate(index) ? formattedDate : ""}
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
                            {parseFloat(transaction.amount).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>
                          <td
                            className={`align-top px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 max-lg:hidden ${
                              !isLastInDateGroup
                                ? "border-b border-dashed border-gray-500"
                                : ""
                            }`}
                          >
                            {displayedBalance}
                          </td>
                          <td
                            className={`align-top px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                              !isLastInDateGroup
                                ? "border-b border-dashed border-gray-500"
                                : ""
                            }`}
                          >
                            {transaction.hasDetails && (
                              <button className="text-blue hover:text-blue-900 hover:cursor-pointer">
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
                    });
                  })()
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    pagination.currentPage === 1
                      ? "text-gray-400 border-gray-200"
                      : "text-blue border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-3 py-1 rounded border ${
                    pagination.currentPage === pagination.totalPages
                      ? "text-gray-400 border-gray-200"
                      : "text-blue border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
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
