import { forwardRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
            className="fixed inset-0 z-[100] bg-neo-white/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={handleCloseVisor}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full max-w-[90vw] max-h-[90vh] relative border border-neo-black shadow-2xl overflow-hidden rounded-lg"
              onClick={e => e.stopPropagation()}
            >
              <LazyVisor360 src={selectedVisor.src} caption={selectedVisor.caption} />
            </motion.div>
            
            {/* Close Button */}
            <button
              onClick={handleCloseVisor}
              className="absolute top-6 right-6 z-50 w-10 h-10 bg-neo-white text-neo-black border border-neo-black rounded-full flex items-center justify-center hover:bg-neo-black hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section ref={ref} className="py-24 md:py-32 bg-neo-sand relative overflow-hidden">

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={visor360InView ? "visible" : "hidden"}
            className="text-center mb-20 flex flex-col items-center"
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-orange uppercase mb-4 block">
                Realidad Virtual
            </span>
            
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-heading font-black leading-tight tracking-tight text-neo-black uppercase">
                INMERSIÓN <span className="text-neo-orange">360°</span>
            </h2>
            
            <p className="text-lg text-neo-black/70 max-w-2xl mx-auto mt-6 font-body leading-relaxed">
              Explora cada rincón desde la comodidad de tu pantalla. Haz click para entrar.
            </p>
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
                className="relative h-[400px] bg-neo-black cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => handleOpenVisor(item)}
              >
                {visor360InView && (
                  <img
                    src={item.thumbnail}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neo-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100">
                     <div className="w-16 h-16 rounded-full bg-neo-white/20 backdrop-blur-sm flex items-center justify-center border border-neo-white/50 mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                             <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                             <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                     </div>
                     <span className="text-white font-bold uppercase tracking-widest text-sm">Ver en 360°</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-heading font-bold text-white uppercase">{item.caption}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
});

Visor360Section.displayName = 'Visor360Section';

export default Visor360Section;
