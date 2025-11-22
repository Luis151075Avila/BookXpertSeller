import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../src/types';
import { FEATURED_BOOKS } from '../src/constants';

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: number) => void;
  resetDatabase: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or fallback to constants
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('roamingReader_inventory');
    return savedBooks ? JSON.parse(savedBooks) : FEATURED_BOOKS;
  });

  // Persist to LocalStorage whenever books change
  useEffect(() => {
    localStorage.setItem('roamingReader_inventory', JSON.stringify(books));
  }, [books]);

  const addBook = (newBookData: Omit<Book, 'id'>) => {
    const newId = Math.max(...books.map(b => b.id), 0) + 1;
    const newBook = { ...newBookData, id: newId };
    setBooks([...books, newBook]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map(b => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const resetDatabase = () => {
    if (window.confirm('¿Estás seguro? Esto borrará tus cambios y restaurará el catálogo original.')) {
      setBooks(FEATURED_BOOKS);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, resetDatabase }}>
      {children}
    </BookContext.Provider>
  );
};
