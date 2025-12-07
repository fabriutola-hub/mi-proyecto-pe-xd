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

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled || menuOpen
            ? "bg-diablo-dark/80 backdrop-blur-xl border-white/5 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex flex-col cursor-pointer group"
            onClick={() => {
              setMenuOpen(false);
              refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-2xl md:text-3xl font-display font-bold text-white leading-none tracking-wide">LA MUELA</span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-diablo-volcano uppercase">Del Diablo</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            {menuItems?.map((item) => (
              <button
                key={item.name}
                onClick={() => refs && item.ref && refs[item.ref] && scrollToSection(refs[item.ref])}
                className="px-6 py-2 text-sm font-body font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => setShowQR(true)}
              className="ml-2 px-6 py-2 bg-diablo-volcano text-white rounded-full text-sm font-bold hover:bg-diablo-earth transition-all shadow-lg shadow-diablo-volcano/20"
            >
              APP
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-white origin-center transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-8 h-0.5 bg-white transition-all" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-white origin-center transition-all" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-diablo-dark/95 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col items-center gap-6 shadow-2xl"
            >
              {menuItems?.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setMenuOpen(false);
                    refs && item.ref && refs[item.ref] && scrollToSection(refs[item.ref]);
                  }}
                  className="text-xl font-display text-white/80 hover:text-diablo-volcano transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setShowQR(true); }}
                className="mt-4 btn-primary w-full max-w-xs"
              >
                DESCARGAR APP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-diablo-dark border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                ✕
              </button>
              <h3 className="text-2xl font-display text-white mb-2">Descarga la App</h3>
              <p className="text-gray-400 text-sm mb-6">Escanea para vivir la experiencia completa.</p>
              <div className="bg-white p-4 rounded-xl mx-auto w-48 h-48 mb-6 flex items-center justify-center">
                <img src="/imagenes/QRPEE.png" alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs text-diablo-volcano font-mono uppercase tracking-widest mb-4">Versión 1.0 Beta</p>
              <button onClick={() => setShowQR(false)} className="btn-secondary w-full text-sm">Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-0">
          <img
            src="/imagenes/fondo-muela (1).avif"
            alt="La Muela del Diablo"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-diablo-dark/30 via-transparent to-diablo-dark" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-diablo-volcano font-mono tracking-[0.3em] uppercase mb-4 md:mb-6 text-sm md:text-base"
          >
            La Paz, Bolivia
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 md:mb-8 leading-none"
          >
            LA MUELA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-diablo-volcano via-diablo-accent to-diablo-volcano">
              DEL DIABLO
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-gray-200 font-body max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed"
          >
            Descubre el misterio geológico y las vistas más impresionantes de los Andes paceños.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <button
              onClick={() => refs?.visitsRef && scrollToSection(refs.visitsRef)}
              className="btn-primary w-full sm:w-auto"
            >
              Explorar Tours
            </button>
            <button
              onClick={() => refs?.mapRef && scrollToSection(refs.mapRef)}
              className="btn-secondary w-full sm:w-auto"
            >
              Mapa Interactivo
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
