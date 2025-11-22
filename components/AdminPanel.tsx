import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { X, Plus, Edit2, Trash2, Save, RotateCcw, Lock, LogIn, Image, DollarSign, Calendar, Tag, Type, User } from 'lucide-react';
import { Book } from '../src/types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { books, addBook, updateBook, deleteBook, resetDatabase } = useBooks();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Inventory Management State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const initialFormState = {
    title: '',
    author: '',
    priceValue: 0,
    category: '',
    year: new Date().getFullYear(),
    coverUrl: 'https://picsum.photos/300/450',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Reset auth error when opening
  useEffect(() => {
      if (isOpen) {
          setAuthError(false);
          setPasswordInput('');
      }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      // Hardcoded password for demo purposes
      if (passwordInput === 'admin123') {
          setIsAuthenticated(true);
          setAuthError(false);
      } else {
          setAuthError(true);
      }
  };

  const handleClose = () => {
      onClose();
      // Optional: Reset auth on close if strict security is needed
      // setIsAuthenticated(false); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      price: `Bs. ${formData.priceValue}`,
    };

    if (editingId) {
      updateBook({ ...bookData, id: editingId, price: `Bs. ${formData.priceValue}` });
      setEditingId(null);
    } else {
      addBook(bookData);
      setIsAdding(false);
    }
    setFormData(initialFormState);
  };

  const startEdit = (book: Book) => {
    setEditingId(book.id);
    setIsAdding(false);
    setFormData({
      title: book.title,
      author: book.author,
      priceValue: book.priceValue,
      category: book.category,
      year: book.year,
      coverUrl: book.coverUrl,
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(initialFormState);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(initialFormState);
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-green/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-white/20">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-terracotta transition-colors">
                    <X size={24} />
                </button>
                
                <div className="p-8 md:p-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-forest-green/5 rounded-full flex items-center justify-center text-forest-green mb-6">
                        <Lock size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-forest-green mb-2">Acceso Restringido</h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Esta área es solo para administradores de <br/> The Roaming Reader.
                    </p>
                    
                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <div className="relative group">
                            <input 
                                type="password" 
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Ingrese contraseña..."
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all text-forest-green placeholder-gray-400 text-center tracking-widest"
                                autoFocus
                            />
                        </div>
                        
                        {authError && (
                            <div className="text-red-500 text-xs font-medium bg-red-50 py-2 rounded-lg border border-red-100 animate-in slide-in-from-top-2">
                                Contraseña incorrecta. Intente 'admin123'
                            </div>
                        )}
                        
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-forest-green text-white font-bold rounded-xl hover:bg-forest-green/90 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-forest-green/20"
                        >
                            <LogIn size={18} /> Ingresar al Panel
                        </button>
                    </form>
                </div>
            </div>
        </div>
      );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-cream w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20">
        
        {/* Header */}
        <div className="bg-forest-green text-cream p-5 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Edit2 size={20} className="text-terracotta" />
              </div>
              <div>
                <h2 className="text-xl font-bold leading-none">Gestión de Catálogo</h2>
                <p className="text-xs text-cream/60 mt-1">Inventario Activo: {books.length} libros</p>
              </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={resetDatabase}
                className="text-xs bg-terracotta/20 hover:bg-terracotta hover:text-white text-terracotta px-3 py-2 rounded-lg transition-all flex items-center gap-2 border border-terracotta/30"
                title="Restaurar datos originales"
             >
                <RotateCcw size={14} /> <span className="hidden sm:inline">Resetear BD</span>
             </button>
             <div className="h-6 w-px bg-cream/20 mx-1"></div>
             <button onClick={handleClose} className="hover:text-terracotta transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                <X size={20} />
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-stone-100/50 p-6">
          
          {/* Toolbar */}
          {!isAdding && !editingId && (
            <div className="flex justify-between items-center mb-8">
                <button 
                onClick={startAdd}
                className="group flex items-center gap-3 bg-forest-green text-white pl-4 pr-6 py-3 rounded-xl hover:bg-terracotta transition-all shadow-lg shadow-forest-green/20 hover:shadow-terracotta/30"
                >
                <div className="bg-white/20 rounded-full p-1 group-hover:scale-110 transition-transform">
                    <Plus size={18} /> 
                </div>
                <span className="font-semibold">Agregar Nuevo Libro</span>
                </button>
            </div>
          )}

          {/* ADD / EDIT FORM */}
          {(isAdding || editingId) && (
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100 animate-in slide-in-from-top-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-green to-terracotta"></div>
              
              <h3 className="font-bold text-2xl text-forest-green mb-6 flex items-center gap-2">
                {editingId ? 'Editar Libro' : 'Nuevo Libro'}
                <span className="text-sm font-normal text-gray-400 ml-2 bg-gray-100 px-2 py-1 rounded-md">
                    {editingId ? `ID: ${editingId}` : 'Borrador'}
                </span>
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Title */}
                <div className="md:col-span-6 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Type size={14} /> Título
                    </label>
                    <input 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                        placeholder="Ej: Cien Años de Soledad"
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                {/* Author */}
                <div className="md:col-span-6 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <User size={14} /> Autor
                    </label>
                    <input 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                        placeholder="Ej: Gabriel García Márquez"
                        value={formData.author} 
                        onChange={e => setFormData({...formData, author: e.target.value})}
                    />
                </div>

                {/* Category */}
                <div className="md:col-span-4 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Tag size={14} /> Categoría
                    </label>
                    <input 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                        placeholder="Ej: Realismo Mágico"
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                    />
                </div>

                {/* Price */}
                <div className="md:col-span-4 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <DollarSign size={14} /> Precio (Bs)
                    </label>
                    <div className="relative">
                        <input 
                            type="number" 
                            required 
                            className="w-full px-4 py-3 pl-8 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 font-bold focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                            value={formData.priceValue} 
                            onChange={e => setFormData({...formData, priceValue: Number(e.target.value)})}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Bs</span>
                    </div>
                </div>

                {/* Year */}
                <div className="md:col-span-4 space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={14} /> Año
                    </label>
                    <input 
                        type="number" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                        value={formData.year} 
                        onChange={e => setFormData({...formData, year: Number(e.target.value)})}
                    />
                </div>

                {/* Cover URL */}
                <div className="md:col-span-12 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Image size={14} /> URL de Portada
                    </label>
                    <input 
                        placeholder="https://..." 
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm font-mono focus:bg-white focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all outline-none"
                        value={formData.coverUrl} 
                        onChange={e => setFormData({...formData, coverUrl: e.target.value})}
                    />
                </div>
                
                {/* Actions */}
                <div className="md:col-span-12 flex gap-4 mt-4 pt-4 border-t border-gray-100">
                  <button type="submit" className="bg-terracotta text-white px-8 py-3 rounded-xl font-bold hover:bg-terracotta/90 transition-colors flex items-center gap-2 shadow-lg shadow-terracotta/20">
                    <Save size={18} /> Guardar Libro
                  </button>
                  <button type="button" onClick={cancelEdit} className="px-8 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BOOK LIST */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-5 font-semibold">Info</th>
                  <th className="p-5 font-semibold hidden md:table-cell">Categoría</th>
                  <th className="p-5 font-semibold text-right">Precio</th>
                  <th className="p-5 font-semibold text-center w-24">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="p-4">
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0 shadow-sm">
                                <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <div className="font-bold text-forest-green text-sm md:text-base">{book.title}</div>
                                <div className="text-xs md:text-sm text-gray-500">{book.author} • {book.year}</div>
                             </div>
                        </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                        <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full border border-stone-200">
                            {book.category}
                        </span>
                    </td>
                    <td className="p-4 text-right font-mono font-medium text-gray-700">
                        {book.price}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => startEdit(book)}
                            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" 
                            title="Editar"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                            onClick={() => { if(window.confirm(`¿Estás seguro de eliminar "${book.title}"?`)) deleteBook(book.id); }}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" 
                            title="Eliminar"
                        >
                            <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {books.length === 0 && (
               <div className="p-16 text-center">
                   <div className="inline-flex p-4 bg-stone-100 rounded-full text-stone-400 mb-4">
                       <Type size={32} />
                   </div>
                   <h3 className="text-lg font-bold text-gray-600">Tu inventario está vacío</h3>
                   <p className="text-gray-400 text-sm mt-1">Agrega libros para comenzar a vender.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;