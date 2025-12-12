import { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { menuItems } from '../constants/navigation';

// Constantes
const HERO_IMAGE = '/imagenes/fondo-muela (1).avif';
const QR_IMAGE = '/imagenes/QRPEE.png';
const VIDEO_URL = 'https://youtu.be/rWI3CJuGtqw?si=uctoVK6EGmiFyJMp';

// Componente Modal QR memoizado
const QRModal = memo(({ showQR, setShowQR }) => (
  <AnimatePresence>
    {showQR && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => setShowQR(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
        >
          <button
            onClick={() => setShowQR(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h3 className="text-2xl font-poppins font-bold text-white mb-2">Descarga la App</h3>
          <p className="text-white/60 text-sm mb-6 font-montserrat">
            Escanea el código para vivir la experiencia completa en Android.
          </p>

          <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 mb-6 flex items-center justify-center">
            <img src={QR_IMAGE} alt="QR Code" className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-orange-500 font-mono uppercase tracking-widest">Versión 1.0 Beta</p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm font-semibold"
            >
              Cerrar Ventana
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));
QRModal.displayName = 'QRModal';

// Componente NavButton memoizado
const NavButton = memo(({ item, index, refs, scrollToSection }) => (
  <motion.button
    onClick={() => {
      if (refs?.[item.ref]) {
        scrollToSection(refs[item.ref]);
      }
    }}
    className="relative px-5 py-2 text-sm font-montserrat font-medium text-white/70 transition-colors rounded-full overflow-hidden group"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
  >
    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    <span className="relative z-10 group-hover:text-white transition-colors">{item.name}</span>
  </motion.button>
));
NavButton.displayName = 'NavButton';

// Componente principal
const HeroSection = ({ isLoaded, menuOpen, setMenuOpen, scrollToSection, refs }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -30]);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false);
    refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setMenuOpen, refs, scrollToSection]);

  const handleVideoClick = useCallback(() => {
    window.open(VIDEO_URL, '_blank');
  }, []);

  const handleExploreClick = useCallback(() => {
    refs?.visitsRef && scrollToSection(refs.visitsRef);
  }, [refs, scrollToSection]);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${isScrolled || menuOpen
            ? 'bg-black/90 backdrop-blur-xl border-white/10 shadow-lg'
            : 'bg-transparent border-transparent'
          }`}
        style={{ paddingBlock: isScrolled ? '1rem' : '1.5rem' }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">
          {/* Logo */}
          <motion.div className="relative group cursor-pointer" onClick={handleLogoClick} whileHover="hover">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-poppins font-bold tracking-tighter text-white">
                LA MUELA
              </span>
              <span className="text-[10px] md:text-xs font-montserrat tracking-[0.4em] text-orange-500 uppercase group-hover:text-white transition-colors duration-300">
                Del Diablo
              </span>
            </div>
            <motion.div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            {menuItems?.map((item, i) => (
              <NavButton key={item.name} item={item} index={i} refs={refs} scrollToSection={scrollToSection} />
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQR(true)}
              className="ml-2 px-5 py-2 bg-white text-black rounded-full text-xs md:text-sm font-bold font-montserrat hover:bg-orange-500 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              APP
            </motion.button>
          </nav>

          {/* Botón hamburguesa móvil */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Menú"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white origin-center transition-all duration-300" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white transition-all duration-300" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white origin-center transition-all duration-300" />
          </motion.button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-0 left-0 right-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center pt-20 border-b border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-6 text-center">
                {menuItems?.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (refs?.[item.ref]) {
                        scrollToSection(refs[item.ref]);
                      }
                    }}
                    className="text-2xl font-poppins font-bold text-white/80 hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setMenuOpen(false);
                    setShowQR(true);
                  }}
                  className="mt-4 px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all"
                >
                  DESCARGAR APP
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Modal QR */}
      <QRModal showQR={showQR} setShowQR={setShowQR} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="La Muela del Diablo"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1920"
            height="1080"
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-xl md:text-2xl text-white/80 font-montserrat font-medium uppercase tracking-[0.3em]"
            >
              La Paz, Bolivia
            </motion.p>

            <div className="overflow-visible">
              <motion.h1
                initial={{ y: '100%' }}
                animate={isLoaded ? { y: 0 } : { y: '100%' }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                className="text-[clamp(3rem,10vw,10rem)] font-poppins font-black leading-[0.85] tracking-tighter"
              >
                <span className="block drop-shadow-2xl">LA MUELA</span>
                <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  DEL DIABLO
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="text-xl md:text-3xl max-w-4xl mx-auto font-inter font-light leading-relaxed text-white/90"
            >
              Con 3650 metros de altura.<br />Una formación rocosa increíble.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="flex flex-wrap justify-center gap-6 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExploreClick}
                className="px-12 py-5 bg-white text-black rounded-full text-lg font-montserrat font-semibold hover:bg-white/90 transition-all"
              >
                Explorar Ahora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVideoClick}
                className="px-12 py-5 border-2 border-white/30 backdrop-blur-sm rounded-full text-lg font-montserrat font-semibold hover:bg-white/10 transition-all"
              >
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
