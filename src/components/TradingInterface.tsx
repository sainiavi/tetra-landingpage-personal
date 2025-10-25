"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function TradingInterface() {
  const [rotation, setRotation] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasReachedFullViewRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const totalHeight = rect.height;
      const intersectionRatio = Math.max(
        0,
        Math.min(1, visibleHeight / totalHeight)
      );

      if (intersectionRatio >= 0.95) {
        hasReachedFullViewRef.current = true;
      }

      if (hasReachedFullViewRef.current && rect.top < 0) {
        setRotation(0);
      } else {
        const newRotation = 30 * (1 - intersectionRatio);
        setRotation(newRotation);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-16 sm:pt-20 md:pt-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6">
        <div
          className="relative transform-gpu transition-transform duration-150 ease-out"
          style={{
            transform: `perspective(700px) rotateX(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <div className="relative">
            <Image
              src="/image.png"
              alt="Trading Platform Interface"
              width={700}
              height={700}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none rounded-xl shadow-2xl border border-gray-700/50"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))",
              }}
              priority
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
