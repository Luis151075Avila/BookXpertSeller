import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with dynamic cropping */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://picsum.photos/id/225/2500/1600" 
                alt="Vintage turquoise van parked in a sunny park" 
                className="w-full h-full object-cover object-center filter brightness-90 scale-105"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-2xl">
                <div className="inline-block px-3 py-1 mb-6 border border-forest-green/30 rounded-full bg-cream/50 backdrop-blur-sm">
                    <span className="text-xs font-bold tracking-widest uppercase text-forest-green">Est. 2023</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-forest-green leading-[1.1] mb-6">
                    Historias <br/>
                    <span className="text-terracotta italic serif-text font-light">En Movimiento.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-lg">
                    Llevamos literatura seleccionada a tu vecindario. Una librería itinerante para mentes viajeras en Sucre.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                        href="#route" 
                        onClick={(e) => scrollToSection(e, 'route')}
                        className="px-8 py-4 bg-forest-green text-cream font-semibold text-sm tracking-wide rounded shadow-lg hover:bg-forest-green/90 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                    >
                        Ver Horarios
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                        href="#shop" 
                        onClick={(e) => scrollToSection(e, 'shop')}
                        className="px-8 py-4 bg-white text-forest-green border border-forest-green font-semibold text-sm tracking-wide rounded shadow-sm hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    >
                        Explorar Catálogo
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;