"use client";

import { useState, type FC } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

type JoinWaitlistButtonProps = {
  className?: string;
  onJoinWaitlist?: () => void;
};

const JoinWaitlistButton: FC<JoinWaitlistButtonProps> = ({
  className = "",
  onJoinWaitlist,
}) => {
  const [hoverState, setHoverState] = useState(false);

  const handleMouseEnter = () => setHoverState(true);
  const handleMouseLeave = () => setHoverState(false);
  const handleClick = onJoinWaitlist || (() => console.log("Join Waitlist clicked!"));

  const buttonShadow = {
    boxShadow: "0 4px 12px rgba(123, 156, 9, 0.3)",
  };

  const textAnimation = {
    y: hoverState ? [20, 0] : [-20, 0],
    opacity: hoverState ? [0, 1] : [0, 1],
  };

  const animationConfig = {
    duration: 0.4,
    ease: [0.34, 1.56, 0.64, 1] as const,
  };

  return (
    <motion.button
      className={`relative bg-[#7B9C09] text-white border-none rounded-md px-4 py-3 text-base font-medium cursor-pointer flex items-center gap-2 h-10 overflow-hidden ${className}`}
      whileHover={buttonShadow}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.span
        className="font-medium tracking-wide"
        initial={{ y: 0, opacity: 1 }}
        animate={textAnimation}
        transition={animationConfig}
      >
        Join Waitlist
      </motion.span>

      {hoverState ? (
        <ArrowRight className="w-4 h-4" />
      ) : (
        <ArrowUpRight className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default JoinWaitlistButton;
