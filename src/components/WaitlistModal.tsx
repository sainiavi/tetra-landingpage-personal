"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [telegramUsername, setTelegramUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { telegramUsername, walletAddress });
    
    // Show toast notification
    toast.success("You will be notified soon", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-[#000000] border border-[#818670] rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-2 sm:mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center">
                  <img
                    src="/icon.svg"
                    alt="Tetra Icon"
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-white text-center mb-2 sm:mb-3">
              Join the Waitlist
            </h2>

            {/* Description */}
            <p className="text-[#818670] text-center text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
              Be among the first to access Tetra&apos;s advanced trading
              platform. Secure your spot today.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Telegram username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#818670] focus:outline-none transition-colors text-sm sm:text-base"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="EVM or SOL address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-16 sm:pr-20 bg-transparent border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#7B9C09] focus:outline-none transition-colors text-sm sm:text-base"
                />
                <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-[#7B9C09] text-xs pointer-events-none">
                  optional
                </span>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#7B9C09] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-[#6a8508] transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Secure my Spot
              </motion.button>
            </form>

            <div className="flex justify-center items-center gap-8 sm:gap-12 mt-6 sm:mt-8 pt-4 sm:pt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  2,847
                </div>
                <div className="text-[#818670] text-xs sm:text-sm mt-1">ON WAITLIST</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  156
                </div>
                <div className="text-[#818670] text-xs sm:text-sm mt-1">JOINED TODAY</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
