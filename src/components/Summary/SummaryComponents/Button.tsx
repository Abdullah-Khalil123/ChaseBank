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
        `w-[200px] flex justify-center border-[1px] rounded-[5px] border-[#0d5fb6] text-[#0d5fb6] font-[500] text-[15px] px-4 py-1 hover:bg-[#ecf0f6] cursor-pointer ` +
        className
      }
    >
      {children}
    </div>
  );
};

export default Button;
