"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperience } from "@/data";

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    itemsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, x: -50 },
        {
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="bg-charcoal px-4 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-24 font-serif text-4xl text-white md:text-6xl lg:text-7xl">
          THE <span className="text-gold">EXPERIENCE.</span>
        </h2>

        <div className="flex flex-col gap-8">
          {workExperience.map((experience, i) => (
            <div 
              key={experience.id}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="group flex flex-col items-start gap-6 border-t border-white/10 pt-8 transition-colors hover:border-gold md:flex-row md:items-center md:gap-12"
            >
              <div className="flex shrink-0 items-center justify-center p-4">
                <Image
                  width={80}
                  height={80}
                  src={experience.thumbnail}
                  alt={experience.title}
                  className="w-16 opacity-70 transition-opacity group-hover:opacity-100 md:w-20"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="mb-2 font-serif text-2xl text-white md:text-3xl">
                  {experience.title}
                </h3>
                <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-neutral-400 md:text-base">
                  {experience.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
