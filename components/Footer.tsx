"use client";
import { useState, useEffect, useRef, type FC } from "react";

const TypingEffect: FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const [renderedText, setRenderedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const characterSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
            setRenderedText("");
            setIsTyping(false);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      intersectionObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        intersectionObserver.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    let timerId: NodeJS.Timeout;
    let charIndex = 0;
    const typingInterval = 50;

    setIsTyping(true);

    const typeCharacter = () => {
      if (charIndex < text.length) {
        if (charIndex < text.length - 1) {
          const randomCharacter =
            characterSet[Math.floor(Math.random() * characterSet.length)];
          setRenderedText(text.slice(0, charIndex) + randomCharacter);
        } else {
          setRenderedText(text.slice(0, charIndex + 1));
        }

        charIndex++;
        timerId = setTimeout(typeCharacter, typingInterval);
      } else {
        setIsTyping(false);
      }
    };

    typeCharacter();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [visible, text]);

  return (
    <span ref={elementRef} className={className}>
      {renderedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

const Footer: FC = () => {
  const gridPatternStyle = {
    backgroundImage: `
      linear-gradient(rgba(152, 197, 0, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(152, 197, 0, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    opacity: 0.2,
    maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)",
  };

  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(rgba(152, 197, 0, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(152, 197, 0, 0.4) 1px, transparent 1px),
      radial-gradient(ellipse at center, rgba(152, 197, 0, 0.3) 0%, rgba(152, 197, 0, 0.15) 70%, transparent 100%)
    `,
    backgroundSize: "60px 60px, 60px 60px, 100% 100%",
    filter: "blur(2px)",
  };

  const gradientBackgroundStyle = {
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
  };

  return (
    <>
      {/* Top Section (formerly FooterTop/HeaderFooter) */}
      <header className="relative bg-black text-white py-6 sm:py-8 px-4 sm:px-6">
        <div
          className="absolute inset-0"
          style={gridPatternStyle}
        />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
          <div className="flex flex-col mb-0 sm:mb-0">
            <div className="flex items-center gap-0">
            <div className="w-20 h-4 flex-shrink-0 mb-5">
              <img
                src="/og-image.png"
                alt="Tetra Logo"
                className="w-18 h-4 sm:w-20 sm:h-5 px-0"
              />
            </div>
          </div>
            <p className="text-[#8C946D] text-xs sm:text-sm max-w-xs sm:max-w-none">
              <TypingEffect text="Redefining how global markets trade on-chain" />
            </p>
          </div>

          <div className="flex space-x-4 items-center">
            <a
              href="https://x.com/tetra_trade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#98C500] transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/aDwNR2YFRr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#98C500] transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a
              href="https://t.me/tetra_trade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#98C500] transition-colors"
            >
              <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                <path d="M228.646,34.7676a11.96514,11.96514,0,0,0-12.21778-2.0752L31.87109,105.19729a11.99915,11.99915,0,0,0,2.03467,22.93457L84,138.15139v61.833a11.8137,11.8137,0,0,0,7.40771,11.08593,12.17148,12.17148,0,0,0,4.66846.94434,11.83219,11.83219,0,0,0,8.40918-3.5459l28.59619-28.59619L175.2749,217.003a11.89844,11.89844,0,0,0,7.88819,3.00195,12.112,12.112,0,0,0,3.72265-.59082,11.89762,11.89762,0,0,0,8.01319-8.73925L232.5127,46.542A11.97177,11.97177,0,0,0,228.646,34.7676ZM32.2749,116.71877a3.86572,3.86572,0,0,1,2.522-4.07617L203.97217,46.18044,87.07227,130.60769,35.47461,120.28811A3.86618,3.86618,0,0,1,32.2749,116.71877Zm66.55322,86.09375A3.99976,3.99976,0,0,1,92,199.9844V143.72048l35.064,30.85669ZM224.71484,44.7549,187.10107,208.88772a4.0003,4.0003,0,0,1-6.5415,2.10937l-86.1543-75.8164,129.66309-93.645A3.80732,3.80732,0,0,1,224.71484,44.7549Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Bottom Section (formerly Footer/PageFooter) */}
      <footer className="relative bg-black text-gray-400 py-6 sm:py-8 px-4 sm:px-6">
        <div
          className="absolute inset-0 opacity-25"
          style={gridBackgroundStyle}
        />
        <div
          className="absolute inset-0 z-5 flex justify-center"
          style={gradientBackgroundStyle}
        />
        <div className="relative z-10 w-full mx-auto flex text-center flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <p className="text-xs sm:text-sm text-[#474747] w-full flex item-center text-center justify-center sm:text-left">
              Tetra {new Date().getFullYear()}. All rights reserved.
            </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
