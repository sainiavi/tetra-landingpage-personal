"use client";

import { motion } from "framer-motion";

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const features = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_293_2417)">
            <path
              d="M17.5 16.25H2.5V3.75"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.625 5.625L10 11.25L7.5 8.75L2.5 13.75"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.625 8.75V5.625H12.5"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_293_2417">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Infinite Markets",
      description:
        "Trade perps, ape memecoins and get exposure to tokenized commodities & stocks- with pro-grade execution, alpha insights, and automation in an all encompassing interface.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_293_2422)">
            <path
              d="M3.75 15L16.25 15C16.9404 15 17.5 14.4404 17.5 13.75V5C17.5 4.30964 16.9404 3.75 16.25 3.75L3.75 3.75C3.05964 3.75 2.5 4.30964 2.5 5L2.5 13.75C2.5 14.4404 3.05964 15 3.75 15Z"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 17.5H7.5"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.125 8.75L10 6.875L11.875 8.75"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6.875V11.875"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_293_2422">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Alpha Discovery",
      description:
        "Track smart money movements, decode on-chain patterns, and catch trending narratives before they explode on CT- funneling noise into actionable edge.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_293_2428)">
            <path
              d="M0.798828 15.6247C1.42312 14.6648 2.27726 13.8761 3.28372 13.3301C4.29018 12.784 5.41708 12.498 6.56211 12.498C7.70714 12.498 8.83404 12.784 9.8405 13.3301C10.847 13.8761 11.7011 14.6648 12.3254 15.6247"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.4375 12.5C14.5825 12.4993 15.7095 12.7849 16.716 13.3306C17.7225 13.8764 18.5767 14.6651 19.2008 15.625"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5625 12.5C8.80616 12.5 10.625 10.6812 10.625 8.4375C10.625 6.19384 8.80616 4.375 6.5625 4.375C4.31884 4.375 2.5 6.19384 2.5 8.4375C2.5 10.6812 4.31884 12.5 6.5625 12.5Z"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9297 4.66406C12.4854 4.44242 13.0832 4.34625 13.6804 4.38244C14.2776 4.41862 14.8594 4.58626 15.3843 4.87338C15.9092 5.16051 16.3642 5.56002 16.7168 6.04337C17.0694 6.52672 17.3108 7.08198 17.4239 7.66948C17.537 8.25698 17.519 8.86221 17.3711 9.44192C17.2232 10.0216 16.949 10.5615 16.5682 11.023C16.1875 11.4845 15.7095 11.8562 15.1684 12.1115C14.6274 12.3668 14.0366 12.4995 13.4383 12.5"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_293_2428">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Social Trading",
      description:
        "Mirror proven traders with verified PnL. Track their moves, copy their trades in real time with Tetra.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_293_2434)">
            <path
              d="M2.62551 11.3672C2.30008 9.61066 2.61232 7.79565 3.50603 6.24885C4.39973 4.70205 5.81621 3.52504 7.50051 2.92969V8.55469L2.62551 11.3672Z"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.0004 10.0328V2.5C11.3144 2.5002 12.6053 2.84562 13.7439 3.50169C14.8824 4.15775 15.8286 5.10142 16.4876 6.23821C17.1467 7.37499 17.4956 8.66498 17.4992 9.979C17.5029 11.293 17.1613 12.5849 16.5086 13.7254C15.8559 14.8659 14.915 15.8148 13.7802 16.4772C12.6453 17.1397 11.3564 17.4923 10.0424 17.4999C8.72838 17.5074 7.43546 17.1696 6.29308 16.5203C5.1507 15.871 4.19898 14.9329 3.5332 13.8L10.0004 10.0328Z"
              stroke="#98C500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_293_2434">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Execution & Automation",
      description:
        "Launch DCA strategies, token snipers and sentiment-based copying. Deploy pro-grade orders: trailing stops, bracket orders, TWAP, iceberg, OCO pairs. Everything executes atomically across chains while you focus on strategy.",
    },
  ];

  return (
    <div className="relative w-full py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            className="text-lg sm:text-xl font-bold text-[#98C500] mb-3 sm:mb-4"
            variants={itemVariants}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            Why Tetra
          </motion.h2>
          <motion.p
            style={{ lineHeight: '1.7' }}
            className="text-sm sm:text-base text-[#AFAFAF] max-w-2xl mx-auto"
            variants={itemVariants}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            Unified analytics, automation, and execution
            <br />
            in a single lightning-fast super app.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col"
              variants={cardVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-row items-center gap-2 mb-3 sm:mb-4">
                <div className="text-[#98C500]">{feature.icon}</div>
                <h3 className="text-sm sm:text-base text-white">
                  {feature.title}
                </h3>
              </div>

              <div className="p-4 sm:p-6 rounded-lg bg-[#080807] border border-[#303030] h-[210px] sm:h-[200px] flex items-center">
                <p className="text-[#AFAFAF] text-xs sm:text-sm leading-relaxed text-left">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
