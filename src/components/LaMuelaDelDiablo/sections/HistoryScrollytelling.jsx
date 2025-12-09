import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { historyTimeline } from '../constants/historyTimeline';
import GeologicalLayers from '../components/GeologicalLayers';

const HistoryScrollytelling = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // We need to track which section is currently in view
  // Since we can't easily use IntersectionObserver for all items inside a single component easily without multiple refs,
  // we'll create a sub-component for the text blocks that reports visibility.

  return (
    <section ref={containerRef} className="relative bg-basalt text-white py-20 md:py-32">
       {/* Section Header */}
       <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-neon-lichen font-mono text-xs tracking-[0.3em] uppercase mb-4">
              Archivo Geológico
            </span>
            <h2 className="text-[clamp(3rem,5vw,4rem)] font-display font-black text-white uppercase leading-[0.9] tracking-tighter">
              Historia Escrita<br/>
              <span className="text-stroke-1 text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px white' }}>En Piedra</span>
            </h2>
          </motion.div>
       </div>

       <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-10 md:gap-20">

          {/* LEFT: Scrollable Text Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-[50vh] pb-[20vh]">
             {historyTimeline.map((item, index) => (
               <HistoryStep
                  key={index}
                  data={item}
                  index={index}
                  onInView={() => setActiveStep(index)}
               />
             ))}
          </div>

          {/* RIGHT: Sticky Visualization */}
          <div className="hidden md:block w-1/2 h-screen sticky top-0 flex items-center justify-center">
             <div className="w-full h-[600px] border border-slate/50 bg-slate/10 rounded-lg p-8 relative overflow-hidden backdrop-blur-sm">
                 {/* Scanlines / Texture */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none" />

                 <GeologicalLayers currentStep={activeStep} />
             </div>
          </div>

          {/* MOBILE: Fixed Bottom Visualization (Optional or simplified) */}
          {/* For mobile, we might just show the text blocks, or a smaller sticky header.
              Let's keep it simple for now: Text blocks are visible, Visualization is hidden on small screens
              or inserted between blocks (which breaks flow).
              Better approach for Mobile: The SVG is between title and text for each block?
              No, let's keep the Sticky behavior but maybe top-aligned or just simplified.
          */}
       </div>
    </section>
  );
};

// Sub-component for individual text blocks to detect visibility
const HistoryStep = ({ data, index, onInView }) => {
    return (
        <motion.div
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
            onViewportEnter={onInView}
            className="flex flex-col justify-center min-h-[40vh]"
        >
            <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl font-display font-black text-slate/20">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-neon-lichen font-mono text-sm tracking-widest uppercase bg-basalt border border-neon-lichen/30 px-2 py-1">
                    {data.year}
                </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 uppercase leading-none">
                {data.title}
            </h3>

            <p className="text-granite font-body text-lg leading-relaxed max-w-md border-l-2 border-neon-lichen pl-6">
                {data.desc}
            </p>
        </motion.div>
    )
}

export default HistoryScrollytelling;
