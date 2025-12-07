import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LazyMapaInteractivo from '@/components/LazyMapaInteractivo';

// --- Iconos SVG ---
const TransportIcon = ({ type }) => {
  const icons = {
    bus: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    minibus: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    taxi: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tour: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 13l6-6 6 6M5 13V5a2 2 0 012-2h6a2 2 0 012 2v8" />
      </svg>
    )
  };
  return icons[type] || icons.bus;
};

const MapSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const mapInView = useInView(ref, inViewConfig);

  const transportOptions = [
    { 
      type: "bus",
      title: "Público - San Francisco", 
      description: "Minibús hacia 'El Pedregal' o 'Los Pinos' desde la iglesia San Francisco.", 
      detail: "2.40 Bs • 40 min",
    },
    { 
      type: "minibus",
      title: "Línea 288", 
      description: "Llega directo a la Urb. El Pedregal, punto de inicio de la caminata.", 
      detail: "Ruta Directa",
    },
    { 
      type: "taxi",
      title: "Desde Calacoto", 
      description: "Transbordo en Calacoto hacia Pedregal o taxi privado hasta la base.", 
      detail: "Taxi ~20 Bs",
    },
    { 
      type: "tour",
      title: "Tour Organizado", 
      description: "Salidas desde Plaza San Francisco con guía y transporte incluido.", 
      detail: "80-150 Bs",
    }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-sand relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2D2420 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-black/60 uppercase mb-4 block">
                Ubicación & Acceso
            </span>
            
            <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-tighter mb-6 font-heading font-black text-neo-black uppercase">
               RUTA DE <span className="text-neo-orange">EXPLORACIÓN</span>
            </h2>
            
            <p className="text-lg font-body text-neo-black/70 max-w-2xl mx-auto">
              Ubicada en Mallasa a <strong className="text-neo-black">3,825 m.s.n.m.</strong>
            </p>
          </motion.div>
        </div>

        {/* --- GRID --- */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Options */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold text-neo-black uppercase tracking-widest mb-6 pb-2 border-b border-neo-black/10">
              Opciones de Transporte
            </h3>
            
            {transportOptions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={mapInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 5 }}
                className={`group p-6 bg-neo-white border border-neo-black/10 hover:border-neo-orange transition-all cursor-default shadow-sm hover:shadow-md rounded-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-full bg-neo-sand text-neo-black`}>
                    <TransportIcon type={item.type} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-neo-black uppercase mb-1 group-hover:text-neo-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-body text-neo-black/70 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neo-black/5 text-neo-black/60 rounded-sm`}>
                      {item.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Map HUD */}
          <motion.div
            className="lg:col-span-8 h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Map Container */}
            <div className="w-full h-full border border-neo-black/20 bg-neo-white relative shadow-lg overflow-hidden rounded-lg">
              
              {/* HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-4 left-4 px-3 py-1 bg-neo-white/90 backdrop-blur-sm text-neo-black text-[10px] font-mono font-bold uppercase tracking-widest border border-neo-black/10 rounded-sm shadow-sm">
                  Mapa Interactivo
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-neo-black/80 backdrop-blur-sm text-neo-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm shadow-sm">
                  LAT: -16.541 • LNG: -68.092
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500">
                {mapInView && <LazyMapaInteractivo />}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

MapSection.displayName = 'MapSection';

export default MapSection;
