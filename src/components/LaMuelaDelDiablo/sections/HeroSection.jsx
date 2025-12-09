import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { menuItems } from '../constants/navigation';

const HeroSection = ({ isLoaded, menuOpen, setMenuOpen, scrollToSection, refs }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  // Parallax for text (scrolls faster than background)
  const textY = useTransform(scrollY, [0, 400], [0, 150]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || menuOpen 
            ? "bg-basalt/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between relative z-50">
          
          {/* LOGO - Robust Text */}
          <motion.div 
            className="relative cursor-pointer z-50"
            onClick={() => {
               setMenuOpen(false);
               refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex flex-col leading-none">
              <span className="text-xl font-display font-black tracking-tighter text-white uppercase">
                La Muela
              </span>
              <span className="text-[10px] font-mono tracking-widest text-neon-lichen uppercase">
                Del Diablo
              </span>
            </div>
          </motion.div>
          
          {/* DESKTOP NAV - Minimalist Pills */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems && menuItems.map((item, i) => (
              <button
                key={item.name}
                onClick={() => refs?.[item.ref] && scrollToSection(refs[item.ref])}
                className="text-sm font-sans font-medium text-granite hover:text-neon-lichen transition-colors uppercase tracking-wide"
              >
                {item.name}
              </button>
            ))}

            <button
                onClick={() => setShowQR(true)}
                className="ml-4 px-4 py-1.5 border border-white/20 hover:border-neon-lichen hover:bg-neon-lichen hover:text-basalt text-white rounded-full text-xs font-bold font-mono transition-all duration-300"
            >
                GET APP
            </button>
          </nav>

          {/* MOBILE BURGER - Neobrutalist */}
          <button
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-end gap-1.5 group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4 group-hover:w-8'}`} />
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-basalt z-40 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-8 text-center">
                {menuItems && menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      refs?.[item.ref] && scrollToSection(refs[item.ref]);
                    }}
                    className="text-4xl font-display font-black text-white hover:text-neon-lichen hover:scale-110 transition-all uppercase"
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                 <motion.button
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   onClick={() => { setMenuOpen(false); setShowQR(true); }}
                   className="mt-8 px-8 py-4 border border-neon-lichen text-neon-lichen font-mono font-bold hover:bg-neon-lichen hover:text-basalt transition-all uppercase"
                >
                   Download App
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= QR MODAL ================= */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-basalt/90 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate border border-white/10 p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-granite hover:text-neon-lichen"
              >
                ✕
              </button>

              <h3 className="text-3xl font-display font-bold text-white mb-2 uppercase">App Beta</h3>
              <p className="text-granite text-sm mb-6 font-mono">Scan for AR Experience</p>
              
              <div className="bg-white p-2 mx-auto w-48 h-48 mb-6 flex items-center justify-center">
                <img src="/imagenes/QRPEE.png" alt="QR Code" className="w-full h-full object-contain" />
              </div>

              <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-3 bg-neon-lichen text-basalt font-bold uppercase hover:bg-white transition-colors"
              >
                  Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO CONTENT ================= */}
      <section className="relative h-screen w-full overflow-hidden bg-basalt flex flex-col items-center justify-center">
        {/* Background - Placeholder for Video or Dark Image */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0">
            {/* Using a gradient overlay on a placeholder color or image */}
           <div className="absolute inset-0 bg-basalt" />
           {/* If you have the image, keep it, but darken it significantly */}
           <img
            src="/imagenes/fondo-muela (1).avif"
            alt="La Muela del Diablo Background"
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-overlay"
            loading="eager"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-basalt via-transparent to-basalt/50" />
           {/* Grid texture overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        </motion.div>
        
        <div className="relative z-10 w-full px-6 flex flex-col items-center">
            <motion.div
                style={{ y: textY }}
                className="text-center flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 border border-neon-lichen/30 rounded-full text-neon-lichen font-mono text-xs tracking-widest uppercase mb-6 bg-neon-lichen/5 backdrop-blur-sm">
                        Expedition 2025 • 3650 MASL
                    </span>
                </motion.div>

                <h1 className="flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                        animate={isLoaded ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
                        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                        className="block text-[15vw] md:text-[12vw] leading-[0.85] font-display font-black text-white tracking-tighter mix-blend-exclusion"
                    >
                        LA MUELA
                    </motion.span>
                    <motion.span
                        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                        animate={isLoaded ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
                        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                        className="block text-[5vw] md:text-[4vw] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-[0.2em] -mt-2 md:-mt-6"
                    >
                        DEL DIABLO
                    </motion.span>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 flex flex-col md:flex-row gap-6 items-center"
                >
                    <button
                        onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)}
                        className="group relative px-8 py-4 bg-neon-lichen text-basalt font-sans font-bold uppercase tracking-wider overflow-hidden hover:bg-white transition-colors"
                    >
                        Start Expedition
                        <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                    </button>

                    <button
                        onClick={() => window.open("https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp", "_blank")}
                        className="flex items-center gap-3 text-white hover:text-neon-lichen transition-colors group"
                    >
                        <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-neon-lichen group-hover:bg-neon-lichen/10 transition-all">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest">Watch Film</span>
                    </button>
                </motion.div>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neon-lichen to-transparent" />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
