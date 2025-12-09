import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Chatbot from '@/components/shared/Chatbot';
import { useSectionRefs } from './Hooks/useSectionRefs';

// Lazy load secciones
const HeroSection = lazy(() => import('./sections/HeroSection'));
const StatsSection = lazy(() => import('./sections/StatsSection'));
// Replacing ExperiencesSection with DiscoverBentoSection as the main "Discover" hub
const DiscoverBentoSection = lazy(() => import('./sections/DiscoverBentoSection'));
const HistoryScrollytelling = lazy(() => import('./sections/HistoryScrollytelling'));
// Keeping Gallery/Visor/Testimonials but ensuring they don't break the layout.
// Ideally, these would be refactored too, but fitting them into the theme via CSS.
const GallerySection = lazy(() => import('./sections/GallerySection'));
const Visor360Section = lazy(() => import('./sections/Visor360Section'));
const TestimonialsCarousel = lazy(() => import('./sections/TestimonialsCarousel'));
// MapSection is now integrated into DiscoverBentoSection, but we can keep a dedicated full map section if needed.
// However, the plan was to Integrate it. I will keep it but maybe it's redundant if DiscoverBento has it.
// The prompt said "Map 3D integrated... instead of static". DiscoverBento has it.
// I will comment out MapSection to avoid duplication, or keep it as a "Full View".
// Let's remove MapSection to stay true to "Bento integration".
const FooterSection = lazy(() => import('./sections/FooterSection'));

export default function LaMuelaDelDiablo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedVisor, setSelectedVisor] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  
  const refs = useSectionRefs();

  useEffect(() => {
    // Reduced loading time slightly for better UX dev experience, adjust if needed
    const timer = setTimeout(() => setIsLoaded(true), 4000);

    // Simple Cursor Logic
    const cursor = document.getElementById('cursor-dot');
    const moveCursor = (e) => {
      if(cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isLoaded]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleOpenVisor = (item) => {
    setSelectedVisor(item);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseVisor = () => {
    setSelectedVisor(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen />}
      </AnimatePresence>

      <div className="w-full max-w-[100vw] overflow-x-hidden bg-basalt min-h-screen cursor-none">
         {/* Custom Cursor Element (hidden on touch devices via CSS media queries usually, or JS check) */}
         <div className="custom-cursor hidden md:block" id="cursor-dot" />

        <div className="bg-basalt text-glacier selection:bg-neon-lichen selection:text-basalt">
          
          <Suspense fallback={<div className="min-h-screen bg-basalt flex items-center justify-center text-neon-lichen animate-pulse">LOADING VISION 2025...</div>}>
            <HeroSection 
              isLoaded={isLoaded}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrollToSection={scrollToSection}
              refs={refs}
            />
            
            <StatsSection ref={refs.statsRef} />
            
            {/* The new Core Experience */}
            <div ref={refs.visitsRef}>
                <DiscoverBentoSection />
            </div>
            
            {/* Removed IntroSection as it was redundant with Hero/History */}
            
            <div ref={refs.historyRef}>
              <HistoryScrollytelling />
            </div>
            
            {/* Keeping these for content completeness but they might need CSS tweaks via global styles */}
            <GallerySection ref={refs.galleryRef} />
            
            <Visor360Section 
              ref={refs.visor360Ref}
              selectedVisor={selectedVisor}
              handleOpenVisor={handleOpenVisor}
              handleCloseVisor={handleCloseVisor}
            />
            
            <TestimonialsCarousel 
              ref={refs.testimonialsRef}
              shouldReduceMotion={shouldReduceMotion}
            />
            
            {/* Map integrated in Bento, removing standalone MapSection */}
            {/* <MapSection ref={refs.mapRef} /> */}
            
            <FooterSection ref={refs.contactRef} />
          </Suspense>
          
          <Chatbot />
        </div>
      </div>
    </>
  );
}
