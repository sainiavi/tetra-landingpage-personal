"use client";

import { useState, type FC } from "react";
import HeroHeading from "@/components/HeroHeading";
import HeroDescription from "@/components/HeroDescription";
import VisionSection from "@/components/VisionSection";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import JoinWaitlistButton from "@/components/JoinWaitlistButton";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import TradingInterface from "@/components/TradingInterface";
import WaitlistModal from "@/components/WaitlistModal";

type HeroSectionProps = {
  onJoinWaitlist: () => void;
};

const HeroSection: FC<HeroSectionProps> = ({ onJoinWaitlist }) => {
  const gridPatternBackground = {
    backgroundImage: `
      linear-gradient(rgba(152, 197, 0, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(152, 197, 0, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
  };

  const fadeOverlay = {
    background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)"
  };

  return (
    <>
      <Navbar />
      <div className="relative">
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
        <div
          className="absolute inset-0 opacity-20"
          style={gridPatternBackground}
        />
        <div className="relative z-10 flex flex-col items-center justify-center pt-40 sm:pt-32 md:pt-40 px-4 sm:px-6">
          <HeroHeading />
          <div className="mt-6 mb-10">
            <HeroDescription />
          </div>
          <JoinWaitlistButton onJoinWaitlist={onJoinWaitlist} />
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 blur-sm"
          style={fadeOverlay}
        />
      </div>
      <TradingInterface />
    </>
  );
};

const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <HeroSection onJoinWaitlist={showModal} />
      <div className="px-4 sm:px-6">
        <FeatureGrid />
        <VisionSection onJoinWaitlist={showModal} />
        <Footer />
        <WaitlistModal isOpen={isModalOpen} onClose={hideModal} />
      </div>
    </main>
  );
};

export default Home;
