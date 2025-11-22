import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BookContext';
import { Plus, Search, Filter, X, QrCode } from 'lucide-react';

const FeaturedBooks: React.FC = () => {
  const { books } = useBooks(); // Consume dynamic data

  // State for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState<number>(300); // Increased default range
  const [minYear, setMinYear] = useState<number>(1900);
  
  // State for QR Modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedBookForPayment, setSelectedBookForPayment] = useState<string | null>(null);

  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
      const cats = new Set(books.map(b => b.category));
      return ['Todos', ...Array.from(cats)];
  }, [books]);

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'Todos' || book.category === selectedCategory;
        const matchesPrice = book.priceValue <= maxPrice;
        const matchesYear = book.year >= minYear;

        return matchesSearch && matchesCategory && matchesPrice && matchesYear;
    });
  }, [books, searchQuery, selectedCategory, maxPrice, minYear]);

  const handleBuyClick = (bookTitle: string) => {
      setSelectedBookForPayment(bookTitle);
      setIsQrModalOpen(true);
  };

  return (
    <section id="shop" className="py-24 bg-cream relative scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-12">
            
            {/* Header Section */}
            <div className="mb-12">
                <h4 className="text-terracotta font-bold text-sm tracking-widest uppercase mb-2">Nuestra Colección</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-forest-green">Encuentra Tu Próxima Lectura</h2>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Search Input */}
                    <div className="md:col-span-4 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar título, autor o género..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors text-sm"
                        />
                    </div>

                    {/* Category Select */}
                    <div className="md:col-span-3">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white text-sm text-gray-700"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Slider */}
                    <div className="md:col-span-3 flex flex-col justify-center">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Precio Máx:</span>
                            <span className="font-bold text-forest-green">Bs. {maxPrice}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="300" 
                            step="10"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-terracotta"
                        />
                    </div>

                    {/* Year Select */}
                     <div className="md:col-span-2">
                        <select 
                            value={minYear}
                            onChange={(e) => setMinYear(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white text-sm text-gray-700"
                        >
                            <option value={1900}>Cualquier Año</option>
                            <option value={2000}>Desde 2000</option>
                            <option value={2010}>Desde 2010</option>
                            <option value={2020}>Desde 2020</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Book Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="group relative flex flex-col">
                            {/* Book Cover Container */}
                            <div className="relative aspect-[2/3] w-full mb-6 cursor-pointer perspective-1000">
                                <div className="absolute inset-0 bg-gray-200 rounded-sm shadow-book transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-book-hover overflow-hidden">
                                    <img 
                                        src={book.coverUrl} 
                                        alt={book.title} 
                                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                
                                {/* Buy / QR Button Overlay */}
                                <button 
                                    onClick={() => handleBuyClick(book.title)}
                                    className="absolute bottom-4 right-4 bg-white text-forest-green px-4 py-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-terracotta hover:text-white flex items-center gap-2 font-bold text-xs"
                                >
                                    <QrCode size={16} /> Comprar
                                </button>
                            </div>

                            {/* Info */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-xs text-terracotta font-medium">{book.category}</p>
                                    <p className="text-xs text-gray-400">{book.year}</p>
                                </div>
                                <h3 className="text-lg font-bold text-forest-green leading-tight group-hover:text-terracotta transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-500 serif-text italic">{book.author}</p>
                                <p className="text-sm font-semibold text-off-black mt-2">{book.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 opacity-50">
                    <Filter size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-xl font-medium text-gray-500">No encontramos libros con esos filtros.</p>
                    <button 
                        onClick={() => {setSearchQuery(''); setSelectedCategory('Todos'); setMaxPrice(300); setMinYear(1900);}}
                        className="mt-4 text-terracotta underline hover:text-forest-green"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            )}
        </div>

        {/* QR Payment Modal */}
        {isQrModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-green/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative">
                    <button 
                        onClick={() => setIsQrModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-forest-green"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto text-terracotta mb-2">
                            <QrCode size={32} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-forest-green">Pago con QR Simple</h3>
                        <p className="text-sm text-gray-600">
                            Escanea el código para comprar <br/>
                            <span className="font-semibold text-forest-green italic">"{selectedBookForPayment}"</span>
                        </p>
                        
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 my-6 inline-block">
                             <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PaymentFor-${encodeURIComponent(selectedBookForPayment || '')}`} 
                                alt="QR Code for Payment" 
                                className="w-48 h-48"
                             />
                        </div>

                        <p className="text-xs text-gray-400">
                            Aceptamos transferencias de todos los bancos de Bolivia. Envie su boucher al whatsapp 71160321
                        </p>
                        
                        <button 
                            onClick={() => setIsQrModalOpen(false)}
                            className="w-full py-3 bg-forest-green text-white rounded-lg font-bold hover:bg-forest-green/90 transition-colors"
                        >
                            Hecho
                        </button>
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

export default FeaturedBooks;
