import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedBooks from './components/FeaturedBooks';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import { BookProvider } from './context/BookContext';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BookProvider>
      <div className="min-h-screen flex flex-col selection:bg-terracotta selection:text-white">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <FeaturedBooks />
          <MapSection />
        </main>
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </BookProvider>
  );
}

export default App;
