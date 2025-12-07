import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useSpring, useTransform, animate } from "framer-motion";

// --- Componente: Texto Decorativo ---
const DataStream = () => {
  const [data, setData] = useState("0000");
  useEffect(() => {
    const interval = setInterval(() => {
      setData(Math.random().toString(16).substring(2, 8).toUpperCase());
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono text-[10px] text-neo-black/60">{data}</span>;
};

export default function LoadingScreen() {
  const count = useSpring(0, { stiffness: 40, damping: 25 });
  const roundedCount = useTransform(count, (latest) => Math.round(latest));
  const progressWidth = useTransform(count, [0, 100], ["0%", "100%"]);
  
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = useMemo(() => [
    { title: "DESCUBRIENDO", sub: "LA MUELA DEL DIABLO..." },
    { title: "EXPLORANDO", sub: "SENDEROS ANTIGUOS..." },
    { title: "PREPARANDO", sub: "VISTAS PANORÁMICAS..." },
    { title: "BIENVENIDO", sub: "LA PAZ, BOLIVIA" }
  ], []);

  useEffect(() => {
    const controls = animate(count, 100, { duration: 4, ease: "easeInOut" });
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => {
      controls.stop();
      clearInterval(phaseInterval);
    };
  }, [count, phases.length]);

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[999] bg-neo-white flex flex-col items-center justify-center overflow-hidden cursor-wait"
      exit={{ 
        opacity: 0,
        y: -50,
        transition: { duration: 0.8, ease: "anticipate" }
      }}
    >
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
            backgroundImage: `linear-gradient(#2D2420 1px, transparent 1px), linear-gradient(90deg, #2D2420 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        
        {/* Loading Bar Container */}
        <div className="border-2 border-neo-black p-1 shadow-neo mb-8 bg-neo-white">
          <div className="h-12 w-full bg-neo-sand relative overflow-hidden">
             {/* Progress Bar */}
             <motion.div 
               className="absolute top-0 left-0 bottom-0 bg-neo-orange border-r-2 border-neo-black"
               style={{ width: progressWidth }}
             />

             {/* Percentage Text */}
             <div className="absolute inset-0 flex items-center justify-center mix-blend-multiply">
                <span className="text-4xl font-bold text-neo-black font-heading tracking-tighter flex items-center">
                  <motion.span>{roundedCount}</motion.span>%
                </span>
             </div>
          </div>
        </div>

        {/* Phase Text */}
        <div className="h-24 w-full flex flex-col items-start justify-center border-l-2 border-neo-orange pl-6">
            <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h3 className="text-2xl font-bold font-heading text-neo-black uppercase tracking-tight">
                {phases[currentPhase].title}
              </h3>
              <p className="text-sm font-mono text-neo-black/70 uppercase tracking-widest mt-1">
                {">"} {phases[currentPhase].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Corners */}
      <div className="absolute top-8 left-8 border-t-2 border-l-2 border-neo-black w-8 h-8" />
      <div className="absolute top-8 right-8 border-t-2 border-r-2 border-neo-black w-8 h-8" />
      <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-neo-black w-8 h-8" />
      <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-neo-black w-8 h-8" />

      {/* Data Stream Top Right */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
         <DataStream />
      </div>

    </motion.div>
  );
}
