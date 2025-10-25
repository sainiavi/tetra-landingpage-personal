"use client";

import { motion } from "framer-motion";
import JoinWaitlistButton from "./JoinWaitlistButton";

export default function Ethos({
  onJoinWaitlist,
}: {
  onJoinWaitlist: () => void;
}) {
  const itemVariants = {
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

  const textVariants = {
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

  const buttonVariants = {
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

  return (
    <div className="relative w-full py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#080807] border border-[#303030] rounded-lg p-6 sm:p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
            <div className="flex-1">
              <motion.h2
                className="text-lg sm:text-xl text-[#98C500] mb-4 sm:mb-6"
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                The Tetra Ethos
              </motion.h2>

              <motion.div
                className="space-y-4 sm:space-y-6 text-white"
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.p
                  className="text-sm sm:text-base text-[#AFAFAF]"
                  style={{ lineHeight: '1.7' }}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  We were tired of juggling five apps just to make one trade.
                  <br />
                  So we built Tetra - A terminal that unifies fragmented
                  markets, simplifies
                  <br />
                  execution, and gives every trader the same tools as the pros.
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center lg:justify-start lg:pt-16"
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <JoinWaitlistButton onJoinWaitlist={onJoinWaitlist} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
