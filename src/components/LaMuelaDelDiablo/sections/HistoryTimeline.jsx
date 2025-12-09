import { forwardRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { historyTimeline } from '../constants/historyTimeline';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { BentoItem } from '@/components/ui/BentoItem';

// Componente individual para cada item del timeline (Adaptado a Bento Card)
const TimelineBentoItem = ({ item, index }) => {
  return (
    <BentoItem
        span="md:col-span-3 min-h-[200px]"
        className="bg-slate border-slate md:flex-row flex-col items-center"
        header={null} // Custom layout inside
        title={null}
        description={null}
        icon={null} // Custom layout below
    >
        <div className="flex flex-col md:flex-row w-full h-full p-8 gap-8 items-center">
             {/* Year / Era Marker */}
            <div className="flex flex-col items-center md:items-start min-w-[150px] border-r border-basalt/20 pr-8">
                <span className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter">
                   0{index + 1}
                </span>
                <span className="text-neon-lichen font-mono text-sm tracking-widest uppercase mt-2">
                    {item.year}
                </span>
            </div>

             {/* Content */}
             <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide">
                    {item.title}
                </h3>
                <p className="text-granite font-body leading-relaxed text-sm md:text-base max-w-3xl">
                    {item.desc}
                </p>
             </div>

             {/* Decorative graphic or icon based on index/type if available, or just a generic tech graphic */}
             <div className="hidden md:flex items-center justify-center w-16 h-16 border border-basalt/50 bg-basalt rounded-full">
                 <div className="w-2 h-2 bg-neon-lichen rounded-full animate-pulse" />
             </div>
        </div>
    </BentoItem>
  );
};

const HistoryTimeline = forwardRef((props, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  return (
    <section ref={ref} className="py-32 bg-basalt relative overflow-hidden border-t border-slate">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#CCFF00_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-neon-lichen font-mono text-xs tracking-[0.3em] uppercase mb-4">
              Geological Archive
            </span>
            
            <h2 className="text-[clamp(3rem,5vw,4rem)] font-display font-black text-white uppercase leading-[0.9] tracking-tighter">
              A History Written<br/>
              <span className="text-stroke-1 text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px white' }}>In Stone</span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline as Vertical Stack of Bento Cards */}
        <div className="flex flex-col gap-6 relative">
             {/* Connecting Line */}
             <div className="absolute left-[8px] md:left-[83px] top-4 bottom-4 w-[2px] bg-slate z-0 hidden md:block" />

            {historyTimeline.map((item, i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
                 className="z-10"
              >
                  <TimelineBentoItem item={item} index={i} />
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
});

HistoryTimeline.displayName = 'HistoryTimeline';

export default HistoryTimeline;
