import React from 'react';
import { Instagram, Facebook, Twitter, Mail, QrCode, Database } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-forest-green text-cream pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-cream/10 pb-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
                <h3 className="text-2xl font-bold mb-6">The Roaming Reader<span className="text-terracotta">.</span></h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-6">
                    Una librería móvil dedicada a encontrar la historia perfecta para tu viaje.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-terracotta transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="hover:text-terracotta transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="hover:text-terracotta transition-colors"><Twitter size={20} /></a>
                </div>
            </div>

            {/* Links */}
            <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-brass">Explorar</h4>
                <ul className="space-y-3 text-sm text-cream/80">
                    <li><a href="#" className="hover:text-white transition-colors">Nuestra Historia</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">La Flota</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Eventos Privados</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Club de Lectura</a></li>
                </ul>
            </div>

             <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-brass">Ayuda</h4>
                <ul className="space-y-3 text-sm text-cream/80">
                    <li><a href="#" className="hover:text-white transition-colors">Contáctanos</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Política de Devolución</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Accesibilidad</a></li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-brass">Mantente al tanto</h4>
                <p className="text-xs text-cream/60 mb-4">Recibe actualizaciones de ruta y recomendaciones.</p>
                <div className="flex mb-6">
                    <input 
                        type="email" 
                        placeholder="Tu correo electrónico" 
                        className="bg-forest-green border-b border-cream/30 text-white placeholder-cream/40 py-2 px-0 w-full focus:outline-none focus:border-terracotta text-sm transition-colors"
                    />
                    <button className="text-cream hover:text-terracotta ml-2">
                        <Mail size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-2 text-cream/50 text-xs">
                    <QrCode size={14} />
                    <span>Aceptamos pagos QR Simple</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-cream/40">
            <p>&copy; 2023 The Roaming Reader. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 items-center">
                <button onClick={onOpenAdmin} className="hover:text-terracotta flex items-center gap-1">
                  <Database size={12} /> Admin
                </button>
                <a href="#" className="hover:text-cream">Privacidad</a>
                <a href="#" className="hover:text-cream">Términos</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
