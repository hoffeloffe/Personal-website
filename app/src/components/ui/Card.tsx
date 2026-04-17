import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-white shadow-lg rounded-md p-5 ${className ?? ""}`}>
      {children}
    </div>
  );
};
