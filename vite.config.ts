import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],

    // El alias "@" (esto está perfecto)
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), 'src')
        },
    },

    // ⚡ OPTIMIZACIONES DE BUILD
    build: {
        target: 'esnext',
        minify: 'esbuild',
        cssCodeSplit: true,
        sourcemap: false,
        // Chunks más pequeños
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                // Manual chunking para vendors pesados
                manualChunks: {
                    // Three.js y ecosystem
                    'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
                    // Mapas
                    'vendor-maps': ['mapbox-gl', 'react-map-gl'],
                    // Animaciones
                    'vendor-motion': ['framer-motion', 'motion'],
                    // Visor 360
                    'vendor-360': ['@photo-sphere-viewer/core', '@photo-sphere-viewer/gyroscope-plugin', '@photo-sphere-viewer/stereo-plugin'],
                    // React core
                    'vendor-react': ['react', 'react-dom'],
                },
                // Nombres de archivo optimizados
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    },

    // ⚡ OPTIMIZACIONES DE DEV
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion'],
        exclude: ['@photo-sphere-viewer/core']
    },

    // ⚡ SERVIDOR DE DESARROLLO
    server: {
        warmup: {
            clientFiles: ['./src/App.jsx', './src/components/LaMuelaDelDiablo/LaMuelaDelDiablo.jsx']
        }
    }
})