"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { gridItems } from "@/data";

export const Grid = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth fade up animation for bento grid section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-charcoal px-4 py-32 md:px-10 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-24 font-serif text-4xl text-white md:text-6xl lg:text-7xl">
          ABOUT <span className="text-gold">ME.</span>
        </h2>
        
        <BentoGrid className="w-full">
          {gridItems.map((item) => (
            <BentoGridItem
              id={item.id}
              key={item.id}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

