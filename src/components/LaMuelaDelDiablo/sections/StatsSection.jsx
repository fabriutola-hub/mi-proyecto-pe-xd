import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';
import { Card } from '../../ui/Card';
import { Mountain, Clock, BarChart3, CloudSun } from 'lucide-react';

const StatsSection = forwardRef((props, ref) => {
  const stats = [
    {
      icon: <Mountain className="w-8 h-8 text-diablo-volcano" />,
      value: "3,825m",
      label: "Altura Máxima",
      desc: "Sobre el nivel del mar"
    },
    {
      icon: <Clock className="w-8 h-8 text-diablo-volcano" />,
      value: "2-3h",
      label: "Tiempo Promedio",
      desc: "Duración de caminata"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-diablo-volcano" />,
      value: "Media",
      label: "Dificultad",
      desc: "Accesible a todo público"
    },
    {
      icon: <CloudSun className="w-8 h-8 text-diablo-volcano" />,
      value: "Seco",
      label: "Clima Ideal",
      desc: "Mayo a Octubre"
    }
  ];

  return (
    <Section ref={ref} id="stats" className="bg-white text-diablo-dark z-20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-diablo-volcano font-mono text-sm tracking-widest uppercase block mb-4"
        >
          Datos de la Aventura
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-diablo-dark"
        >
          Prepárate para el Viaje
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold font-display text-diablo-dark mb-2">{stat.value}</h3>
            <h4 className="text-lg font-bold text-gray-800 mb-1">{stat.label}</h4>
            <p className="text-sm text-gray-500 font-body">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
