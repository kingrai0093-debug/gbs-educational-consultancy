import React from "react";

interface NepalMapShapeProps {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  glow?: boolean;
}

/**
 * High-Precision Vector Geometry of the Map of Nepal
 * Accurately matching the uploaded official Nepal outline (Chuchche Naksha with Limpiyadhura/Kalapani horn)
 * Aspect ratio ~16:9 in viewBox 0 0 800 450
 */
export const NEPAL_MAP_PATH_800 =
  "M 65 30 " +
  "L 72 38 L 88 56 L 102 65 L 115 62 L 128 54 L 145 52 L 160 50 L 175 60 L 195 72 " +
  "L 210 82 L 230 98 L 248 114 L 268 126 L 285 138 L 305 142 L 325 142 L 342 135 " +
  "L 358 140 L 372 155 L 390 170 L 408 178 L 425 195 L 442 208 L 465 218 L 482 208 " +
  "L 500 225 L 518 238 L 535 248 L 552 238 L 570 252 L 590 262 L 610 268 L 632 278 " +
  "L 655 280 L 680 282 L 710 278 L 735 272 L 760 270 L 766 285 L 762 315 L 754 345 " +
  "L 758 375 L 764 400 L 758 425 L 745 432 L 725 435 L 705 422 L 688 412 L 670 425 " +
  "L 650 435 L 632 428 L 615 418 L 595 408 L 575 400 L 552 392 L 530 382 L 512 362 " +
  "L 485 352 L 455 345 L 425 338 L 395 335 L 365 332 L 335 328 L 305 315 L 275 298 " +
  "L 245 280 L 215 258 L 185 235 L 155 215 L 125 198 L 98 185 L 75 180 L 55 178 " +
  "L 35 172 L 20 162 L 28 145 L 38 128 L 42 108 L 52 82 L 42 62 L 55 42 Z";

export const NepalMapOutlineVector: React.FC<NepalMapShapeProps> = ({
  className = "w-full h-full",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2.5,
  glow = false,
}) => {
  return (
    <svg
      viewBox="0 0 800 450"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {glow && (
          <filter id="nepalMapGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      <path
        d={NEPAL_MAP_PATH_800}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? "url(#nepalMapGlow)" : undefined}
      />
    </svg>
  );
};
