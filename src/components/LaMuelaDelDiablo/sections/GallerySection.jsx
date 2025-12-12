import { forwardRef, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { galleryImages } from '../constants/galleryImages';

// --- Subcomponente: Tarjeta de Galería Interactiva ---
const GalleryCard = ({ item, index }) => {
  const ref = useRef(null);

  // Variables para el efecto Tilt 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suavizamos el movimiento del mouse
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Transformamos posición en rotación
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const shineOpacity = useTransform(mouseY, [-0.5, 0.5], [0, 0.4]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // AQUI SE APLICAN TUS CLASES (item.col, item.row)
      className={`${item.col} ${item.row} relative rounded-xl perspective-1000 cursor-none group z-0 hover:z-20`}
    >
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Imagen */}
        <motion.img
          src={item.img}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width="600"
          height="400"
        />

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Brillo Reactivo */}
        <motion.div
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent pointer-events-none mix-blend-overlay"
        />

        {/* Cursor "Ojo" que sigue al mouse */}
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </motion.div>

        {/* Información de Texto Flotante */}
        <div
          className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="inline-block text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2">
            {item.caption}
          </span>

          <p className="text-white/90 font-instrument text-lg md:text-xl leading-tight border-l-2 border-orange-500 pl-3">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Componente Principal ---
const GallerySection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-100px", amount: 0.1 };
  const galleryInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-32 md:py-40 bg-[#050505] relative overflow-hidden">

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider mb-8">
              Galería
            </span>

            {/* CORREGIDO: Se eliminó el <h2> que envolvía a PaintText */}
            <PaintText
              text="Captura la Magia"
              className="text-[clamp(3rem,8vw,6rem)] font-black leading-tight tracking-tight"
              paintedColor="#ffffff"
              unpaintedColor="rgba(255, 255, 255, 0.15)"
              bicolor={true}
              secondaryColor="#ec4899"
              secondaryStartWord="Magia"
              animationDuration={0.4}
            />

            <p className="mt-6 text-xl font-instrument text-gray-500 italic max-w-xl mx-auto">
              Fragmentos congelados en el tiempo del Auki Kollo.
            </p>
          </motion.div>
        </div>

        {/* Grid Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[280px] w-full">
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