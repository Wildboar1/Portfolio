"use client";

import Lottie from "lottie-react";

import animationData from "@/data/confetti.json";

interface BentoGridLottieProps {
  copied: boolean;
}

const BentoGridLottie = ({ copied }: BentoGridLottieProps) => {
  return (
    <button
      tabIndex={-1}
      className="pointer-events-none absolute -bottom-5 right-0 cursor-default"
    >
      <Lottie
        animationData={animationData}
        loop={copied}
        autoplay={copied}
        style={{ width: "100%", height: "100%" }}
      />
    </button>
  );
};

export default BentoGridLottie;
