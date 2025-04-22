import React from "react";
import Image from "next/image";

const ExploreBusiness = () => {
  const Products = [
    { image: "checking.svg", name: "Checking" },
    { image: "creditCard.svg", name: "Credit cards" },
    { image: "loan.svg", name: "Loans & financing" },
    { image: "accept.svg", name: "Accept card payments" },
    { image: "saving.svg", name: "Savings" },
    { image: "retire.svg", name: "Retirement" },
    { image: "justforu.svg", name: "Just for you" },
    { image: "knowledge.svg", name: "Knowledge center" },
  ];
  return (
    <div className="bg-white px-4 py-4 border-1 border-gray-300 rounded-[10px]">
      <h1 className="mb-4 font-bold">Explore business products</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(95px,_1fr))]">
        {Products.map((product, index) => (
          <div
            key={index}
            className="w-[95px] h-[100px] flex flex-col items-center"
          >
            <Image
              alt={product.name}
              src={product.image}
              width={95 - 50}
              height={88 - 60}
            />
            <p className="text-sm text-blue text-center">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBusiness;
