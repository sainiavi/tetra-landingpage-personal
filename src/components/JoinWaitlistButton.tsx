"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface JoinWaitlistButtonProps {
  className?: string;
  onJoinWaitlist?: () => void;
}

const JoinWaitlistButton: React.FC<JoinWaitlistButtonProps> = ({
  className = "",
  onJoinWaitlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative bg-[#7B9C09] text-white border-none rounded-md px-4 py-3 text-base font-medium cursor-pointer flex items-center gap-2 h-10 overflow-hidden ${className}`}
      whileHover={{
        boxShadow: "0 4px 12px rgba(123, 156, 9, 0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onJoinWaitlist || (() => console.log("Join Waitlist clicked!"))}
    >
      <motion.span
        className="font-medium tracking-wide"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isHovered ? [20, 0] : [-20, 0],
          opacity: isHovered ? [0, 1] : [0, 1],
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        Join Waitlist
      </motion.span>

      {isHovered ? (
        <ArrowRight className="w-4 h-4" />
      ) : (
        <ArrowUpRight className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default JoinWaitlistButton;
