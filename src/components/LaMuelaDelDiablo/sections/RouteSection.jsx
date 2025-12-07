import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';
import { MapPin, ArrowRight, Bus, Car, Footprints } from 'lucide-react';
import LazyMapaInteractivo from '@/components/LazyMapaInteractivo';

const RouteSection = forwardRef(({ onOpenMap }, ref) => {
  const steps = [
    {
      icon: <Bus className="w-6 h-6" />,
      title: "Transporte Público",
      desc: "Toma un minibus a 'El Pedregal' desde la zona sur (calle 21 de Calacoto).",
      time: "30 min"
    },
    {
      icon: <Footprints className="w-6 h-6" />,
      title: "Inicio del Trekking",
      desc: "Desde la última parada, sigue el sendero señalizado hacia el cementerio.",
      time: "15 min"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ascenso Final",
      desc: "Sube por la cresta hasta la base de la Muela. ¡Disfruta la vista!",
      time: "45 min"
    }
  ];

  return (
    <Section ref={ref} id="route" className="bg-diablo-dark text-stone-100">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Info & Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-diablo-volcano font-mono text-sm tracking-widest uppercase mb-4 block">
            Guía de Ruta
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
            El Camino a la Cima
          </h2>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-diablo-earth shrink-0 group-hover:bg-diablo-volcano group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {step.title}
                    <span className="text-xs font-normal text-stone-300 bg-white/10 px-2 py-1 rounded-full">
                      {step.time}
                    </span>
                  </h3>
                  <p className="text-stone-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={onOpenMap}
              className="btn-primary flex items-center gap-2"
            >
              Ver Mapa Interactivo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Right: Stylized Mini Map (Illustration) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        >
           {/* Stylized map visualization */}
            <div className="absolute inset-0 bg-gray-900">
                <LazyMapaInteractivo preview={true} />

                 {/* Decorative overlay suggesting map UI */}
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-diablo-dark">LA PAZ, BO</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
               <p className="text-white text-sm font-medium">Vista simplificada. Abre el mapa interactivo para GPS y detalles 3D.</p>
            </div>
        </motion.div>

      </div>
    </Section>
  );
});

RouteSection.displayName = 'RouteSection';

export default RouteSection;
