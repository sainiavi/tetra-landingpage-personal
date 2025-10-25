"use client";

import React from "react";
import { motion } from "framer-motion";

interface DescriptionTextProps {
  className?: string;
}

const DescriptionText: React.FC<DescriptionTextProps> = ({
  className = "",
}) => {
  const description =
    "Trade crypto, stocks, and commodities across every chain with a full suite of advanced tools for trade execution with ultra-low latency, actionable alpha discovery and advanced automation features.";

  return (
    <motion.div
      className={`w-full max-w-2xl mx-auto ${className}`}
      style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        wordBreak: "break-word",
        fontWeight: 500,
        fontStyle: "normal",
        fontFamily:
          '"Helvetica Neue", "Helvetica Neue Placeholder", sans-serif',
        color: "#adb39b",
        fontSize: "16px",
        letterSpacing: "0em",
        textAlign: "center",
        lineHeight: "1.5",
        fontFeatureSettings: "normal",
      }}
    >
      <p className="hidden sm:block">
        Trade crypto, stocks, and commodities across every chain with a full suite
        <br />
        of advanced tools for trade execution with ultra-low latency, actionable
        <br />
        alpha discovery and advanced automation features.
      </p>
      <p className="block sm:hidden">{description}</p>
    </motion.div>
  );
};

export default DescriptionText;
