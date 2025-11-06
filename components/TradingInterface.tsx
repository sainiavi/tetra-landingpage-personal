"use client";
import Image from "next/image";
import { useState, useEffect, useRef, type FC } from "react";

const TradingInterface: FC = () => {
  const [perspectiveAngle, setPerspectiveAngle] = useState(30);
  const containerElementRef = useRef<HTMLDivElement>(null);
  const fullyDisplayedRef = useRef(false);

  useEffect(() => {
    const calculatePerspective = () => {
      if (!containerElementRef.current) return;

      const elementBounds = containerElementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visibleArea =
        Math.min(elementBounds.bottom, viewportHeight) - Math.max(elementBounds.top, 0);
      const totalElementHeight = elementBounds.height;
      const displayRatio = Math.max(
        0,
        Math.min(1, visibleArea / totalElementHeight)
      );

      if (displayRatio >= 0.95) {
        fullyDisplayedRef.current = true;
      }

      if (fullyDisplayedRef.current && elementBounds.top < 0) {
        setPerspectiveAngle(0);
      } else {
        const computedAngle = 90 * (1 - displayRatio);
        setPerspectiveAngle(computedAngle);
      }
    };

    calculatePerspective();

    window.addEventListener("scroll", calculatePerspective, { passive: true });
    window.addEventListener("resize", calculatePerspective, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculatePerspective);
      window.removeEventListener("resize", calculatePerspective);
    };
  }, []);

  const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
  };

  const transformStyle = {
    transform: `perspective(1200px) rotateX(${perspectiveAngle}deg)`,
    transformOrigin: "center center",
    transformStyle: "preserve-3d" as any,
  };

  const imageShadowStyle = {
    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))",
  };

  return (
    <div
      ref={containerElementRef}
      className="relative w-full pt-16 sm:pt-20 md:pt-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-10"
          style={gridStyle}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6">
        <div
          className="relative transform-gpu transition-transform duration-150 ease-out"
          style={transformStyle}
        >
          <div className="relative">
            <Image
              src="/TetraProduct.png"
              alt="Trading Platform Interface"
              width={700}
              height={700}
              className="max-w-[720px] rounded-xl shadow-2xl border-3 border-[#7B9C09]"
              style={{ ...imageShadowStyle, width: "min(90vw, 720px)", height: "auto" }}
              priority
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
