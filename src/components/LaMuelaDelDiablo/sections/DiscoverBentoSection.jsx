import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { BentoItem } from '@/components/ui/BentoItem';
import { Cloud, Mountain, Map as MapIcon, Navigation, Wind, Thermometer } from 'lucide-react';

// Lazy load the map to avoid heavy initial load
// Correcting the import path: The component is at src/components/MapaInteractivo.jsx
// This file is at src/components/LaMuelaDelDiablo/sections/DiscoverBentoSection.jsx
// So we need to go up two levels: ../../
// Wait, listing showed: src/components/MapaInteractivo.jsx
// So ../../components/MapaInteractivo is correct if we are in sections.
// Let's verify the file structure again.
const MapaInteractivo = lazy(() => import('../../../components/MapaInteractivo'));

const DiscoverBentoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock weather data state - could be real later
  const [weather, setWeather] = useState({ temp: '12°C', wind: '15km/h', condition: 'Partly Cloudy' });

  return (
    <section ref={ref} className="bg-basalt py-20 px-4 md:px-8 relative z-10 border-t border-slate">
      <div className="max-w-7xl mx-auto mb-12 text-center md:text-left">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
             <span className="text-neon-lichen font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
              Exploration Hub
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-2">
              Discover <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/10" style={{ WebkitTextStroke: '1px white' }}>The Legend</span>
            </h2>
             <p className="font-body text-granite max-w-xl text-lg">
              Navigate the terrain, check conditions, and prepare for the ascent.
            </p>
        </motion.div>
      </div>

      <BentoGrid>
        {/* 1. Video Loop Module (Large 2x2) */}
        <BentoItem
          span="md:col-span-2 md:row-span-2 min-h-[300px]"
          className="p-0 overflow-hidden relative border-none"
          header={
            <div className="absolute inset-0 bg-slate">
               {/* Placeholder for Drone Video */}
               <div className="absolute inset-0 bg-basalt flex items-center justify-center group-hover/bento:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-basalt via-transparent to-transparent z-10" />
                  {/* If you have a video file, replace this img/div */}
                  <img
                    src="/imagenes/fondo-muela (1).avif"
                    alt="Drone View"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute center z-20 text-white flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md mb-4">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest">Aerial Recon</span>
                  </div>
               </div>
            </div>
          }
          title="THE SUMMIT VIEW"
          description="Immersive drone footage of the 3650m peak."
          icon={<Mountain className="w-5 h-5 text-neon-lichen mb-2" />}
        />

        {/* 2. Weather/Status Module (Vertical 1x2) */}
        <BentoItem
          span="md:col-span-1 md:row-span-2"
          className="bg-basalt border-slate"
          header={
            <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-6 relative overflow-hidden">
                {/* Simulated Widget */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate via-basalt to-basalt opacity-50" />

                <div className="relative z-10 text-center">
                    <Cloud className="w-12 h-12 text-white mx-auto mb-2" />
                    <div className="text-4xl font-display font-bold text-white">{weather.temp}</div>
                    <div className="text-xs font-mono text-neon-lichen uppercase tracking-widest">{weather.condition}</div>
                </div>

                <div className="w-full h-[1px] bg-slate" />

                <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
                    <div className="text-center">
                        <Wind className="w-6 h-6 text-granite mx-auto mb-1" />
                        <div className="text-sm font-bold text-white">{weather.wind}</div>
                        <div className="text-[10px] text-granite uppercase">Wind</div>
                    </div>
                    <div className="text-center">
                        <Thermometer className="w-6 h-6 text-granite mx-auto mb-1" />
                        <div className="text-sm font-bold text-white">High UV</div>
                        <div className="text-[10px] text-granite uppercase">Index</div>
                    </div>
                </div>
            </div>
          }
          title="LIVE CONDITIONS"
          description="Real-time environmental data from the base camp."
          icon={<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
        />

        {/* 3. Difficulty/Stats Module (Square 1x1) */}
        <BentoItem
          span="md:col-span-1 md:row-span-1"
          className="bg-neon-lichen border-neon-lichen group/active"
          header={
            <div className="flex-1 flex flex-col justify-center p-6">
                <span className="font-display text-5xl font-black text-basalt">3.5<span className="text-2xl text-basalt/60">/5</span></span>
            </div>
          }
          title={<span className="text-basalt group-hover/bento:text-basalt">DIFFICULTY</span>}
          description={<span className="text-basalt/70">Moderate to Challenging. Proper gear required.</span>}
          icon={<Navigation className="w-5 h-5 text-basalt mb-2" />}
        />

        {/* 4. Map Integration Module (Horizontal 2x1) */}
        <BentoItem
          span="md:col-span-2 md:row-span-1 min-h-[250px]"
          className="p-0 overflow-hidden relative"
          header={
            <div className="absolute inset-0 w-full h-full bg-slate">
                <Suspense fallback={<div className="w-full h-full bg-slate animate-pulse" />}>
                     {/* Passing minimal prop to hide heavy controls if needed, but keeping 3D toggle */}
                    <MapaInteractivo className="w-full h-full" minimal={true} />
                </Suspense>
                {/* Overlay Gradient to blend with Bento */}
                <div className="absolute inset-0 pointer-events-none border border-slate/10" />
            </div>
          }
          title="INTERACTIVE TERRAIN"
          description="Explore the route in 3D. Toggle elevation mode."
          icon={<MapIcon className="w-5 h-5 text-neon-lichen mb-2" />}
        />
      </BentoGrid>

      {/* Decorative Marquee or Separator */}
       <div className="w-full overflow-hidden py-10 opacity-30">
        <div className="whitespace-nowrap animate-scan" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
          <span className="text-6xl font-display font-black text-transparent stroke-text px-4" style={{ WebkitTextStroke: '1px #333' }}>
            GEOLOGY • ADVENTURE • 3650 MSNM • LA PAZ • GEOLOGY • ADVENTURE • 3650 MSNM • LA PAZ
          </span>
        </div>
      </div>
    </section>
  );
};

export default DiscoverBentoSection;
