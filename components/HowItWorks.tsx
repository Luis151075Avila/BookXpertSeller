import React from 'react';
import { Truck, Search, BookOpen } from 'lucide-react';

const steps = [
    {
        icon: Truck,
        title: "Viajamos",
        description: "Nuestra van vintage recorre la ciudad, llevando historias a parques y plazas cerca de ti."
    },
    {
        icon: Search,
        title: "Exploras",
        description: "Sube a bordo o explora nuestros exhibidores. Una selección curada espera tu descubrimiento."
    },
    {
        icon: BookOpen,
        title: "Lees y Disfrutas",
        description: "Encuentra tu próxima aventura favorita, disfruta la lectura y encuéntranos en nuestra próxima parada."
    }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="about" className="bg-forest-green/5 py-16 border-b border-forest-green/10 scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center group cursor-default">
                        <div className="w-16 h-16 rounded-full bg-cream border border-forest-green/20 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-terracotta/50 transition-all duration-300">
                            <step.icon className="text-forest-green group-hover:text-terracotta transition-colors duration-300" size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-forest-green mb-3">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default HowItWorks;