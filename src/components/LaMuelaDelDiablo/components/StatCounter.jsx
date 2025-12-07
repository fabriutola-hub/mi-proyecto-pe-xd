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
      const duration = 1500;

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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col items-start"
    >
      <div 
        className="font-heading font-black text-[clamp(3.5rem,4vw,5rem)] leading-none tracking-tight text-neo-black mb-2 group-hover:text-neo-orange transition-colors duration-500"
      >
        {count.toLocaleString()}{suffix}
      </div>

      <div className="h-px w-full bg-neo-black/20 my-4 group-hover:bg-neo-orange/50 transition-colors duration-500 origin-left group-hover:scale-x-100" />

      <p className="font-mono text-sm font-bold text-neo-black/60 uppercase tracking-widest group-hover:text-neo-black transition-colors">
        {label}
      </p>
    </motion.div>
  );
});

StatCounter.displayName = 'StatCounter';

export default StatCounter;
