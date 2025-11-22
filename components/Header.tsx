import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { NAV_ITEMS } from '../src/constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-2xl font-bold tracking-tight text-forest-green cursor-pointer"
          >
            The Roaming Reader<span className="text-terracotta">.</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-off-black hover:text-terracotta transition-colors relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-off-black hover:text-terracotta transition-colors" title="Mi Cuenta">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button className="relative text-off-black hover:text-terracotta transition-colors group" title="Carrito">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-forest-green text-cream text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full group-hover:bg-terracotta transition-colors">
              2
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-off-black focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-t border-gray-200 shadow-lg flex flex-col py-4 px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="py-3 text-lg font-medium text-off-black hover:text-terracotta border-b border-gray-100 last:border-0 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <div className="flex space-x-6 mt-6 pt-4 border-t border-gray-200">
             <button className="flex items-center space-x-2 text-sm font-medium">
                <User size={18} /> <span>Cuenta</span>
             </button>
             <button className="flex items-center space-x-2 text-sm font-medium">
                <ShoppingBag size={18} /> <span>Carrito (2)</span>
             </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;