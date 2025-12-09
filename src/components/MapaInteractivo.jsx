import { useState, useMemo, useCallback, useRef } from 'react';
import Map, { Source, Layer, NavigationControl, FullscreenControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils'; // Assuming this utility exists or similar
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Fallback token if env variable is missing or empty
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiamRvZSIsImEiOiJjbHh4eHh4eHh4eHh4In0.xxxxxx';

// Estilos de mapa como constantes
const STYLE_2D = 'mapbox://styles/mapbox/dark-v11';
const STYLE_3D = 'mapbox://styles/mapbox/satellite-streets-v12';

export default function MapaInteractivo({ className, minimal = false }) {
  const mapRef = useRef(null);
  
  const [viewState, setViewState] = useState({
    longitude: -68.05, 
    latitude: -16.565,
    zoom: 14.5, 
    pitch: 0, 
    bearing: 0 
  });

  const [is3D, setIs3D] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null);

  // Optimización: Memoizar estilos de capa fuera del componente
  // Updated for Neon Lichen palette
  const geoJsonLayerStyle = useMemo(() => ({
    id: 'puntos-muela',
    type: 'circle',
    paint: {
      'circle-color': '#CCFF00', // Neon Lichen
      'circle-radius': 6, // Slightly smaller for technical look
      'circle-stroke-width': 1,
      'circle-stroke-color': '#0F0F11' // Basalt
    }
  }), []);

  // Optimización: useCallback para evitar recrear funciones
  const toggleMapStyle = useCallback(() => {
    const nextIs3D = !is3D;
    setIs3D(nextIs3D);
    
    // Usar método de animación suave del mapa directamente
    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: nextIs3D ? 75 : 0,
        zoom: nextIs3D ? 15 : 14.5,
        duration: 1000
      });
    } else {
      setViewState(prev => ({
        ...prev,
        pitch: nextIs3D ? 75 : 0,
        zoom: nextIs3D ? 15 : 14.5
      }));
    }
  }, [is3D]);

  // Optimización: Manejar movimiento del mapa con useCallback
  const handleMove = useCallback((evt) => {
    setViewState(evt.viewState);
  }, []);

  // Optimización: useCallback para el manejador de clicks
  const handleMapClick = useCallback((event) => {
    setClickedPoint(null);
    
    if (event.features && event.features.length > 0) {
      const feature = event.features.find(f => f.layer.id === 'puntos-muela');
      if (feature) {
        setClickedPoint(feature);
      }
    }
  }, []);

  // Optimización: useCallback para cerrar popup
  const handleClosePopup = useCallback(() => {
    setClickedPoint(null);
  }, []);

  // Optimización: Memoizar configuración del terreno
  const terrainConfig = useMemo(() => 
    is3D ? { source: 'mapbox-dem', exaggeration: 1.5 } : null,
    [is3D]
  );

  // Optimización: Memoizar estilo del mapa
  const mapStyle = useMemo(() => 
    is3D ? STYLE_3D : STYLE_2D,
    [is3D]
  );

  // Optimización: Memoizar el contenido del popup
  const popupContent = useMemo(() => {
    if (!clickedPoint) return null;

    return (
      <div className="font-body text-basalt max-w-[200px]">
        {clickedPoint.properties.imagenUrl && (
          <img 
            src={clickedPoint.properties.imagenUrl} 
            alt={clickedPoint.properties.LUGAR} 
            className="w-full h-32 object-cover rounded-none mb-2 border border-basalt"
            loading="lazy"
          />
        )}
        <h3 className="text-lg font-bold font-display uppercase mb-1">
          {clickedPoint.properties.LUGAR}
        </h3>
        {clickedPoint.properties.descripcion && (
          <p className="text-xs italic mb-2">
            {clickedPoint.properties.descripcion}
          </p>
        )}
        <div className="text-xs grid grid-cols-1 gap-1 border-t border-basalt/20 pt-2 mt-2">
           <div><strong>Norte:</strong> {clickedPoint.properties.Norte}</div>
           <div><strong>Sur:</strong> {clickedPoint.properties.Sur}</div>
        </div>
      </div>
    );
  }, [clickedPoint]);

  return (
    <div className={twMerge(clsx("relative w-full h-full bg-slate overflow-hidden", className))}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
        maxPitch={85}
        terrain={terrainConfig}
        interactiveLayerIds={['puntos-muela']}
        onClick={handleMapClick}
        // Optimización: Renderizado asíncrono para mejor performance
        renderWorldCopies={false}
        // Optimización: Configurar la calidad de renderizado
        antialias={true}
        // Optimización: Reducir carga inicial
        reuseMaps
      >
        {!minimal && (
           <>
            <NavigationControl position="top-right" />
            <FullscreenControl position="top-right" />
           </>
        )}

        {/* Fuente de relieve - solo cargar en modo 3D */}
        {is3D && (
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
            tileSize={512}
            maxzoom={14}
          />
        )}

        {/* Fuente de puntos */}
        <Source 
          id="muela-geojson" 
          type="geojson" 
          data="/data/puntos_muela.geojson"
          // Optimización: Generar IDs para features
          generateId={true}
        >
          <Layer {...geoJsonLayerStyle} />
        </Source>

        {/* Popup optimizado */}
        {clickedPoint && (
          <Popup
            longitude={clickedPoint.geometry.coordinates[0]}
            latitude={clickedPoint.geometry.coordinates[1]}
            onClose={handleClosePopup}
            closeOnClick={false}
            anchor="bottom"
            maxWidth="240px"
            // Optimización: Offset para mejor posicionamiento
            offset={15}
            className="rounded-none font-sans"
          >
            {popupContent}
          </Popup>
        )}
      </Map>

      {/* Botón 2D/3D optimizado - Re-styled for Robust Minimalism */}
      <button
        onClick={toggleMapStyle}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate/90 backdrop-blur-sm text-neon-lichen border border-neon-lichen hover:bg-neon-lichen hover:text-basalt transition-all duration-200 uppercase font-bold text-xs font-display tracking-widest shadow-none rounded-none"
      >
        {is3D ? '2D View' : '3D Terrain'}
      </button>

      {/* Decorative corners or technical overlay if desired */}
      <div className="absolute bottom-4 left-4 text-[10px] text-neon-lichen/50 font-mono pointer-events-none">
        COORD: 16.565° S, 68.050° W <br/>
        ELEV: 3825M
      </div>
    </div>
  );
}
