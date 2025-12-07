import { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center } from '@react-three/drei';
import IntroModel from '@/components/LaMuelaDelDiablo/sections/IntroModel';

const IntroSection = forwardRef(function IntroSection(
  { scrollToSection, mapRef },
  ref
) {
  const modelContainerRef = useRef(null);
  const inViewConfig = { once: true, margin: '-50px', amount: 0.1 };
  const introInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-white text-neo-black overflow-hidden relative border-b border-neo-black/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-orange uppercase mb-6 block">
              Exploración Geológica
            </span>

            <h2 className="text-[clamp(3rem,6vw,5rem)] font-heading font-black leading-[1] tracking-tight text-neo-black mb-8">
              UN ÍCONO <br />
              <span className="text-neo-orange">NATURAL</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-neo-black/80 font-body leading-relaxed border-l-2 border-neo-black/20 pl-8">
              <p>
                La Muela del Diablo es una formación rocosa de <strong className="text-neo-black">3,650 metros</strong> que
                domina el horizonte de La Paz. Su silueta inconfundible ha inspirado
                leyendas durante siglos.
              </p>
              <p>
                Visible desde toda la ciudad, este monumento natural es el destino
                perfecto para aventureros que buscan conectar con la naturaleza y la
                cultura andina.
              </p>
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              onClick={() => scrollToSection(mapRef)}
              className="mt-12 group flex items-center gap-4 text-neo-black font-bold uppercase tracking-widest text-sm hover:text-neo-orange transition-colors"
            >
              <span className="border-b-2 border-neo-black group-hover:border-neo-orange pb-1 transition-colors">
                 Planificar Ruta
              </span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
            </motion.button>
          </motion.div>

          {/* Modelo 3D */}
          <motion.div
            ref={modelContainerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-[500px] md:h-[700px] w-full bg-neo-sand/30 border border-neo-black/10 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 border-[40px] border-neo-white/50 rounded-full pointer-events-none z-10" />

            <Canvas
              camera={{ 
                position: [0, 2, 8],
                fov: 45,
                near: 0.1,
                far: 2000
              }}
              gl={{ 
                alpha: true, 
                antialias: true,
                preserveDrawingBuffer: true
              }}
              dpr={[1, 1.5]}
              frameloop="always"
            >
              <ambientLight intensity={1.5} />
              <directionalLight intensity={2} position={[5, 5, 5]} />
              <directionalLight intensity={1} position={[-5, 3, -5]} />

              <Bounds fit clip observe margin={0.55}>
                <Center>
                  <group rotation={[0, -Math.PI * 0.4, 0]}>
                    <IntroModel />
                  </group>
                </Center>
              </Bounds>

              <OrbitControls
                autoRotate={true}
                autoRotateSpeed={1.0}
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                enableDamping={true}
                target={[0, 0, 0]}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                makeDefault
              />
            </Canvas>

             {/* Decorative Label */}
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 bg-neo-white/80 backdrop-blur-sm px-4 py-2 border border-neo-black/10 rounded-full">
                <span className="font-mono text-[10px] font-bold text-neo-black tracking-widest uppercase">Modelo 3D Interactivo</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
