"use client";

import { motion } from "framer-motion";
import { type FC } from "react";

type HeroHeadingProps = {
  className?: string;
};

const HeroHeading: FC<HeroHeadingProps> = ({ className = "" }) => {
  const firstSentence = "Onchain trading terminal";
  const secondSentence = "for global markets";
  
  const firstWordArray = firstSentence.split(" ");
  const secondWordArray = secondSentence.split(" ");

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const wordAnimation = {
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

  const titleStyles = {
    fontWeight: 500,
    fontStyle: "normal" as const,
    fontFamily: '"Helvetica Neue", "Helvetica Neue Placeholder", sans-serif',
    color: "#ffffff",
    letterSpacing: "-0.04em",
    textAlign: "center" as const,
    lineHeight: "1.2",
    fontFeatureSettings: "normal",
  };

  const transitionConfig = {
    duration: 0.1,
    ease: "easeOut" as const,
  };

  const createWordElement = (word: string, index: number, identifier: string) => (
    <motion.span
      key={`${identifier}-${index}`}
      variants={wordAnimation}
      className="inline-block mr-2 sm:mr-3 last:mr-0"
      style={{ transformStyle: "preserve-3d" }}
      transition={transitionConfig}
    >
      {word}
    </motion.span>
  );

  return (
    <div className={`text-center ${className}`}>
      <motion.div
        className="text-center"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[58px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-none mx-auto px-4 sm:px-0 hero-heading-mobile"
          style={titleStyles}
        >
          <div className="mb-2 text-center block">
            {firstWordArray.map((word, index) => createWordElement(word, index, "first"))}
          </div>
          <div className="text-center block">
            {secondWordArray.map((word, index) => createWordElement(word, index, "second"))}
          </div>
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default HeroHeading;

