import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, animate } from 'framer-motion';

// Constantes - ajustadas para loading de 500ms
const ANIMATION_DURATION = 0.4;
const PHASE_INTERVAL = 150;
const DATA_STREAM_INTERVAL = 100;

const PHASES = [
  { title: 'Calibrando Sensores', sub: 'Iniciando módulos geológicos...' },
  { title: 'Escaneando Terreno', sub: 'Analizando topografía andina...' },
  { title: 'Renderizando Entorno', sub: 'Cargando texturas de alta resolución...' },
  { title: 'Sistema Listo', sub: 'Bienvenido a La Muela del Diablo' }
];

// Componente DataStream memoizado
const DataStream = memo(() => {
  const [data, setData] = useState('0000');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(Math.random().toString(16).substring(2, 8).toUpperCase());
    }, DATA_STREAM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-[10px] text-orange-500/60">{data}</span>;
});
DataStream.displayName = 'DataStream';

// Componente principal
export default function LoadingScreen() {
  const count = useSpring(0, { stiffness: 40, damping: 25 });
  const roundedCount = useTransform(count, (latest) => Math.round(latest));
  const circleProgress = useTransform(count, [0, 100], [283, 0]);
  const memoryProgress = useTransform(count, [0, 100], ['0%', '60%']);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = useMemo(() => PHASES, []);

  useEffect(() => {
    const controls = animate(count, 100, { duration: ANIMATION_DURATION, ease: 'easeInOut' });
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev < phases.length - 1 ? prev + 1 : prev));
    }, PHASE_INTERVAL);

    return () => {
      controls.stop();
      clearInterval(phaseInterval);
    };
  }, [count, phases.length]);

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden cursor-wait"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {/* Fondo con grid en perspectiva */}
      <div className="absolute inset-0 perspective-1000 pointer-events-none opacity-20">
        <motion.div
          animate={{ backgroundPosition: ['0px 0px', '0px 100px'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) scale(2)',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)'
          }}
        />
      </div>

      {/* HUD Corners */}
      <div className="absolute inset-8 md:inset-12 pointer-events-none border border-white/5 rounded-3xl z-10 flex flex-col justify-between">
        {/* Top Left */}
        <div className="p-6 flex flex-col border-l border-t border-white/20 rounded-tl-3xl w-48">
          <span className="text-xs font-bold text-white tracking-widest mb-1">SYSTEM_BOOT</span>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-400 uppercase">Online</span>
          </div>
        </div>

        {/* Top Right */}
        <div className="p-6 flex flex-col items-end border-r border-t border-white/20 rounded-tr-3xl absolute top-0 right-0 w-48">
          <DataStream />
          <DataStream />
          <DataStream />
        </div>

        {/* Bottom Left */}
        <div className="p-6 border-l border-b border-white/20 rounded-bl-3xl absolute bottom-0 left-0 w-48">
          <span className="text-[10px] text-gray-500 uppercase">Memory usage:</span>
          <div className="w-full h-1 bg-gray-800 mt-1 rounded-full overflow-hidden">
            <motion.div className="h-full bg-orange-500" style={{ width: memoryProgress }} />
          </div>
        </div>

        {/* Bottom Right */}
        <div className="p-6 flex items-end justify-end border-r border-b border-white/20 rounded-br-3xl absolute bottom-0 right-0 w-48">
          <span className="font-limelight text-2xl text-white/20">M.D.D.</span>
        </div>
      </div>

      {/* Centro: Radar/Escáner */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Anillos giratorios */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            className="absolute inset-0 border border-dashed border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            className="absolute inset-4 border border-dotted border-orange-500/20 rounded-full"
          />

          {/* SVG Loader */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#f97316"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="283"
              style={{ strokeDashoffset: circleProgress }}
            />
          </svg>

          {/* Contenido central */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.span className="text-7xl md:text-8xl font-limelight text-white tracking-tighter drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              {roundedCount}
            </motion.span>
            <span className="text-xs font-mono text-orange-500 mt-2 uppercase tracking-[0.3em]">Loading</span>
          </div>
        </div>

        {/* Textos de fase */}
        <div className="mt-12 h-20 w-full max-w-md text-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <h3 className="text-xl text-white font-instrument italic mb-1">
                {phases[currentPhase].title}
              </h3>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                {phases[currentPhase].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Efectos de escaneo */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] opacity-20" />
      <motion.div
        animate={{ top: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        className="absolute left-0 right-0 h-1 bg-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.5)] pointer-events-none z-50"
      />
    </motion.div>
  );
}