import { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center } from '@react-three/drei';
import PaintText from '@/components/shared/PaintText';
import IntroModel from './IntroModel';

// Variantes de animación
const fadeInUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Hook para detectar móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Configuración del Canvas - optimizada para móvil
const getCanvasConfig = (isMobile) => ({
  camera: {
    position: [0, 2, 8],
    fov: isMobile ? 60 : 50, // FOV más amplio en móvil
    near: 0.1,
    far: 2000
  },
  gl: {
    alpha: true,
    antialias: !isMobile, // Sin antialiasing en móvil
    preserveDrawingBuffer: false,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  },
  dpr: isMobile ? [1, 1] : [1, 1.5] // DPR más bajo en móvil
});

const IntroSection = forwardRef(function IntroSection({ scrollToSection, mapRef }, ref) {
  const modelContainerRef = useRef(null);
  const introInView = useInView(ref, { once: true, margin: '-50px', amount: 0.1 });
  const isMobile = useIsMobile();
  const canvasConfig = getCanvasConfig(isMobile);

  return (
    <section ref={ref} className="py-20 md:py-40 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Contenido de texto */}
          <motion.div variants={fadeInUp} initial="hidden" animate={introInView ? 'visible' : 'hidden'}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider mb-6 md:mb-8">
              Descubre
            </span>

            <div className="mb-8 md:mb-12">
              <PaintText
                text="Un Ícono Geológico"
                className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[1.1] tracking-tight"
                paintedColor="#ffffff"
                unpaintedColor="rgba(255, 255, 255, 0.15)"
                bicolor={true}
                secondaryColor="#f97316"
                secondaryStartWord="Geológico"
                animationDuration={0.3}
                staggerDelay={0.008}
              />
            </div>

            <div className="space-y-4 md:space-y-6 text-lg md:text-2xl text-white/70 font-light leading-relaxed">
              <p>
                La Muela del Diablo es una formación rocosa de 3,650 metros que
                domina el horizonte de La Paz.
              </p>
              {!isMobile && (
                <p>
                  Visible desde toda la ciudad, este monumento natural es el destino
                  perfecto para aventureros que buscan conectar con la naturaleza y la
                  cultura andina.
                </p>
              )}
            </div>

            <button
              onClick={() => scrollToSection(mapRef)}
              className="mt-8 md:mt-12 inline-flex items-center gap-3 text-base md:text-lg font-semibold text-white group"
            >
              Cómo Llegar
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          {/* Modelo 3D - altura reducida en móvil */}
          <motion.div
            ref={modelContainerRef}
            initial={{ opacity: 0 }}
            animate={introInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="relative h-[400px] md:h-[700px] rounded-2xl md:rounded-3xl overflow-hidden w-full"
          >
            <Canvas
              {...canvasConfig}
              frameloop={isMobile ? 'demand' : 'always'}
            >
              <ambientLight intensity={isMobile ? 2 : 1.5} />
              <directionalLight intensity={isMobile ? 1.5 : 2} position={[5, 5, 5]} />
              {!isMobile && <directionalLight intensity={1} position={[-5, 3, -5]} />}

              <Bounds fit clip observe margin={0.45}>
                <Center>
                  <group rotation={[0, -Math.PI * 0.4, 0]}>
                    <IntroModel />
                  </group>
                </Center>
              </Bounds>

              <OrbitControls
                autoRotate
                autoRotateSpeed={isMobile ? 0.8 : 1.5}
                enablePan={false}
                enableZoom={!isMobile}
                enableRotate
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
