import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const FooterSection = forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-diablo-dark border-t border-white/5 pt-20 pb-10">

      {/* Pre-Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
          ¿Listo para la Aventura?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-light">
          Reserva tu tour guiado o contáctanos para más información sobre cómo vivir la experiencia de la Muela del Diablo.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn-primary">
            Reservar Tour
          </button>
          <button className="btn-secondary">
            Contactar por WhatsApp
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/5 pt-16">
        
        {/* Brand Column */}
        <div>
          <div className="flex flex-col mb-6">
            <span className="text-2xl font-display font-bold text-white leading-none tracking-wide">LA MUELA</span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-diablo-volcano uppercase">Del Diablo</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Descubre el ícono geológico de Bolivia. Una experiencia inolvidable en el corazón de los Andes.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Explorar</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-diablo-volcano transition-colors">Tours Guiados</a></li>
            <li><a href="#" className="hover:text-diablo-volcano transition-colors">Mapa Interactivo</a></li>
            <li><a href="#" className="hover:text-diablo-volcano transition-colors">Galería 360°</a></li>
            <li><a href="#" className="hover:text-diablo-volcano transition-colors">Historia</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Contacto</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-diablo-volcano shrink-0" />
              <span>Zona Sur, La Paz, Bolivia<br/>A 30 min de Calacoto</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-diablo-volcano shrink-0" />
              <a href="mailto:info@lamuela.bo" className="hover:text-white">info@lamuela.bo</a>
            </li>
             <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-diablo-volcano shrink-0" />
              <a href="tel:+59112345678" className="hover:text-white">+591 123 45678</a>
            </li>
          </ul>
        </div>

        {/* Legal/Newsletter Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-400 mb-8">
            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
          </ul>
          <p className="text-xs text-gray-600">
            © 2025 La Muela del Diablo. <br/>Diseñado en Bolivia.
          </p>
        </div>

      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
