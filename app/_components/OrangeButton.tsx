import React from "react";

type OrangeButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function OrangeButton({
  children,
  onClick,
  className = "",
  type = "button",
}: OrangeButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors duration-300 whitespace-nowrap ${className}`}
    >
      {children}
    </button>
  );
}
