import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollParallaxBg({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export function ScrollRevealGroup({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
