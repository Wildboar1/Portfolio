"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { navItems } from "@/data";
import { cn } from "@/lib/utils";

type FloatingNavProps = {
  navItems: typeof navItems;
  className?: string;
};

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
       if (current < 50) {
        setVisible(true);
      } else {
        if (current > lastScrollY) {
          setVisible(false); // Scrolling down
        } else {
          setVisible(true); // Scrolling up
        }
      }
      setLastScrollY(current);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-[5000] flex w-full items-center justify-center space-x-8 border-b border-white/5 bg-charcoal/50 px-10 py-6 backdrop-blur-md transition-all duration-300",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
            )}
          >
            <span className="!cursor-pointer font-sans text-xs uppercase tracking-[0.2em]">{navItem.name}</span>
          </Link>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
};
