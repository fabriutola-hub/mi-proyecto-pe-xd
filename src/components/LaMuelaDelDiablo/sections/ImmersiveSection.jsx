import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';
import { Card } from '../../ui/Card';
import { Compass, Box, Map } from 'lucide-react';

const ImmersiveSection = forwardRef(({ onOpenVisor, onOpenMap, onOpen3D }, ref) => {
  const experiences = [
    {
      id: '360',
      title: "Exploración 360°",
      desc: "Sumérgete en vistas panorámicas de alta resolución desde la cima y los alrededores.",
      icon: <Compass className="w-10 h-10 text-white" />,
      image: "/imagenes/360/PANO_20251109_145847_16_thumbail.avif",
      action: onOpenVisor,
      btnText: "Ver Galería 360°",
      colSpan: "md:col-span-2 lg:col-span-1"
    },
    {
      id: '3d',
      title: "Modelo 3D Interactivo",
      desc: "Analiza la formación geológica desde todos los ángulos con nuestro modelo digital.",
      icon: <Box className="w-10 h-10 text-white" />,
      image: "/imagenes/Sapo de piedra.avif",
      action: onOpen3D,
      btnText: "Interactuar con 3D",
      colSpan: "md:col-span-2 lg:col-span-1"
    },
    {
      id: 'map',
      title: "Mapa de Rutas",
      desc: "Planifica tu ascenso con nuestro mapa detallado de senderos y puntos de interés.",
      icon: <Map className="w-10 h-10 text-white" />,
      image: "/imagenes/IniciodelSendero.avif",
      action: onOpenMap,
      btnText: "Abrir Mapa",
      colSpan: "md:col-span-2 lg:col-span-1"
    }
  ];

  return (
    <Section ref={ref} id="immersive" className="bg-diablo-dark text-white border-t border-white/5">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-diablo-volcano font-mono text-sm tracking-widest uppercase block mb-4"
        >
          Experiencia Digital
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-white"
        >
          Inmersión Total
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-400 font-light"
        >
          Antes de tu visita, recorre el lugar virtualmente con nuestras herramientas interactivas.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, index) => (
          <Card
            key={exp.id}
            delay={index * 0.1}
            className={`group relative overflow-hidden h-[400px] flex flex-col justify-end border-0 p-0 ${exp.colSpan}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-800 transition-transform duration-700 group-hover:scale-110">
               <img src={exp.image} alt={exp.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

            <div className="relative z-10 p-8">
              <div className="mb-4 bg-white/10 w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-diablo-volcano group-hover:border-diablo-volcano transition-colors duration-300">
                {exp.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">{exp.title}</h3>
              <p className="text-gray-300 text-sm mb-6 line-clamp-2">{exp.desc}</p>

              <button
                onClick={exp.action}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-diablo-volcano transition-colors"
              >
                {exp.btnText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
});

ImmersiveSection.displayName = 'ImmersiveSection';

export default ImmersiveSection;
