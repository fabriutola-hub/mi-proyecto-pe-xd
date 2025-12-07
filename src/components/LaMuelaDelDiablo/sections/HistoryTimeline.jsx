import { forwardRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { historyTimeline } from '../constants/historyTimeline';

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      className={`relative flex items-center justify-between mb-24 w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col`} 
    >
      <div className="hidden md:block w-5/12" />

      {/* Central Node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="absolute left-4 md:left-1/2 w-4 h-4 bg-neo-white border-2 border-neo-black z-20 -translate-x-1/2 flex items-center justify-center rounded-full"
      >
        <div className="w-1.5 h-1.5 bg-neo-black rounded-full" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`w-full md:w-5/12 pl-12 md:pl-0 ${
          isEven ? "md:pr-12 text-left" : "md:pl-12 text-left"
        }`}
      >
        <div className="group relative bg-neo-white border border-neo-black/10 p-8 shadow-sm hover:shadow-md hover:border-neo-orange transition-all duration-300">
          
          {/* Year/Era Badge */}
          <div className="relative z-10">
            <span className="inline-block px-0 pb-1 mb-4 text-xs font-bold font-mono text-neo-orange border-b-2 border-neo-orange uppercase tracking-widest">
              {item.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-xl mb-3 text-neo-black font-heading font-black uppercase leading-tight">
            {item.title}
          </h3>

          {/* Desc */}
          <p className="relative z-10 text-base font-body text-neo-black/60 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HistoryTimeline = forwardRef((props, ref) => {
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-sand relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
            backgroundImage: `linear-gradient(#2D2420 1px, transparent 1px), linear-gradient(90deg, #2D2420 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-black/60 uppercase mb-4 block">
                Cronología
            </span>
            
            <h2 className="text-[clamp(3rem,5vw,5rem)] leading-none tracking-tight mb-8 font-heading font-black text-neo-black uppercase">
               LEGADO <br/><span className="text-neo-orange">HISTÓRICO</span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg font-body text-neo-black/70 leading-relaxed">
              Un viaje a través del tiempo en Auki Kollo, donde cada estrato geológico
              y cada piedra cuenta la historia de la formación de los Andes.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neo-black/10 -translate-x-1/2" />

          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neo-orange origin-top -translate-x-1/2 z-10"
          />

          <div className="relative z-10 pt-10">
            {historyTimeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
          
          <div className="absolute bottom-0 left-4 md:left-1/2 w-3 h-3 bg-neo-black rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
        </div>

      </div>
    </section>
  );
});

HistoryTimeline.displayName = 'HistoryTimeline';

export default HistoryTimeline;
