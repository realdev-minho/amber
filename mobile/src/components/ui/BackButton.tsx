import React from "react";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  onClick: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = "Back",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="btn-ghost"
      style={{
        gap: "6px",
        padding: "8px 12px",
        borderRadius: "20px",
        fontSize: "12px",
      }}
      aria-label="Go back"
    >
      <ArrowLeft size={16} color="#FF8A00" />
      <span>{label}</span>
    </button>
  );
};
