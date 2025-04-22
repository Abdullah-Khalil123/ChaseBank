import React from "react";

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        `text-nowrap min-w-[160px] flex justify-center border-[1px] rounded-[5px] border-[#0d5fb6] text-blue-button-text font-bold px-4 py-[6px] hover:bg-[#ecf0f6] cursor-pointer ` +
        className
      }
    >
      {children}
    </div>
  );
};

export default Button;
