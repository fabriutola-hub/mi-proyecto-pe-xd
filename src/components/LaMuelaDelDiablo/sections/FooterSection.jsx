import { forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FooterSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px" };
  const contactInView = useInView(ref, inViewConfig);

  const footerLinks = {
    expeditions: ["Route Map", "Gear Guide", "Safety Protocols"],
    project: ["About Vision 2025", "Geology Research", "Contact Team"],
    social: [
      { label: "IG", url: "#" },
      { label: "TW", url: "#" },
      { label: "YT", url: "#" }
    ]
  };

  return (
    <footer ref={ref} className="py-20 bg-basalt border-t border-slate text-granite font-mono text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="col-span-1"
          >
            <div className="font-display font-black text-2xl text-white uppercase tracking-tighter mb-4">
              La Muela<br/>
              <span className="text-neon-lichen">Del Diablo</span>
            </div>
            <p className="leading-relaxed text-xs max-w-[200px]">
              The geological icon of Bolivia. <br/>
              3650 MASL.
            </p>
          </motion.div>
          
          {/* Columns */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <h3 className="font-bold text-white uppercase tracking-wider mb-6 text-xs">
              Expeditions
            </h3>
            <ul className="space-y-3">
              {footerLinks.expeditions.map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-neon-lichen transition-colors block w-fit">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="font-bold text-white uppercase tracking-wider mb-6 text-xs">
              Project
            </h3>
            <ul className="space-y-3">
              {footerLinks.project.map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-neon-lichen transition-colors block w-fit">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Social Text Links (Minimalist) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h3 className="font-bold text-white uppercase tracking-wider mb-6 text-xs">
              Connect
            </h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social, i) => (
                <a
                  key={i} 
                  href={social.url}
                  className="w-10 h-10 border border-slate flex items-center justify-center hover:bg-neon-lichen hover:text-basalt hover:border-neon-lichen transition-all rounded-none font-bold text-xs"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-slate flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
            <span>© 2025 La Muela Project.</span>
            <span>La Paz, Bolivia</span>
        </div>
      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
