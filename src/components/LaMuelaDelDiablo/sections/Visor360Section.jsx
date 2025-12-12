import { forwardRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import LazyVisor360 from '@/components/LazyVisor360';
import { visorItems } from '../constants/visorItems';

const Visor360Section = forwardRef(({ selectedVisor, handleOpenVisor, handleCloseVisor }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const visor360InView = useInView(ref, inViewConfig);

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  return (
    <>
      {/* Modal 360° */}
      <AnimatePresence>
        {selectedVisor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={handleCloseVisor}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full max-w-[90vw] max-h-[90vh] relative shadow-2xl rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <LazyVisor360 src={selectedVisor.src} caption={selectedVisor.caption} />
            </motion.div>
            
            {/* Botón Cerrar */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.05 } }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleCloseVisor}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full text-2xl font-bold flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Cerrar visor"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección Principal */}
      <section ref={ref} className="py-40 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16">
          
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="text-center mb-24"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={visor360InView ? { opacity: 1 } : {}}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider mb-8"
            >
              🌐 Inmersión 360°
            </motion.span>
            
            {/* CORREGIDO: Se eliminó el <h2> exterior que envolvía a PaintText */}
            <PaintText
              text="Explora como si estuvieras ahí"
              className="text-[clamp(3rem,8vw,6rem)] font-black leading-tight tracking-tight"
              paintedColor="#ffffff"
              unpaintedColor="rgba(255, 255, 255, 0.15)"
              bicolor={true}
              secondaryColor="#06b6d4"
              secondaryStartWord="estuvieras"
              animationDuration={0.4}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={visor360InView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="text-xl text-white/70 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              Haz click en cualquier vista para sumergirte en una experiencia panorámica completa de 360°
            </motion.p>
          </motion.div>

          {/* Grid de Thumbnails */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visorItems.map((item, i) => (
              <motion.div
                key={item.src + i}
                variants={fadeInUp}
                className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10 hover:border-cyan-500/30 transition-colors"
                onClick={() => handleOpenVisor(item)}
                style={{ transform: 'translateZ(0)' }}
              >
                {visor360InView && (
                  <img
                    src={item.thumbnail}
                    alt={item.caption}
                    className="w-full h-full object-cover will-change-auto"
                    loading="lazy"
                    width="600"
                    height="400"
                    decoding="async"
                    onLoad={(e) => e.target.style.transform = 'translateZ(0)'}
                  />
                )}

                {/* Overlay con Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={visor360InView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="transition-transform group-hover:translate-y-0 translate-y-2"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{item.caption}</h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold uppercase tracking-wide">
                        Ver 360° + VR
                      </span>

                      <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Gradient Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Nota */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={visor360InView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center text-white/60 mt-12 text-sm"
          >
            💡 Click en cualquier imagen para explorar en modo inmersivo 360° con opción VR Cardboard 🥽
          </motion.p>
        </div>
      </section>
    </>
  );
});

Visor360Section.displayName = 'Visor360Section';

export default Visor360Section;