import { forwardRef, useMemo, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { testimonials } from '../constants/testimonials';

const TestimonialsCarousel = forwardRef(({ shouldReduceMotion }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const testimonialsInView = useInView(ref, inViewConfig);

  // Duplicar testimonios para scroll infinito
  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials], 
    []
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="py-40 bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : {}}
            className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider mb-8"
          >
            Testimonios Reales • TripAdvisor
          </motion.span>
          
          {/* CORREGIDO: Se eliminó el <h2> que envolvía a PaintText para evitar anidación inválida */}
          <PaintText
            text="Historias Auténticas"
            className="text-[clamp(3rem,8vw,6rem)] font-black leading-tight tracking-tight"
            paintedColor="#ffffff"
            unpaintedColor="rgba(255, 255, 255, 0.15)"
            bicolor={true}
            secondaryColor="#10b981"
            secondaryStartWord="Auténticas"
            animationDuration={0.4}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="text-xl text-white/70 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Experiencias reales de viajeros verificados que visitaron La Muela del Diablo
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-400">4.3 ★</div>
              <div className="text-sm text-white/60 mt-2">Rating TripAdvisor</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white">154</div>
              <div className="text-sm text-white/60 mt-2">Opiniones</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-green-400">10+</div>
              <div className="text-sm text-white/60 mt-2">Países</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Carrusel Infinito */}
        <div className="relative w-full max-w-full overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={
              shouldReduceMotion
                ? { x: 0 } 
                : { x: [0, -1890] }
            }
            transition={{
              x: {
                duration: 80,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {duplicatedTestimonials.map((test, i) => (
              <div key={i} className="shrink-0 w-[420px]">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-green-500/30 transition-all h-full">
                  
                  {/* Header del testimonio */}
                  <div className="flex items-start mb-6">
                    <div className="mr-5">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white/20">
                        {test.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1 flex items-center gap-2">
                        {test.name}
                        {test.verified && (
                          <span className="text-green-400 text-lg" title="Verificado TripAdvisor">✓</span>
                        )}
                      </h4>
                      
                      <p className="text-white/60 text-sm mb-2">
                        📍 {test.location}
                      </p>
                      
                      <p className="text-white/40 text-xs mb-2">
                        {test.date}
                      </p>
                      
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-2">
                        {Array(5).fill().map((_, starIndex) => (
                          <span 
                            key={starIndex} 
                            className={`text-lg ${starIndex < test.rating ? 'text-yellow-400' : 'text-white/20'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      
                      {/* TripAdvisor Badge */}
                      <div className="text-xs text-green-400/80 font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                        TripAdvisor
                      </div>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  {test.experience && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-semibold text-green-300">
                        {test.experience}
                      </span>
                    </div>
                  )}

                  {/* Quote */}
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 text-6xl text-white/10 font-serif">"</span>
                    <p className="text-white/80 italic text-base leading-relaxed pl-6">
                      {test.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA TripAdvisor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="text-center mt-16"
        >
          <a 
            href="https://www.tripadvisor.es/Attraction_Review-g294072-d554765-Reviews-Muela_del_Diablo-La_Paz_La_Paz_Department.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-2xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span>Ver las 154 opiniones en TripAdvisor</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
});

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

export default memo(TestimonialsCarousel);
