import { motion } from 'framer-motion';

// Helper to safely encode URLs
const getPath = (filename) => encodeURI(`/imagenes/${filename}`);

const images = [
  { src: "fondo-muela (1).avif", alt: "Vista Panorámica", colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  { src: "IniciodelSendero.avif", alt: "Inicio del Sendero", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: "grieta.avif", alt: "Formaciones Rocosas", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: "Cima Muela.avif", alt: "La Cima", colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
  { src: "Laguna.avif", alt: "Laguna", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: "Parqueo.avif", alt: "Valle y Parqueo", colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
];

const GallerySection = () => {
  return (
    <section className="bg-neo-bg dark:bg-black py-24 px-6 overflow-hidden">
       <div className="max-w-[1600px] mx-auto">
            
            {/* Kinetic Typography Header */}
            <div className="mb-16 relative">
                 <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="flex flex-col md:flex-row items-baseline gap-4"
                 >
                    <h2 className="text-6xl md:text-9xl font-display font-black uppercase dark:text-neo-mint leading-[0.85] tracking-tighter">
                        Galería
                    </h2>
                    <span className="font-mono text-sm md:text-xl font-bold bg-black text-white dark:bg-neo-yellow dark:text-black px-4 py-2 -skew-x-12 border-2 border-transparent dark:border-neo-mint">
                        EXPEDICIÓN_VISUAL
                    </span>
                 </motion.div>

                 {/* Decorative Marquee Line */}
                 <div className="w-full h-[2px] bg-black dark:bg-neo-mint mt-4 overflow-hidden flex">
                    <motion.div
                        className="whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest px-4"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        // EXPLORA // DESCUBRE // VIVE // LA MUELA DEL DIABLO // 2026 // VISUAL_LOG // EXPLORA // DESCUBRE // VIVE // LA MUELA DEL DIABLO // 2026 // VISUAL_LOG //
                    </motion.div>
                 </div>
            </div>

            {/* Bento Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className={`relative rounded-none border-2 border-black dark:border-neo-mint shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#A8E6CF] group overflow-hidden bg-white dark:bg-zinc-900 ${img.colSpan} ${img.rowSpan}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <img
                            src={getPath(img.src)}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale hover:grayscale-0"
                            loading="lazy"
                        />

                        {/* Overlay with Neo-Brutalist Label */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block bg-white dark:bg-black border-2 border-black dark:border-neo-mint px-3 py-1 text-sm font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#A8E6CF] dark:text-neo-mint">
                                    {img.alt}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

       </div>
    </section>
  );
};

export default GallerySection;
