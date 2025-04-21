"use client";
import { useEffect, useState } from "react";

export default function AccountInput() {
  const [accountTitle, setAccountTitle] = useState(
    "BUS COMPLETE CHK (...6032)"
  );
  const [name, setName] = useState("TIGER PRODUCTS LLC");
  const [availableBalance, setAvailableBalance] = useState("20,249.75");
  const [presentBalance, setPresentBalance] = useState("20,249.75");
  const [availableCredit, setAvailableCredit] = useState("0.00");
  const [availablePlusCredit, setAvailablePlusCredit] = useState("20,249.75");

  const handleSave = () => {
    const data = {
      accountTitle,
      name,
      availableBalance,
      presentBalance,
      availableCredit,
      availablePlusCredit,
    };
    localStorage.setItem("accountData", JSON.stringify(data));
    alert("Data saved!");
  };

  useEffect(() => {
    const saved = localStorage.getItem("accountData");
    if (saved) {
      const data = JSON.parse(saved);
      setAccountTitle(data.accountTitle);
      setName(data.name);
      setAvailableBalance(data.availableBalance);
      setPresentBalance(data.presentBalance);
      setAvailableCredit(data.availableCredit);
      setAvailablePlusCredit(data.availablePlusCredit);
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Account Info</h1>

      <input
        type="text"
        placeholder="Account Title"
        className="border p-2 mb-2 w-full"
        value={accountTitle}
        onChange={(e) => setAccountTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Available Balance"
        className="border p-2 mb-2 w-full"
        value={availableBalance}
        onChange={(e) => setAvailableBalance(e.target.value)}
      />

      <input
        type="text"
        placeholder="Present Balance"
        className="border p-2 mb-2 w-full"
        value={presentBalance}
        onChange={(e) => setPresentBalance(e.target.value)}
      />

      <input
        type="text"
        placeholder="Available Credit"
        className="border p-2 mb-2 w-full"
        value={availableCredit}
        onChange={(e) => setAvailableCredit(e.target.value)}
      />

      <input
        type="text"
        placeholder="Available Plus Credit"
        className="border p-2 mb-4 w-full"
        value={availablePlusCredit}
        onChange={(e) => setAvailablePlusCredit(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
