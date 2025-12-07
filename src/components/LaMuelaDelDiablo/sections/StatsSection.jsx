import { forwardRef } from 'react';
import { useInView } from 'framer-motion';
import StatCounter from '../components/StatCounter';

const StatsSection = forwardRef((props, ref) => {
  const inViewConfig = { once: true, margin: "-50px", amount: 0.1 };
  const statsInView = useInView(ref, inViewConfig);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neo-sand text-neo-black overflow-hidden relative border-b border-neo-black/10">

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(#2D2420 1px, transparent 1px), linear-gradient(90deg, #2D2420 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <span className="font-mono text-xs font-bold tracking-widest text-neo-orange uppercase mb-2 block">
                    Estadísticas
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-neo-black tracking-tight leading-none">
                    DATOS DE <br/><span className="italic font-serif">LA REGIÓN</span>
                </h2>
             </div>
             <p className="max-w-md text-sm font-body text-neo-black/70 leading-relaxed">
                 Cifras que definen la magnitud de esta formación geológica, un punto de referencia para aventureros y locales.
             </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neo-black/10 pt-16">
          <StatCounter 
            target={3650} 
            label="Metros de Altura" 
            suffix="m" 
            inView={statsInView} 
            delay={0}
          />
          <StatCounter 
            target={10000} 
            label="Visitantes Anuales" 
            suffix="+" 
            inView={statsInView} 
            delay={0.1}
          />
          <StatCounter 
            target={1950} 
            label="Primera Ascensión" 
            suffix="" 
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
