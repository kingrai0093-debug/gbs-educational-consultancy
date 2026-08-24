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
    xs: "h-9 sm:h-10",
    sm: "h-11 sm:h-12",
    md: "h-14 sm:h-16 md:h-18",
    lg: "h-18 sm:h-20 md:h-24",
    xl: "h-24 sm:h-28 md:h-32",
  }[size] || "h-14 sm:h-16 md:h-18";

  const logoSrc = "./web-log0.jpg";

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-transform duration-300 ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      } ${className}`}
      title="GBS International Educational Consultancy"
    >
      <img
        src={logoSrc}
        alt="GBS International Educational Consultancy"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith("web-logo.jpg")) {
            target.src = "./web-logo.jpg";
          }
        }}
        className={`object-contain rounded-lg drop-shadow-md w-auto max-w-full ${dimensions}`}
      />
    </div>
  );
};

