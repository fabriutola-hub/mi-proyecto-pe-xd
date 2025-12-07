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

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled || menuOpen 
            ? "bg-neo-white/95 backdrop-blur-md border-neo-black/10"
            : "bg-transparent border-transparent"
        }`}
        style={{ paddingBlock: '1.5rem' }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <motion.div 
            className="relative cursor-pointer flex items-center gap-2 group"
            onClick={() => {
               setMenuOpen(false);
               refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-xl md:text-2xl font-heading font-black tracking-tighter text-neo-black">
              LA MUELA
            </span>
            <span className="hidden md:block w-px h-6 bg-neo-black/30"></span>
            <span className="text-xs md:text-sm font-mono font-bold text-neo-orange tracking-widest uppercase">
              DEL DIABLO
            </span>
          </motion.div>
          
          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems && menuItems.map((item, i) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (refs && item.ref && refs[item.ref]) {
                    scrollToSection(refs[item.ref]);
                  }
                }}
                className="relative text-xs font-bold uppercase tracking-widest text-neo-black/70 hover:text-neo-orange transition-colors"
                whileHover={{ y: -1 }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* BOTÓN APP */}
            <motion.button
                whileHover={{ y: -2, boxShadow: "4px 4px 0px 0px #C25E00" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQR(true)}
                className="ml-4 px-6 py-2 bg-neo-black text-neo-white font-bold text-xs uppercase tracking-widest transition-all neo-shadow-orange"
            >
                GET APP
            </motion.button>
          </nav>

          {/* BOTÓN HAMBURGUESA (MÓVIL) */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-neo-black origin-center transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-neo-black transition-all" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-neo-black origin-center transition-all" />
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100vh" }}
              exit={{ height: 0 }}
              className="md:hidden absolute top-[calc(100%+0px)] left-0 right-0 bg-neo-white z-40 flex flex-col items-center pt-12 border-b border-neo-black/10 overflow-hidden"
            >
              <div className="flex flex-col gap-4 text-center w-full px-8">
                {menuItems && menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (refs && item.ref && refs[item.ref]) {
                        scrollToSection(refs[item.ref]);
                      }
                    }}
                    className="text-2xl font-heading font-bold text-neo-black uppercase border-b border-neo-black/10 hover:text-neo-orange hover:pl-4 py-4 w-full transition-all text-left"
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                <motion.button
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   onClick={() => {
                       setMenuOpen(false);
                       setShowQR(true);
                   }}
                   className="mt-8 px-8 py-4 bg-neo-orange text-white font-bold uppercase tracking-widest border border-neo-black neo-shadow hover:translate-y-[-2px] transition-all"
                >
                   DESCARGAR APP
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= MODAL QR ================= */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neo-white/90 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neo-white border border-neo-black neo-shadow-lg p-8 max-w-sm w-full text-center relative"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-neo-black/50 hover:text-neo-black transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              </button>

              <h3 className="text-2xl font-heading font-black text-neo-black mb-1 uppercase tracking-tight">Aplicación Móvil</h3>
              <p className="text-neo-orange text-xs font-mono font-bold uppercase tracking-widest mb-8">
                Tu Guía Digital
              </p>
              
              <div className="bg-white p-4 border border-neo-black/10 mx-auto w-52 h-52 mb-8 flex items-center justify-center shadow-inner">
                <img 
                  src="/imagenes/QRPEE.png" 
                  alt="QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[10px] text-neo-black/40 font-mono uppercase tracking-widest">Versión 1.0 Disponible</p>
                <button 
                    onClick={() => setShowQR(false)}
                    className="w-full py-3 bg-neo-black text-neo-white font-bold uppercase tracking-widest hover:bg-neo-orange transition-colors"
                >
                    Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-neo-black">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0">
          <img
            src="/imagenes/fondo-muela (1).avif"
            alt="La Muela del Diablo"
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neo-black/80" />
        </motion.div>
        
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col justify-end pb-32 md:pb-0 md:justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
            className="space-y-6 md:space-y-8 max-w-4xl"
          >
             <div className="flex items-center gap-4">
                 <div className="h-px w-12 bg-neo-white/60 hidden md:block"></div>
                 <span className="text-neo-white/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                    La Paz — Bolivia
                 </span>
             </div>

            <h1 className="text-[clamp(3rem,8vw,8rem)] font-heading font-black leading-[0.9] tracking-tight text-neo-white">
              LA MUELA <br />
              <span className="text-neo-orange">DEL DIABLO</span>
            </h1>
            
            <p className="text-lg md:text-xl font-body text-neo-white/80 max-w-xl leading-relaxed border-l-2 border-neo-orange pl-6">
               Un monumento natural que desafía al cielo. Descubre la leyenda y explora los senderos ancestrales a 3,650m de altura.
            </p>
            
            <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
              <button
                onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)}
                className="group px-8 py-3 bg-neo-white text-neo-black text-sm font-bold uppercase tracking-widest hover:bg-neo-orange hover:text-white transition-all duration-300"
              >
                Planear Visita
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={() => window.open("https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp", "_blank")}
                className="px-8 py-3 border border-neo-white text-neo-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-neo-black transition-all duration-300"
              >
                Ver Video
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end gap-2 opacity-60 mix-blend-difference">
             <div className="w-px h-24 bg-neo-white mb-2"></div>
            <span className="text-neo-white font-mono text-[10px] tracking-widest">LAT: -16.5432</span>
            <span className="text-neo-white font-mono text-[10px] tracking-widest">LON: -68.0921</span>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
