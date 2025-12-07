import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { X } from 'lucide-react';
import IntroModel from './IntroModel';

export default function ThreeDModal({ onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Cerrar modelo 3D"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full h-full">
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 5] }}>
            <Stage environment="city" intensity={0.6} preset="rembrandt" adjustCamera={1.5}>
                <IntroModel />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={0.5} makeDefault />
        </Canvas>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
        <p className="text-white/70 text-sm bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
          Arrastra para rotar • Scroll para zoom
        </p>
      </div>
    </div>
  );
}
