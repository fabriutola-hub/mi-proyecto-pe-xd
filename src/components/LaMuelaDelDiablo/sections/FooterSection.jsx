import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FooterSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const contactInView = useInView(ref, inViewConfig);

  const footerLinks = {
    experiences: ["Trekking", "Cultura", "Fotografía"],
    info: ["FAQ", "Blog", "Seguridad", "Contacto"],
    social: [
      { icon: "FB", label: "Facebook", url: "#" },
      { icon: "IG", label: "Instagram", url: "#" },
      { icon: "TW", label: "Twitter", url: "#" }
    ]
  };

  return (
    <footer ref={ref} className="py-20 bg-neo-black border-t border-neo-black/10 relative overflow-hidden text-neo-white">

      {/* Big Typo Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] whitespace-nowrap">
        <span className="text-[20vw] font-heading font-black leading-none">LA PAZ</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="md:col-span-1"
          >
            <div className="text-2xl font-heading font-black mb-6 tracking-tight uppercase">LA MUELA DEL DIABLO</div>
            <p className="text-neo-white/60 text-sm font-body leading-relaxed max-w-xs">
              Descubre el ícono geológico de Bolivia. Una experiencia natural única a 3,650 metros sobre el nivel del mar.
            </p>
          </motion.div>
          
          {/* Experiencias */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <h3 className="text-xs font-bold text-neo-orange uppercase tracking-widest mb-6">
              Experiencias
            </h3>
            <ul className="space-y-3">
              {footerLinks.experiences.map(item => (
                <motion.li key={item} whileHover={{ x: 3 }}>
                  <a 
                    href="#" 
                    className="text-neo-white/80 hover:text-white text-sm transition-colors uppercase tracking-wide"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Información */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-xs font-bold text-neo-orange uppercase tracking-widest mb-6">
              Información
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map(item => (
                <motion.li key={item} whileHover={{ x: 3 }}>
                  <a 
                    href="#" 
                    className="text-neo-white/80 hover:text-white text-sm transition-colors uppercase tracking-wide"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h3 className="text-xs font-bold text-neo-orange uppercase tracking-widest mb-6">
              Síguenos
            </h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.url}
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-neo-white/10 hover:bg-neo-white hover:text-neo-black border border-white/10 flex items-center justify-center text-xs font-bold uppercase transition-all rounded-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="pt-8 border-t border-neo-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <span className="text-neo-white/40 text-[10px] font-mono font-bold uppercase tracking-widest">
            © 2025 La Muela del Diablo.
          </span>
          <span className="text-neo-white/60 text-[10px] font-mono font-bold uppercase tracking-widest">
            Diseñado con ❤️ en Bolivia
          </span>
        </motion.div>
      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
