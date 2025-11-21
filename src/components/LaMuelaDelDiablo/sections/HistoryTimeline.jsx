import { forwardRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import { historyTimeline } from '../constants/historyTimeline';

// Componente individual para cada item del timeline
const TimelineItem = ({ item, index }) => {
  // Usamos un ref interno solo para la animación de entrada de CADA item
  const ref = { current: null }; 
  
  // Nota: Como es un map, usaremos motion.div con whileInView para simplificar
  // en lugar de crear refs para cada uno manualmente.
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className={`relative flex items-center justify-between mb-24 w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col`} 
    >
      {/* Espacio vacío para layout alterno en desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Punto central en la línea */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-orange-500 rounded-full z-20 -translate-x-1/2 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-orange-600 rounded-full" />
      </motion.div>

      {/* Tarjeta de Contenido */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: isEven ? 1 : -1 }}
        className={`w-full md:w-5/12 pl-12 md:pl-0 ${
          isEven ? "md:pr-12 text-left" : "md:pl-12 text-left"
        }`}
      >
        <div className="group relative bg-white/50 backdrop-blur-sm border border-gray-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          
          {/* Decoración de fondo al hacer hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Número Grande de fondo */}
          <span className="absolute -right-4 -bottom-8 text-[8rem] font-limelight text-gray-100/50 select-none pointer-events-none group-hover:text-orange-100/50 transition-colors duration-300">
            {index + 1}
          </span>

          {/* Año / Era */}
          <div className="relative">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-new-rocker text-orange-600 bg-orange-50 rounded-full border border-orange-100 tracking-wider">
              {item.year}
            </span>
          </div>

          {/* Título */}
          <h3 className="relative text-3xl mb-3 text-gray-900 font-limelight leading-tight group-hover:text-orange-700 transition-colors">
            {item.title}
          </h3>

          {/* Descripción */}
          <p className="relative text-lg font-instrument text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- AQUÍ ESTABA EL PROBLEMA: FALTABA EL forwardRef ---
const HistoryTimeline = forwardRef((props, ref) => {
  
  // Hook para detectar el scroll dentro de esta sección usando la ref que viene del padre
  const { scrollYProgress } = useScroll({
    target: ref, // Usamos la referencia externa para medir el scroll
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    // Conectamos la ref aquí para que el botón sepa dónde está esta sección
    <section ref={ref} className="py-32 bg-white overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative">
        
        {/* Header */}
        <div className="text-center mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-orange-600 bg-orange-50 border border-orange-100 rounded-full">
              Cronología Histórica
            </span>
            
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter mb-8">
              <PaintText
                text="Milenios de Historia Viva"
                className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter font-new-rocker"
                paintedColor="#d97706" 
                unpaintedColor="#1f2937"
                bicolor={true}
                secondaryColor="#1f2937"
                secondaryStartWord="de"
                animationDuration={0.6}
                staggerDelay={0.012}
              />
            </h2>

            <p className="max-w-2xl mx-auto text-xl font-instrument text-gray-500 leading-relaxed">
              Un viaje a través del tiempo en Auki Kollo, donde cada estrato geológico
              y cada piedra cuenta la historia de la formación de los Andes.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2" />

          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-red-500 to-orange-600 origin-top -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
          />

          <div className="relative z-10 pt-10">
            {historyTimeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
          
          <div className="absolute bottom-0 left-4 md:left-1/2 w-3 h-3 bg-orange-600 rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
        </div>

      </div>
    </section>
  );
});

HistoryTimeline.displayName = 'HistoryTimeline';

export default HistoryTimeline;
