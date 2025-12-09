import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const StatCounter = memo(({ target, label, suffix, inView, delay }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const duration = 1500; // Slower, more impactful

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.floor(target * easeOut));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [inView, target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative group min-h-[200px] flex flex-col justify-center items-center px-4 py-8 border border-slate bg-basalt hover:border-neon-lichen transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 p-2 opacity-50">
        <div className="w-2 h-2 border-t border-l border-neon-lichen"></div>
      </div>
      <div className="absolute bottom-0 right-0 p-2 opacity-50">
         <div className="w-2 h-2 border-b border-r border-neon-lichen"></div>
      </div>

      <div 
        className="font-display font-black text-[clamp(4rem,6vw,6rem)] leading-none tracking-tighter mb-2 text-white group-hover:text-neon-lichen transition-colors duration-300"
      >
        {count.toLocaleString()}{suffix}
      </div>

      <p className="font-mono text-xs md:text-sm text-granite uppercase tracking-[0.2em] px-2 bg-slate/50 py-1 rounded-sm">
        {label}
      </p>
    </motion.div>
  );
});

StatCounter.displayName = 'StatCounter';

export default StatCounter;
