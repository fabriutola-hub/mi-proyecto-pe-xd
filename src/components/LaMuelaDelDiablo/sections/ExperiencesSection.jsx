import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../constants/experiences';

// --- Card Component ---
const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative w-full h-full bg-neo-white border border-neo-black/10 hover:border-neo-orange hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-8 md:p-10 flex flex-col h-full relative z-10">

        {/* Number */}
        <span className="font-mono text-xs font-bold text-neo-black/30 mb-6 block">0{index + 1}</span>

        {/* Title */}
        <h3 className="text-2xl mb-4 font-heading font-black uppercase leading-tight text-neo-black group-hover:text-neo-orange transition-colors">
          {exp.title}
        </h3>

        {/* Desc */}
        <p className="text-base font-body text-neo-black/60 leading-relaxed mb-8 flex-grow">
          {exp.desc}
        </p>

        {/* Icon (Visual) */}
        <div className="mt-auto flex justify-between items-end border-t border-neo-black/10 pt-6">
            <span className="text-sm font-bold uppercase tracking-widest text-neo-black group-hover:underline">Ver Detalles</span>
            <div className="text-4xl text-neo-black/20 group-hover:text-neo-orange group-hover:scale-110 transition-all duration-300">
                {exp.icon}
            </div>
        </div>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute inset-0 bg-neo-sand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

// --- Main Component ---
const ExperiencesSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const sectionInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neo-black/10 pb-12"
        >
          <div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-orange uppercase mb-4 block">
                Actividades
            </span>
            <h2 className="text-[clamp(3rem,5vw,5rem)] leading-none font-heading font-black text-neo-black">
                EXPERIENCIAS <br/> ÚNICAS
            </h2>
          </div>
          
          <p className="text-lg font-body text-neo-black/60 max-w-md leading-relaxed">
            Sumérgete en experiencias diseñadas para conectar tu espíritu con la naturaleza milenaria de Auki Kollo.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
