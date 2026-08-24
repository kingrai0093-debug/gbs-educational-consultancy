import React from "react";

interface GBSLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  variant?: "badge" | "dark" | "light" | "transparent";
  onClick?: () => void;
}

export const GBSLogo: React.FC<GBSLogoProps> = ({
  className = "",
  size = "md",
  onClick,
}) => {
  const dimensions = {
    xs: { imgH: 40 },
    sm: { imgH: 52 },
    md: { imgH: 64 },
    lg: { imgH: 80 },
    xl: { imgH: 100 },
  }[size] || { imgH: 64 };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-transform duration-300 ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      } ${className}`}
      title="GBS Educational Consultancy"
    >
      <img
        src="/web-log0.jpg"
        alt="GBS Educational Consultancy Logo"
        style={{ height: `${dimensions.imgH}px`, width: "auto" }}
        className="object-contain rounded drop-shadow-sm max-h-[80px]"
      />
    </div>
  );
};
