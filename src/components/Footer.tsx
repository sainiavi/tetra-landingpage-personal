import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-gray-400 py-6 sm:py-8 px-4 sm:px-6">
      {/* Light green grid lines with gradient */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(152, 197, 0, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(152, 197, 0, 0.4) 1px, transparent 1px),
            radial-gradient(ellipse at center, rgba(152, 197, 0, 0.3) 0%, rgba(152, 197, 0, 0.15) 70%, transparent 100%)
          `,
          backgroundSize: "60px 60px, 60px 60px, 100% 100%",
          filter: "blur(2px)",
        }}
      />
      
      {/* Green gradient centered and vertical */}
      <div
        className="absolute inset-0 z-5 flex justify-center"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 150% at center bottom,
              rgba(152, 197, 0, 0.15) 0%,
              rgba(152, 197, 0, 0.09) 25%,
              rgba(152, 197, 0, 0.06) 50%,
              rgba(152, 197, 0, 0.03) 75%,
              transparent 100%
            )
          `,
          filter: "blur(3px)",
          maskImage: "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="order-2 sm:order-1">
          <p className="text-xs sm:text-sm text-[#474747] text-center sm:text-left">
            Tetra 2025. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-4 sm:space-x-6 order-1 sm:order-2">
          <a
            href="#"
            className="text-xs sm:text-sm text-[#474747] hover:text-white transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm text-[#474747] hover:text-white transition-colors"
          >
            Disclosure
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm text-[#474747] hover:text-white transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>  
  );
};

export default Footer;
