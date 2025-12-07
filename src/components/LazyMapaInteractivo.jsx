import { lazy, Suspense, memo } from 'react';

// ===== CONSTANTS =====
const LOADING_CONFIG = {
  spinnerSize: 'w-16 h-16',
  spinnerBorder: 'border-4',
  animationDuration: 'animate-spin',
};

// ===== COMPONENTS =====

/**
 * Loading fallback component for the map
 * Memoized to prevent unnecessary re-renders
 */
const MapLoadingFallback = memo(() => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl">
    <div className="text-center space-y-4">
      <div 
        className={`${LOADING_CONFIG.spinnerSize} ${LOADING_CONFIG.spinnerBorder} border-white/30 border-t-white rounded-full ${LOADING_CONFIG.animationDuration} mx-auto`}
        role="status"
        aria-label="Cargando mapa"
      />
      <p className="text-gray-600 font-semibold" aria-live="polite">
        Cargando mapa interactivo...
      </p>
    </div>
  </div>
));
MapLoadingFallback.displayName = 'MapLoadingFallback';

/**
 * Lazy loaded map component
 * Uses dynamic import for code splitting
 */
const MapaInteractivoLazy = lazy(() => 
  import('@/components/MapaInteractivo.jsx').catch((error) => {
    console.error('Error al cargar el mapa:', error);
    // Retorna un componente de error como fallback
    return {
      default: () => (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8">
          <div className="text-center space-y-4">
            <div className="text-5xl">⚠️</div>
            <p className="text-red-600 font-semibold">
              Error al cargar el mapa
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium"
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    };
  })
);

/**
 * Main lazy map wrapper component
 * Handles lazy loading with proper fallback states
 */
const LazyMapaInteractivo = memo((props) => {
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <MapaInteractivoLazy {...props} />
    </Suspense>
  );
});

LazyMapaInteractivo.displayName = 'LazyMapaInteractivo';

export default LazyMapaInteractivo;

