"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data";

const ProjectImage = ({ img, title }: { img: string; title: string }) => {
  const [imgSrc, setImgSrc] = useState(img || "/bg.png");

  useEffect(() => {
    setImgSrc(img || "/bg.png");
  }, [img]);

  const handleImageError = () => {
    if (imgSrc.endsWith(".jpeg")) {
      setImgSrc(imgSrc.replace(".jpeg", ".png"));
    } else if (imgSrc.endsWith(".png")) {
      setImgSrc(imgSrc.replace(".png", ".jpg"));
    } else if (imgSrc.endsWith(".jpg")) {
      setImgSrc(imgSrc.replace(".jpg", ".svg"));
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={title}
      fill
      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      onError={handleImageError}
    />
  );
};

export const RecentProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    cardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, y: 100 },
        {
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-charcoal px-4 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-24 font-serif text-4xl text-white md:text-6xl lg:text-7xl">
          RECENT <span className="text-gold">CERTIFICATIONS.</span>
        </h2>

        <div className="flex flex-col gap-24">
          {projects.map(({ id, des, img, link, title }, index) => (
            <div 
              key={id} 
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group relative flex flex-col items-center gap-10 md:flex-row md:even:flex-row-reverse"
            >
              <div className="relative h-[40vh] w-full overflow-hidden md:h-[60vh] md:w-1/2">
                <div className="absolute inset-0 z-10 bg-gold/10 transition-colors duration-500 group-hover:bg-transparent" />
                <ProjectImage img={img} title={title} />
              </div>

              <div className="flex w-full flex-col justify-center md:w-1/2 md:px-12">
                <span className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-gold">
                  0{index + 1}
                </span>
                <h3 className="mb-6 font-serif text-3xl text-white md:text-5xl">
                  {title}
                </h3>
                <p className="mb-10 font-sans font-light leading-relaxed text-neutral-400 md:text-lg">
                  {des}
                </p>

                <Link
                  href={link}
                  className="inline-flex w-fit items-center border-b border-gold pb-2 font-sans text-sm tracking-widest text-gold transition-all hover:pr-4"
                >
                  VIEW CREDENTIAL
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
