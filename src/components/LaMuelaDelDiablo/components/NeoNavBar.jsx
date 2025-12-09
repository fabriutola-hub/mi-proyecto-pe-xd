import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Camera, Box } from 'lucide-react';
import NeoButton from '@/components/ui/NeoButton';

const menuItems = [
  { name: "Inicio", icon: Home, ref: "heroRef" },
  { name: "Historia", icon: Box, ref: "historyRef" },
  { name: "Experiencias", icon: Camera, ref: "visitsRef" },
  { name: "Mapa", icon: Map, ref: "mapRef" }
];

const NeoNavBar = ({ scrollToSection, refs }) => {
  const [activeTab, setActiveTab] = useState("Inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Check initial dark mode
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavClick = (item) => {
    setActiveTab(item.name);
    if (refs && item.ref && refs[item.ref]) {
      scrollToSection(refs[item.ref]);
    }
  };

  return (
    <>
      {/* --- DESKTOP HEADER (Top) --- */}
      <motion.header
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-8 py-4 transition-all duration-300 ${
            isScrolled ? "bg-neo-bg/90 dark:bg-black/90 backdrop-blur-md border-b-2 border-black dark:border-neo-mint" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div
            className="flex flex-col cursor-pointer group"
            onClick={() => refs?.heroRef ? scrollToSection(refs.heroRef) : window.scrollTo(0,0)}
        >
          <h1 className="text-2xl font-display font-black tracking-tighter leading-none group-hover:text-neo-blue dark:group-hover:text-neo-mint transition-colors dark:text-white">
            LA MUELA
          </h1>
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase dark:text-gray-400">Del Diablo</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-2 py-1.5 border-2 border-black dark:border-neo-mint shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#A8E6CF]">
            {menuItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`px-4 py-2 text-sm font-bold font-display uppercase transition-all ${
                        activeTab === item.name
                        ? "bg-black text-white dark:bg-neo-mint dark:text-black shadow-none"
                        : "hover:bg-neo-bg dark:hover:bg-zinc-800 text-black dark:text-white"
                    }`}
                >
                    {item.name}
                </button>
            ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-neo-mint bg-white dark:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#A8E6CF] active:translate-y-1 active:shadow-none transition-all">
                {isDark ? '☀️' : '🌙'}
            </button>
            <NeoButton size="sm" variant="accent" onClick={() => setShowQR(true)}>
                App
            </NeoButton>
        </div>
      </motion.header>


      {/* --- MOBILE BOTTOM BAR (Bottom) --- */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <nav className="flex items-center justify-between bg-white dark:bg-black border-2 border-black dark:border-neo-mint px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#A8E6CF]">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                    <button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className={`flex flex-col items-center justify-center w-full gap-1 transition-all ${
                            isActive ? "text-neo-blue dark:text-neo-mint scale-110" : "text-black/60 dark:text-white/60"
                        }`}
                    >
                        <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                        <span className="text-[10px] font-bold uppercase">{item.name}</span>
                    </button>
                );
            })}
             {/* Mobile Theme Toggle */}
             <div className="border-l-2 border-black/10 dark:border-white/10 pl-4 ml-1">
                 <button onClick={toggleTheme} className="text-xl">
                    {isDark ? '☀️' : '🌙'}
                 </button>
             </div>
        </nav>
      </div>

       {/* ================= MODAL QR (Transferred from HeroSection) ================= */}
       <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)} // Cierra al hacer click fuera
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Evita cierre al clickear dentro
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              {/* Botón Cerrar X */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <h3 className="text-2xl font-poppins font-bold text-white mb-2">Descarga la App</h3>
              <p className="text-white/60 text-sm mb-6 font-montserrat">Escanea el código para vivir la experiencia completa en Android.</p>

              {/* Contenedor del QR */}
              <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 mb-6 flex items-center justify-center">
                <img
                  src="/imagenes/QRPEE.png"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs text-orange-500 font-mono uppercase tracking-widest">Versión 1.0 Beta</p>
                <button
                    onClick={() => setShowQR(false)}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm font-semibold"
                >
                    Cerrar Ventana
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeoNavBar;
