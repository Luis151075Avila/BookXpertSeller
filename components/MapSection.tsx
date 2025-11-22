import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { ROUTE_SCHEDULE } from '../constants';

const MapSection: React.FC = () => {
  return (
    <section id="route" className="py-24 bg-white relative overflow-hidden scroll-mt-28">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#2C3E30" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Content Side */}
                <div className="lg:w-1/3 flex flex-col justify-center">
                    <h4 className="text-brass font-bold text-sm tracking-widest uppercase mb-2">Encuentra Nuestra Ruta</h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-6">Dónde Encontrarnos en Sucre</h2>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        Seguimos el sol y el buen café. Revisa nuestro calendario para saber dónde estacionará The Roaming Reader próximamente en la Ciudad Blanca.
                    </p>
                    
                    <div className="space-y-6">
                        {ROUTE_SCHEDULE.map((stop) => (
                            <div key={stop.id} className={`flex gap-4 p-4 rounded-lg transition-all ${!stop.isPast ? 'bg-cream border border-forest-green/10 hover:border-terracotta/30' : 'opacity-50'}`}>
                                <div className="flex-shrink-0 mt-1">
                                    <div className={`w-3 h-3 rounded-full ${!stop.isPast ? 'bg-terracotta animate-pulse' : 'bg-gray-300'}`}></div>
                                </div>
                                <div>
                                    <h5 className="font-bold text-forest-green text-lg">{stop.location}</h5>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {stop.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {stop.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 text-forest-green font-bold underline decoration-terracotta decoration-2 underline-offset-4 hover:text-terracotta transition-colors self-start">
                        Ver Itinerario Completo
                    </button>
                </div>

                {/* Visual Map Side */}
                <div className="lg:w-2/3 min-h-[500px] bg-stone-100 rounded-2xl relative overflow-hidden shadow-inner border border-stone-200 group">
                   {/* Abstract Map Design */}
                   <div className="absolute inset-0">
                        {/* Roads/Paths */}
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M -10 20 Q 30 10 50 50 T 110 80" fill="none" stroke="#E5E5E5" strokeWidth="3" />
                            <path d="M 20 100 Q 40 60 80 40" fill="none" stroke="#E5E5E5" strokeWidth="3" />
                            <path d="M 20 30 C 45 55, 45 55, 75 40 C 75 40, 60 80, 60 80" fill="none" stroke="#C8553D" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
                        </svg>
                   </div>

                   {/* Pins */}
                   {ROUTE_SCHEDULE.map((stop) => (
                       <div 
                            key={stop.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-50 transition-all duration-300 hover:scale-110"
                            style={{ left: `${stop.coordinates.x}%`, top: `${stop.coordinates.y}%` }}
                        >
                            <div className={`relative flex flex-col items-center ${stop.isPast ? 'opacity-50 grayscale' : ''}`}>
                                <MapPin 
                                    size={40} 
                                    className={`${stop.isPast ? 'text-gray-400' : 'text-forest-green drop-shadow-lg'}`} 
                                    fill={stop.isPast ? '#e5e5e5' : '#F9F7F2'}
                                />
                                {!stop.isPast && (
                                    <div className="absolute bottom-full mb-2 w-32 bg-white p-2 rounded shadow-lg text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <span className="font-bold block text-forest-green">{stop.location}</span>
                                        <span className="text-terracotta">{stop.date}</span>
                                        {/* Little Triangle */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
                                    </div>
                                )}
                            </div>
                       </div>
                   ))}
                   
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-md shadow-sm border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mapa Interactivo • Sucre</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default MapSection;