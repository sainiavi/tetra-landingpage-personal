"use client";

import { motion } from "framer-motion";
import { type FC } from "react";
import JoinWaitlistButton from "./JoinWaitlistButton";

type VisionSectionProps = {
  onJoinWaitlist: () => void;
};

const VisionSection: FC<VisionSectionProps> = ({ onJoinWaitlist }) => {
  const paragraphMotion = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const headingMotion = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3,
      },
    },
  };

  const ctaMotion = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.5,
      },
    },
  };

  const viewportConfig = { once: true, amount: 0.1 };

  return (
    <div className="relative w-full py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#080807] border border-[#303030] rounded-lg p-6 sm:p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
            <div className="flex-1">
              <motion.h2
                className="text-lg sm:text-xl text-[#98C500] mb-4 sm:mb-6"
                variants={headingMotion}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                The TETRA Vision
              </motion.h2>

              <motion.div
                className="space-y-4 sm:space-y-6 text-white"
                variants={headingMotion}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.p
                  className="text-sm sm:text-base text-[#AFAFAF]"
                  style={{ lineHeight: '1.7' }}
                  variants={paragraphMotion}
                  transition={{ duration: 0.5 }}
                >
                  Tetra collapses the fragmented trading stack into a single execution surface
                  <br />
                  spanning discovery, routing, analytics, and automation across all asset classes
                  <br />
                    and chains.
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center lg:justify-start lg:pt-16"
              variants={ctaMotion}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <JoinWaitlistButton onJoinWaitlist={onJoinWaitlist} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;

