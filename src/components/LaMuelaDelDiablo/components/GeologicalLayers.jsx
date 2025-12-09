import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GeologicalLayers = ({ currentStep }) => {
  // Define variants for different states/eras
  // These indices correspond to the 'historyTimeline' array indices

  // 0: Formación Volcánica (Red/Orange Magma)
  // 1: Erosión del Cono (Magma fading, Rock appearing)
  // 2: Wak'a Sagrada (Aymara era - spiritual glow)
  // 3: Leyenda Batalla Celestial (Sharp split)
  // 4: Comunidad Chiaraque (Settled, stable)
  // 5: Reconocimiento Geológico (Technical, grid lines)
  // 6: Destino Turístico (Iconography, paths)
  // 7: 2025 (Futuristic, Neon)

  // We visualize the "Muela" as a stack of abstract SVG paths
  // Center Core: The Muela itself (Andesite)
  // Outer Layers: Erosion material (Sediment) - only visible in early stages

  const isMagma = currentStep === 0;
  const isErosion = currentStep === 1;
  const isSpiritual = currentStep === 2 || currentStep === 3;
  const isTechnical = currentStep >= 5;
  const isFuture = currentStep === 7;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">

        {/* Background Aura / Atmosphere */}
        <motion.div
          animate={{
            background: isMagma
              ? "radial-gradient(circle, rgba(255,94,58,0.2) 0%, rgba(15,15,17,0) 70%)" // Magma Glow
              : isSpiritual
                ? "radial-gradient(circle, rgba(204,255,0,0.1) 0%, rgba(15,15,17,0) 70%)" // Spiritual/Neon Glow
                : "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(15,15,17,0) 70%)" // Default
          }}
          className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        />

        {/* LAYER 1: The Core (Andesite) - Always present but changes style */}
        <motion.svg
          viewBox="0 0 200 300"
          className="absolute inset-0 w-full h-full z-20 drop-shadow-2xl"
          animate={{
            scale: isMagma ? 0.9 : 1,
            y: isErosion ? [0, -5, 0] : 0, // Slight shake during erosion
          }}
          transition={{ duration: 1 }}
        >
          {/* Main Rock Shape */}
          <motion.path
            d="M60,280 L40,200 L55,100 L90,20 L130,30 L160,120 L150,220 L140,280 Z"
            // A rough "tooth" shape
            animate={{
              fill: isMagma ? "#FF5E3A" : "#1A1A1C", // Orange Magma -> Dark Rock
              stroke: isTechnical ? "#CCFF00" : (isMagma ? "#FFD700" : "#555"), // Technical Green -> Magma Yellow -> Rock Gray
              strokeWidth: isTechnical ? 2 : 0,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Internal Structure / Veins */}
          {isTechnical && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
               <line x1="90" y1="20" x2="90" y2="280" stroke="#CCFF00" strokeWidth="0.5" strokeDasharray="4 4" />
               <line x1="55" y1="100" x2="160" y2="120" stroke="#CCFF00" strokeWidth="0.5" strokeDasharray="4 4" />
               <text x="100" y="150" fill="#CCFF00" fontSize="8" fontFamily="monospace" textAnchor="middle">ANDESITE CORE</text>
            </motion.g>
          )}

          {/* Spiritual Glyphs */}
          {isSpiritual && (
             <motion.path
               d="M90,50 L110,50 L100,70 Z M90,80 L110,80"
               stroke="#FFFFFF"
               strokeWidth="2"
               fill="none"
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 0.8, scale: 1 }}
               transition={{ duration: 0.8 }}
             />
          )}
        </motion.svg>

        {/* LAYER 2: Outer Sediment / Volcano Cone (Visible only in early stages) */}
        <AnimatePresence>
          {(isMagma || isErosion) && (
            <motion.svg
              viewBox="0 0 200 300"
              className="absolute inset-0 w-full h-full z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Fade out and disperse like dust
              transition={{ duration: 1.5 }}
            >
              {/* Left Slope */}
              <path d="M40,200 L0,300 L60,280 Z" fill="#4A4A4A" opacity="0.8" />
              {/* Right Slope */}
              <path d="M160,120 L200,300 L140,280 Z" fill="#4A4A4A" opacity="0.8" />

              {isMagma && (
                  // Magma particles
                  <motion.circle cx="100" cy="250" r="5" fill="#FF5E3A"
                    animate={{ y: [-20, -100], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
              )}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* LAYER 3: Data / HUD Overlay (Technical / Future Era) */}
        {isTechnical && (
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="absolute top-10 left-0 text-[10px] text-neon-lichen font-mono">ELEV: 3825m</div>
                <div className="absolute bottom-10 right-0 text-[10px] text-neon-lichen font-mono">LAT: -16.54</div>

                {/* Scanning line */}
                <motion.div
                    className="w-full h-[1px] bg-neon-lichen/50 absolute top-0"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        )}

      </div>

      {/* Dynamic Caption */}
      <motion.div
        className="absolute bottom-[-40px] md:bottom-10 text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <span className="text-xs font-mono text-granite uppercase tracking-widest">
            {isMagma ? "FASE 1: ERUPCIÓN" :
             isErosion ? "FASE 2: DENUDACIÓN" :
             isSpiritual ? "FASE 3: SACRALIZACIÓN" :
             isFuture ? "FASE 5: FUTURO 2025" : "FASE 4: CONSOLIDACIÓN"}
        </span>
      </motion.div>

    </div>
  );
};

export default GeologicalLayers;
