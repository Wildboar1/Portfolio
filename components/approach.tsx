"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const approachPhases = [
  {
    title: "Planning & Strategy",
    description: "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements."
  },
  {
    title: "Deployment & Progress Update",
    description: "Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way."
  },
  {
    title: "Development & Launch",
    description: "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up."
  }
];

export const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    cardsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, y: 100 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section className="bg-charcoal px-4 py-32 md:px-10" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-24 text-center font-serif text-4xl text-white md:text-6xl lg:text-7xl">
          MY <span className="text-gold">PROCESS.</span>
        </h2>

        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-stretch lg:gap-8">
          {approachPhases.map((phase, i) => (
            <div 
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative flex w-full max-w-md flex-col items-center justify-center border border-white/5 bg-charcoal-100 px-8 py-16 text-center transition-all duration-500 hover:border-gold/30 hover:bg-charcoal-200"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <span className="relative z-10 mb-6 font-serif text-6xl text-white/10 transition-colors duration-500 group-hover:text-gold/20">
                0{i + 1}
              </span>
              
              <h3 className="relative z-10 mb-4 font-serif text-2xl text-white md:text-3xl">
                {phase.title}
              </h3>
              
              <p className="relative z-10 font-sans text-sm font-light leading-relaxed text-neutral-400">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
