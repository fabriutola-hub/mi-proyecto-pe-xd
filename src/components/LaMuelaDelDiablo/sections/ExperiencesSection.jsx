import { forwardRef, useRef } from 'react';
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { experiences } from '../constants/experiences';

// --- Subcomponente: Tarjeta con Efecto Spotlight ---
const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="group relative w-full h-full rounded-3xl border border-white/10 bg-gray-900/50 overflow-hidden"
    >
      {/* 1. Efecto Spotlight del Borde (Sigue al mouse) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 2. Capa de contenido */}
      <div className="relative h-full p-8 flex flex-col">
        {/* Icono con Glow */}
        <div className="mb-6 relative inline-flex">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-3xl group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-all duration-300">
            {exp.icon}
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl mb-4 text-white font-limelight tracking-wide group-hover:text-emerald-400 transition-colors">
          {exp.title}
        </h3>

        {/* Descripción */}
        <p className="text-lg font-instrument text-gray-400 leading-relaxed mb-8 flex-grow group-hover:text-gray-300 transition-colors">
          {exp.desc}
        </p>

        {/* Footer / CTA */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm font-new-rocker text-emerald-600/80 tracking-widest uppercase">
            0{index + 1}
          </span>
          
          <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
            <span className="uppercase tracking-wider text-xs">Descubrir</span>
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Componente Principal ---
const ExperiencesSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const sectionInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Fondo Decorativo (Grid sutil) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mb-8">
            Nuestras Actividades
          </span>
          
          {/* CORREGIDO: Se eliminó el <h2> que envolvía a PaintText */}
          <div className="mb-4">
            <PaintText
              text="Vive la Aventura"
              className="text-[clamp(3rem,7vw,6rem)] font-new-rocker text-white leading-[0.9]"
              paintedColor="#10b981" // Emerald 500
              unpaintedColor="#374151" // Gray 700
              bicolor={true}
              secondaryColor="#ffffff"
              secondaryStartWord="Aventura"
              animationDuration={0.6}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl font-instrument text-gray-400 max-w-2xl mx-auto"
          >
            Sumérgete en experiencias diseñadas para conectar tu espíritu con la naturaleza milenaria de Auki Kollo.
          </motion.p>
        </motion.div>

        {/* Grid de Tarjetas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
});

ExperiencesSection.displayName = 'ExperiencesSection';

export default ExperiencesSection;