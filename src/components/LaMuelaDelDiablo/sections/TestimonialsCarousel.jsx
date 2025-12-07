import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../ui/Section';
import { Card } from '../../ui/Card';
import { Star } from 'lucide-react';

const TestimonialsSection = forwardRef((props, ref) => {
  const testimonials = [
    {
      name: "Ana Morales",
      location: "La Paz, Bolivia",
      rating: 5,
      text: "Una experiencia inolvidable. La caminata es exigente pero las vistas valen cada paso. Ver la ciudad desde arriba es mágico.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Carlos Rivera",
      location: "Lima, Perú",
      rating: 5,
      text: "El lugar tiene una energía especial. Fui al atardecer y los colores de las montañas son increíbles. Muy recomendado.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Jenkins",
      location: "London, UK",
      rating: 4,
      text: "Great hiking spot close to the city. The rock formation is unique. Make sure to bring water and sunscreen!",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <Section ref={ref} id="testimonials" className="bg-diablo-dark text-white">
      <div className="text-center mb-16">
        <span className="text-diablo-volcano font-mono text-sm tracking-widest uppercase block mb-4">
          Voces de Aventureros
        </span>
        <h2 className="text-4xl md:text-5xl font-display text-white">
          Experiencias Reales
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((test, idx) => (
          <Card key={idx} delay={idx * 0.1} className="flex flex-col h-full bg-white/5 border-white/10 hover:border-diablo-volcano/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-diablo-volcano">
                <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold font-display text-lg">{test.name}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{test.location}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4 text-diablo-accent">
              {[...Array(test.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="text-gray-300 font-light italic flex-grow leading-relaxed">
              "{test.text}"
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
