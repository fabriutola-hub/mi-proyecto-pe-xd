import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = ({ isLoaded, scrollToSection, refs }) => {
  const { scrollY } = useScroll();

  // 1. Lógica Scroll (para Parallax, el Header ya no está aquí)
  // 2. Efectos de Parallax
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -30]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0">
          <img
            src="/imagenes/fondo-muela (1).avif"
            alt="La Muela del Diablo"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />
        </motion.div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 text-center pt-24 md:pt-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="text-xl md:text-2xl text-white/80 font-montserrat font-medium uppercase tracking-[0.3em]">
              La Paz, Bolivia
            </motion.p>
            
            <div className="overflow-visible">
              <motion.h1 initial={{ y: "100%" }} animate={isLoaded ? { y: 0 } : { y: "100%" }} transition={{ delay: 0.7, duration: 0.7, ease: [0.33, 1, 0.68, 1] }} className="text-[clamp(3rem,10vw,10rem)] font-poppins font-black leading-[0.85] tracking-tighter">
                <span className="block drop-shadow-2xl">LA MUELA</span>
                <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">DEL DIABLO</span>
              </motion.h1>
            </div>
            
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 0.4 }} className="text-xl md:text-3xl max-w-4xl mx-auto font-inter font-light leading-relaxed text-white/90">
              Con 3650 metros de altura.<br />Una formación rocosa increíble.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 15 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 0.4 }} className="flex flex-wrap justify-center gap-6 pt-8">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)} className="px-12 py-5 bg-white text-black rounded-full text-lg font-montserrat font-semibold hover:bg-white/90 transition-all">
                Explorar Ahora
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => window.open("https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp", "_blank")} className="px-12 py-5 border-2 border-white/30 backdrop-blur-sm rounded-full text-lg font-montserrat font-semibold hover:bg-white/10 transition-all">
                Ver Video
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
