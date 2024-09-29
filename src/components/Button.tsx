import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Allows different button types
  onClick?: () => void; // Optional click handler
  children: React.ReactNode; // Button content (text, icons, etc.)
  disabled?: boolean; // Optional disabled state
  className?: string; // Optional custom styles
}

const Button = ({
  type = "button",
  onClick,
  children,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
