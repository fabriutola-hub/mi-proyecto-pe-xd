import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';

const HistorySection = forwardRef((props, ref) => {
  return (
    <Section ref={ref} id="history" className="bg-white text-diablo-dark">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <img
              src="/imagenes/foto muela.avif"
              alt="Leyenda de la Muela"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-serif italic text-lg opacity-90">
                "Cuentan los abuelos que una batalla entre el bien y el mal dio forma a esta roca..."
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-diablo-earth/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-diablo-volcano/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Right Column: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-diablo-volcano font-mono text-sm tracking-widest uppercase mb-4 block">
            Historia y Leyenda
          </span>

          <h2 className="text-5xl md:text-6xl font-display text-diablo-dark mb-8 leading-none">
            Entre el Cielo y <br/>
            <span className="text-diablo-earth italic">el Inframundo</span>
          </h2>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-body">
            <p>
              <strong className="text-diablo-dark">La Muela del Diablo</strong>, conocida ancestralmente como <em>Auki Kollo</em>, no es solo una formación geológica caprichosa; es un testigo silencioso de milenios de historia en los Andes.
            </p>
            <p>
              La leyenda popular narra una batalla épica donde un arcángel golpeó al diablo, haciéndole escupir una muela que cayó en este lugar, petrificándose para siempre. Sin embargo, la geología nos cuenta otra historia igual de fascinante: una erosión de millones de años que esculpió la arcilla y arenisca hasta crear esta aguja de roca de 150 metros de altura.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
            <div>
              <h4 className="font-display text-3xl text-diablo-dark mb-2">150m</h4>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Altura del Monolito</p>
            </div>
            <div>
              <h4 className="font-display text-3xl text-diablo-dark mb-2">Plioceno</h4>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Era Geológica</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
});

HistorySection.displayName = 'HistorySection';

export default HistorySection;
