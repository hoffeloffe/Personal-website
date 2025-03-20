import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-md p-5 ${className}`}>
      {children}
    </div>
  );
};
