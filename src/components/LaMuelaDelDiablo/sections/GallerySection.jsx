import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { galleryImages } from '../constants/galleryImages';

const GalleryCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`${item.col} ${item.row} relative group cursor-pointer`}
    >
      {/* Frame Container */}
      <div 
        className="relative w-full h-full bg-neo-white p-2 md:p-3 shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
      >
        <div className="relative w-full h-full overflow-hidden bg-neo-sand">
            {/* Image */}
            <motion.img
            src={item.img}
            alt={item.alt}
            className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
            loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-neo-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                 <h4 className="text-xl font-heading font-bold text-neo-white uppercase mb-2 tracking-wide">
                    {item.caption}
                 </h4>
                 <div className="h-0.5 w-8 bg-neo-orange mb-3" />
                 <p className="font-body text-xs text-neo-white/90">
                    {item.description}
                 </p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const GallerySection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-100px", amount: 0.1 };
  const galleryInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-black/60 uppercase mb-4 block">
                Galería Fotográfica
            </span>
            
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-heading font-black leading-tight tracking-tight text-neo-black uppercase">
              VISUALIZA EL <span className="text-neo-orange">HORIZONTE</span>
            </h2>

            <p className="mt-6 text-lg font-body text-neo-black/70 max-w-xl mx-auto">
              Fragmentos de un paisaje que detiene el tiempo.
            </p>
          </motion.div>
        </div>

        {/* Grid Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[320px] w-full">
          {galleryImages.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
