import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Chatbot from '@/components/shared/Chatbot';
import { useSectionRefs } from './Hooks/useSectionRefs';
import LazyVisor360 from '../LazyVisor360';

// Lazy load sections
const HeroSection = lazy(() => import('./sections/HeroSection'));
const StatsSection = lazy(() => import('./sections/StatsSection'));
const ImmersiveSection = lazy(() => import('./sections/ImmersiveSection'));
const HistorySection = lazy(() => import('./sections/HistorySection'));
const RouteSection = lazy(() => import('./sections/RouteSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsCarousel')); // Mapped to the new component
const FooterSection = lazy(() => import('./sections/FooterSection'));

// Functional components (Lazy loaded to keep performance)
const MapSection = lazy(() => import('./sections/MapSection'));
const ThreeDModal = lazy(() => import('./sections/ThreeDModal'));

export default function LaMuelaDelDiablo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State for immersive viewers
  const [showVisor360, setShowVisor360] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [show3D, setShow3D] = useState(false); // Placeholder for 3D model viewer modal if needed

  const [selectedVisor, setSelectedVisor] = useState(null); // Keep compatibility with Visor360Section props if needed

  const refs = useSectionRefs();

  useEffect(() => {
    // Keep the loading screen logic
    const timer = setTimeout(() => setIsLoaded(true), 8450);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  // Handlers for Immersive Section Actions
  const handleOpenVisor = () => {
    setSelectedVisor({
      id: 'main',
      title: 'Vista Panorámica',
      src: '/imagenes/360/PANO_20251109_145847_16.jpg',
      caption: 'Cima de la Muela del Diablo'
    });
    setShowVisor360(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVisor = () => {
    setSelectedVisor(null);
    setShowVisor360(false);
    document.body.style.overflow = 'unset';
  };

  const handleOpenMap = () => {
    setShowMap(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseMap = () => {
    setShowMap(false);
    document.body.style.overflow = 'unset';
  };

  const handleOpen3D = () => {
    setShow3D(true);
  };

  const handleClose3D = () => {
    setShow3D(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen />}
      </AnimatePresence>

      <div className="w-full max-w-[100vw] overflow-x-hidden bg-diablo-dark text-white font-body selection:bg-diablo-volcano selection:text-white">

          <Suspense fallback={<div className="min-h-screen bg-diablo-dark" />}>

            {/* 1. HERO */}
            <HeroSection 
              isLoaded={isLoaded}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrollToSection={scrollToSection}
              refs={refs}
            />
            
            {/* 2. QUICK FACTS (STATS) */}
            <StatsSection ref={refs.statsRef} />
            
            {/* 3. IMMERSIVE EXPERIENCE (Gateway) */}
            <ImmersiveSection
              ref={refs.visitsRef}
              onOpenVisor={handleOpenVisor}
              onOpenMap={handleOpenMap}
              onOpen3D={handleOpen3D}
            />
            
            {/* 4. HISTORY & LEGENDS */}
            <HistorySection ref={refs.introRef} /> {/* Reusing introRef for History for now */}
            
            {/* 5. HOW TO GET THERE (Route) */}
            <RouteSection ref={refs.mapRef} onOpenMap={handleOpenMap} />
            
            {/* 6. TESTIMONIALS */}
            <TestimonialsSection ref={refs.testimonialsRef} />
            
            {/* 7. FOOTER & FINAL CTA */}
            <FooterSection ref={refs.contactRef} />


            {/* --- MODALS / OVERLAYS --- */}

            {/* 360 VISOR OVERLAY */}
            <div className={`fixed inset-0 z-[60] bg-black transition-opacity duration-500 ${showVisor360 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
               {showVisor360 && selectedVisor && (
                 <div className="relative h-full w-full">
                    <button
                      onClick={handleCloseVisor}
                      className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                    >
                      ✕ Cerrar
                    </button>
                    <LazyVisor360
                        src={selectedVisor.src}
                        caption={selectedVisor.caption}
                        embedded={true}
                    />
                 </div>
               )}
            </div>

            {/* MAP OVERLAY */}
             <div className={`fixed inset-0 z-[60] bg-black transition-opacity duration-500 ${showMap ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {showMap && (
                   <div className="relative h-full w-full flex flex-col">
                      <div className="absolute top-4 right-4 z-50 flex gap-4">
                         <button
                           onClick={handleCloseMap}
                           className="px-4 py-2 bg-diablo-dark text-white rounded-full font-bold shadow-lg hover:bg-diablo-earth transition-colors"
                         >
                           Cerrar Mapa
                         </button>
                      </div>
                      <MapSection />
                   </div>
                )}
             </div>

             {/* 3D MODEL OVERLAY */}
             {show3D && (
                <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white">Cargando 3D...</div>}>
                   <ThreeDModal onClose={handleClose3D} />
                </Suspense>
             )}

          </Suspense>
          
          <Chatbot />
      </div>
    </>
  );
}
