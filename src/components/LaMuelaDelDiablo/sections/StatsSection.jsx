import { forwardRef } from 'react';
import { useInView } from 'framer-motion';
import StatCounter from '../components/StatCounter';
import { BentoGrid } from '@/components/ui/BentoGrid';

const StatsSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-100px" };
  const statsInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="bg-basalt border-t border-slate py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCounter 
            target={3650} 
            label="Meters Elevation"
            suffix="m" 
            inView={statsInView} 
            delay={0} 
          />
          <StatCounter 
            target={2025}
            label="Vision Year"
            suffix=""
            inView={statsInView} 
            delay={0.1}
          />
          <StatCounter 
            target={100}
            label="Adventure Grade"
            suffix="%"
            inView={statsInView} 
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
