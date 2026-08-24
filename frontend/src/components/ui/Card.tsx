import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;