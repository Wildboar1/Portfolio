"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Dynamically import Spline to prevent SSR errors
const Spline = dynamic(() => import("@splinetool/react-spline/next"), { ssr: false });

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const hudTopLeftRef = useRef<HTMLDivElement>(null);
  const hudTopRightRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  // States for Spline interactions
  const [isLoading, setIsLoading] = useState(true);

  // GSAP entrance animations on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text column (slide from left, fade in)
      gsap.fromTo(
        centerContentRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );

      // Animate HUD elements (slide from top, fade in)
      gsap.fromTo(
        hudTopLeftRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        hudTopRightRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // When Spline completes loading
  const handleSplineLoad = (splineApp: any) => {
    splineRef.current = splineApp;
    setIsLoading(false);
  };

  // Scroll to About Section
  const handleScrollToAbout = () => {
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-black font-sans select-none"
    >
      
      {/* 3D Spline Canvas Container */}
      <div className="absolute inset-0 lg:left-[20%] lg:right-auto lg:w-[100%] z-0 bg-black w-full h-full">
        <Spline 
          scene="/robotarm_new.splinecode" 
          onLoad={handleSplineLoad}
          className="h-full w-full pointer-events-auto"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-charcoal bg-opacity-80 backdrop-blur-sm">
          <div className="relative flex h-10 w-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-10 w-10 bg-gold/50"></span>
          </div>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Calibrating 3D Actuators...
          </span>
        </div>
      )}

      {/* Cybernetic Scanlines */}
      <div className="absolute inset-0 z-10 pointer-events-none scanline opacity-20" />

      {/* Grid Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/80" />

      {/* Interactive HUD Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
        
        {/* Floating HUD status bar (Top) */}
        <div className="flex w-full items-center justify-between pointer-events-auto mt-20 md:mt-24">
          <div 
            ref={hudTopLeftRef}
            className="flex items-center gap-3 rounded-full border border-white/5 bg-charcoal-100/60 px-4 py-2 backdrop-blur-md pointer-events-auto"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-300">
              3D_ACTUATOR_ONLINE
            </span>
          </div>

          <div 
            ref={hudTopRightRef}
            className="hidden items-center gap-6 font-mono text-[9px] tracking-[0.2em] text-neutral-400 md:flex pointer-events-auto"
          >
            <span>MODEL: ROBOTIC_ARM_V3</span>
            <span>SECURE LINK</span>
          </div>
        </div>

        {/* LEFT-ALIGNED CONTENT overlaying the side of the robotic arm */}
        <div className="flex w-full h-full flex-col justify-center items-start text-left pointer-events-auto pl-4 md:pl-12 lg:pl-20 mb-16">
          <div 
            ref={centerContentRef} 
            className="max-w-xl md:max-w-2xl flex flex-col items-start"
          >
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Autonomous Systems & Cloud Automation
            </span>
            <h1 className="mb-4 font-serif text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
              PREET <span className="text-gold">JOSHI</span>
            </h1>
            <p className="mb-8 max-w-xl font-sans text-xs font-light tracking-wide leading-relaxed text-neutral-400 md:text-sm">
              Python specialist & AWS Cloud architect designing self-healing cloud microservices, high-throughput backend APIs, and intelligent automation systems.
            </p>
            <div className="flex justify-start">
              <button 
                onClick={handleScrollToAbout}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-gold/30 hover:border-gold bg-charcoal px-8 py-4 font-sans text-[11px] tracking-[0.25em] text-gold transition-all duration-500 hover:scale-105 hover:bg-gold hover:text-charcoal"
              >
                <span className="relative z-10 font-bold">INITIALIZE SYSTEM</span>
                <svg className="relative z-10 h-3 w-3 transform transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gold/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


