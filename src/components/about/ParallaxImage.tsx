"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

/** Two overlapping photographs drifting at different speeds while scrolling */
export function ParallaxImage({ main, second }: { main: string; second?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 70]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[1/1.05] w-full max-w-lg">
      <motion.div style={{ y: y1 }} className="absolute inset-y-0 start-0 w-[74%] overflow-hidden rounded-t-[999px] rounded-b-[32px] bg-cream-300 shadow-lift">
        <SmartImage src={main} alt="" fill sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" />
      </motion.div>
      {second && (
        <motion.div style={{ y: y2 }} className="absolute bottom-[-4%] end-0 w-[50%] overflow-hidden rounded-[26px] border-8 border-cream bg-cream-200 shadow-lift">
          <div className="relative aspect-[4/5]">
            <SmartImage src={second} alt="" fill sizes="25vw" className="object-cover" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
