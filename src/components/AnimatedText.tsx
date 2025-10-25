"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ className = "" }) => {
  const line1 = "Onchain trading terminal";
  const line2 = "for global markets";
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: -50,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
    },
  };

  return (
    <div className={`text-center ${className}`}>
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[58px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-none mx-auto px-4 sm:px-0 hero-heading-mobile"
          style={{
            fontWeight: 500,
            fontStyle: "normal",
            fontFamily:
              '"Helvetica Neue", "Helvetica Neue Placeholder", sans-serif',
            color: "#ffffff",
            letterSpacing: "-0.04em",
            textAlign: "center",
            lineHeight: "1.2",
            fontFeatureSettings: "normal",
          }}
        >
          {/* First line */}
          <div className="mb-2 text-center block">
            {words1.map((word, index) => (
              <motion.span
                key={`line1-${index}`}
                variants={wordVariants}
                className="inline-block mr-2 sm:mr-3 last:mr-0"
                style={{
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Second line */}
          <div className="text-center block">
            {words2.map((word, index) => (
              <motion.span
                key={`line2-${index}`}
                variants={wordVariants}
                className="inline-block mr-2 sm:mr-3 last:mr-0"
                style={{
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default AnimatedText;
