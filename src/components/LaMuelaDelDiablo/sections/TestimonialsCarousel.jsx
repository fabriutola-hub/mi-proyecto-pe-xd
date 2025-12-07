import { forwardRef, useMemo, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../constants/testimonials';

const TestimonialsCarousel = forwardRef(({ shouldReduceMotion }, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const testimonialsInView = useInView(ref, inViewConfig);

  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials], 
    []
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-white overflow-hidden relative border-t border-neo-black/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          className="text-center mb-20 flex flex-col items-center"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-orange uppercase mb-4 block">
                Comunidad
            </span>
          
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-heading font-black leading-tight tracking-tight text-neo-black uppercase mb-8">
            VOCES <span className="text-neo-orange">REALES</span>
          </h2>

          {/* Stats Boxes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-4xl font-black font-heading text-neo-black">4.3 <span className="text-neo-orange">★</span></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neo-black/60 mt-1">Rating Global</div>
            </div>
            <div className="w-px h-12 bg-neo-black/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-4xl font-black font-heading text-neo-black">154</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neo-black/60 mt-1">Opiniones</div>
            </div>
             <div className="w-px h-12 bg-neo-black/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-4xl font-black font-heading text-neo-black">10+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neo-black/60 mt-1">Países</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Marquee Carousel */}
        <div className="relative w-full max-w-full overflow-visible mask-linear-fade">
          <motion.div
            className="flex gap-6"
            animate={
              shouldReduceMotion
                ? { x: 0 } 
                : { x: [0, -1260] } // Ajustado basándonos en ancho aproximado de tarjeta + gap
            }
            transition={{
              x: {
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {duplicatedTestimonials.map((test, i) => (
              <div key={i} className="shrink-0 w-[400px]">
                <div className="bg-neo-sand/30 border border-neo-black/10 p-8 h-full hover:border-neo-orange transition-colors group rounded-sm">
                  
                  {/* Header */}
                  <div className="flex items-start mb-6">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-neo-black text-neo-white rounded-full flex items-center justify-center text-lg font-bold">
                        {test.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold uppercase mb-0.5 text-neo-black flex items-center gap-2">
                        {test.name}
                        {test.verified && (
                          <span className="text-neo-orange text-sm" title="Verificado">✓</span>
                        )}
                      </h4>
                      
                      <p className="text-[10px] font-mono font-bold uppercase text-neo-black/50 mb-2">
                        {test.location}
                      </p>
                      
                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {Array(5).fill().map((_, starIndex) => (
                          <span 
                            key={starIndex} 
                            className={`text-sm ${starIndex < test.rating ? 'text-neo-orange' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <p className="italic text-base font-body font-medium text-neo-black/80 leading-relaxed">
                      "{test.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
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
            className="inline-flex items-center gap-2 border-b-2 border-neo-black pb-1 font-bold text-neo-black uppercase tracking-widest hover:text-neo-orange hover:border-neo-orange transition-colors"
          >
            <span>Ver más en TripAdvisor</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
});

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

export default memo(TestimonialsCarousel);
