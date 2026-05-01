// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // You can extend ButtonHTMLAttributes to allow all the default button props
}

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-600 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
