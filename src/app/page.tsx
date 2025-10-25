"use client";

import React from "react";
import AnimatedText from "@/components/AnimatedText";
import DescriptionText from "@/components/DescriptionText";
import Ethos from "@/components/Ethos";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import FooterTop from "@/components/FooterTop";
import JoinWaitlistButton from "@/components/JoinWaitlistButton";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import TradingInterface from "@/components/TradingInterface";
import WaitlistModal from "@/components/WaitlistModal";

function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <>
      <Navbar />
      <div className="relative">
        {/* LightRays component */}
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#98C500"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        {/* Light green grid lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(152, 197, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(152, 197, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-40 sm:pt-32 md:pt-40 px-4 sm:px-6">
        <AnimatedText />
        <div className="mt-6 mb-10">
          <DescriptionText />
        </div>
        <JoinWaitlistButton onJoinWaitlist={onJoinWaitlist} />
        </div>
        {/* Blur transition overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 blur-sm"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)"
          }}
        />
      </div>
      <TradingInterface />
    </>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleJoinWaitlist = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Hero onJoinWaitlist={handleJoinWaitlist} />
      <div className="px-4 sm:px-6">
        <Features />
        <Ethos onJoinWaitlist={handleJoinWaitlist} />
        <FooterTop />
        <Footer />
        <WaitlistModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </main>
  );
}
