"use client";

import { motion } from "framer-motion";
import { type FC } from "react";

type HeroDescriptionProps = {
  className?: string;
};

const HeroDescription: FC<HeroDescriptionProps> = ({
  className = "",
}) => {
  const contentText =
    "Trade crypto, stocks, and commodities across every chain with a full suite of advanced tools for trade execution with ultra-low latency, actionable alpha discovery and advanced automation features.";

  const paragraphStyles = {
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
    wordBreak: "break-word" as const,
    fontWeight: 500,
    fontStyle: "normal" as const,
    fontFamily: '"Helvetica Neue", "Helvetica Neue Placeholder", sans-serif',
    color: "#adb39b",
    fontSize: "16px",
    letterSpacing: "0em",
    textAlign: "center" as const,
    lineHeight: "1.5",
    fontFeatureSettings: "normal",
  };

  return (
    <motion.div
      className={`w-full max-w-2xl mx-auto ${className}`}
      style={paragraphStyles}
    >
      <p className="hidden sm:block">
        Trade crypto, stocks, and commodities across every chain with a full suite
        <br />
        of advanced tools for trade execution with ultra-low latency, actionable
        <br />
        alpha discovery and advanced automation features.
      </p>
      <p className="block sm:hidden">{contentText}</p>
    </motion.div>
  );
};

export default HeroDescription;

