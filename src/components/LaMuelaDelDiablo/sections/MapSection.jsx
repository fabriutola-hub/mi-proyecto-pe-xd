import { forwardRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PaintText from '@/components/shared/PaintText';
import LazyMapaInteractivo from '@/components/LazyMapaInteractivo';

// --- Componente: Iconos SVG Personalizados ---
const TransportIcon = ({ type }) => {
  const icons = {
    bus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    minibus: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    taxi: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tour: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 13l6-6 6 6M5 13V5a2 2 0 012-2h6a2 2 0 012 2v8" />
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
      detail: "Coste: 2.40 Bs • 40 min",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "group-hover:border-blue-500/50"
    },
    { 
      type: "minibus",
      title: "Línea 288", 
      description: "Llega directo a la Urb. El Pedregal, punto de inicio de la caminata.", 
      detail: "Frecuencia alta • Ruta Directa",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "group-hover:border-emerald-500/50"
    },
    { 
      type: "taxi",
      title: "Desde Calacoto", 
      description: "Transbordo en Calacoto hacia Pedregal o taxi privado hasta la base.", 
      detail: "Opción más rápida • Taxi ~20 Bs",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "group-hover:border-orange-500/50"
    },
    { 
      type: "tour",
      title: "Tour Organizado", 
      description: "Salidas desde Plaza San Francisco con guía y transporte incluido.", 
      detail: "80-150 Bs • Todo incluido",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "group-hover:border-purple-500/50"
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-[#080808] relative overflow-hidden">
      
      {/* Fondo Táctico (Grid + Radial) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-bold text-emerald-400 uppercase tracking-[0.3em] mb-8">
              Coordenadas & Acceso
            </span>
            
            {/* CORREGIDO: Se eliminó el <h2> exterior y se cambió por un div con margen */}
            <div className="mb-6">
              <PaintText 
                text="Ruta de Exploración"
                className="text-[clamp(3rem,6vw,5rem)] font-new-rocker text-white leading-[0.9]"
                paintedColor="#34d399" // Emerald 400
                unpaintedColor="#ffffff"
                bicolor={true}
                secondaryColor="#ffffff"
                secondaryStartWord="Exploración"
                animationDuration={0.6}
              />
            </div>
            
            <p className="text-xl font-instrument text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ubicada en Mallasa a <span className="text-white font-bold">3,825 m.s.n.m.</span> El ascenso comienza donde termina el asfalto.
            </p>
          </motion.div>
        </div>

        {/* --- CONTENIDO PRINCIPAL (GRID) --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: Opciones de Transporte (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 pl-2 border-l-2 border-emerald-500/30">
              Vías de Acceso
            </h3>
            
            {transportOptions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={mapInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                className={`group p-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all cursor-default ${item.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                    <TransportIcon type={item.type} />
                  </div>
                  <div>
                    <h4 className={`font-limelight text-lg text-gray-200 group-hover:text-white transition-colors mb-1`}>
                      {item.title}
                    </h4>
                    <p className="text-sm font-instrument text-gray-500 leading-tight mb-3">
                      {item.description}
                    </p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${item.color} opacity-80`}>
                      {item.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Alerta / Recomendación Compacta */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex gap-3 items-center"
            >
              <div className="text-yellow-500">⚠️</div>
              <p className="text-xs text-yellow-200/80 font-mono leading-tight">
                Ruta de dificultad media. Se recomienda calzado de trekking y evitar época de lluvias.
              </p>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Mapa "HUD" (8 cols) */}
          <motion.div
            className="lg:col-span-8 h-[600px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contenedor del Mapa con Estilo HUD */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10 bg-gray-900 shadow-2xl group">
              
              {/* UI Overlay (Esquinas y Retículas) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Esquinas */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 rounded-br-lg" />
                
                {/* Etiquetas */}
                <div className="absolute top-6 left-14 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-[10px] text-emerald-400 font-mono tracking-widest">
                  SATELLITE FEED_LIVE
                </div>
                <div className="absolute bottom-6 right-14 text-[10px] text-gray-500 font-mono tracking-widest">
                  LAT: -16.541 • LNG: -68.092
                </div>

                {/* Efecto de Scanline (Animación de barrido) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite] opacity-50" />
              </div>

              {/* El Mapa Real */}
              <div className="w-full h-full grayscale-[30%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500">
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