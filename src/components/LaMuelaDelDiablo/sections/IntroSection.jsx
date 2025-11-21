import { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center } from '@react-three/drei';
import PaintText from '@/components/shared/PaintText';
import IntroModel from '@/components/LaMuelaDelDiablo/sections/IntroModel';

const IntroSection = forwardRef(function IntroSection(
  { scrollToSection, mapRef },
  ref
) {
  const modelContainerRef = useRef(null);

  const inViewConfig = { once: true, margin: '-50px', amount: 0.1 };
  const introInView = useInView(ref, inViewConfig);

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="py-40 bg-black">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Texto */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={introInView ? 'visible' : 'hidden'}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={introInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider mb-8"
            >
              Descubre
            </motion.span>

            <div className="mb-12">
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[1.1] tracking-tight">
                <PaintText
                  text="Un Ícono Geológico"
                  className="text-[clamp(3rem,8vw,7rem)] font-black leading-[1.1] tracking-tight"
                  paintedColor="#ffffff"
                  unpaintedColor="rgba(255, 255, 255, 0.15)"
                  bicolor={true}
                  secondaryColor="#f97316"
                  secondaryStartWord="Geológico"
                  animationDuration={0.4}
                  staggerDelay={0.012}
                />
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="space-y-6 text-2xl text-white/70 font-light leading-relaxed" {/* MODIFICADO a text-2xl */}
            >
              <p>
                La Muela del Diablo es una formación rocosa de 3,650 metros que
                domina el horizonte de La Paz. Su silueta inconfundible ha inspirado
                leyendas durante siglos.
              </p>
              <p>
                Visible desde toda la ciudad, este monumento natural es el destino
                perfecto para aventureros que buscan conectar con la naturaleza y la
                cultura andina.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(mapRef)}
              className="mt-12 inline-flex items-center gap-3 text-lg font-semibold text-white group"
            >
              Cómo Llegar
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Modelo 3D - Rotación continua incluso al hacer scroll */}
          <motion.div
            ref={modelContainerRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative h-[700px] rounded-3xl overflow-hidden w-full max-w-full"
            style={{ minHeight: '700px', willChange: 'transform' }}
          >
            <Canvas
              camera={{ 
                position: [0, 2, 8],
                fov: 50,
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
              {/* Iluminación */}
              <ambientLight intensity={1.5} />
              <directionalLight intensity={2} position={[5, 5, 5]} />
              <directionalLight intensity={1} position={[-5, 3, -5]} />

              {/* Modelo centrado y rotado hacia la izquierda */}
              <Bounds fit clip observe margin={0.45}>
                <Center>
                  <group rotation={[0, -Math.PI * 0.4, 0]}>
                    <IntroModel />
                  </group>
                </Center>
              </Bounds>

              {/* Controles con rotación automática continua */}
              <OrbitControls
                autoRotate={true}
                autoRotateSpeed={1.5}
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                enableDamping={false}
                target={[0, 0, 0]}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                makeDefault
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
