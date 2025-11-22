import { Book, Stop, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nuestra Ruta', href: '#route' },
  { label: 'Catálogo', href: '#shop' },
  { label: 'Eventos', href: '#route' },
  { label: 'Nosotros', href: '#about' },
];

export const FEATURED_BOOKS: Book[] = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: "Bs. 120",
    priceValue: 120,
    category: "Ficción",
    year: 1967,
    coverUrl: "https://picsum.photos/300/450?random=10"
  },
  {
    id: 2,
    title: "La casa de los espíritus",
    author: "Isabel Allende",
    price: "Bs. 105",
    priceValue: 105,
    category: "Realismo Mágico",
    year: 1982,
    coverUrl: "https://picsum.photos/300/450?random=11"
  },
  {
    id: 3,
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    price: "Bs. 45",
    priceValue: 45,
    category: "Infantil",
    year: 1943,
    coverUrl: "https://picsum.photos/300/450?random=12"
  },
  {
    id: 4,
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    price: "Bs. 180",
    priceValue: 180,
    category: "Historia",
    year: 2011,
    coverUrl: "https://picsum.photos/300/450?random=13"
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    price: "Bs. 85",
    priceValue: 85,
    category: "Ciencia Ficción",
    year: 1949,
    coverUrl: "https://picsum.photos/300/450?random=14"
  },
  {
    id: 6,
    title: "Hábitos Atómicos",
    author: "James Clear",
    price: "Bs. 150",
    priceValue: 150,
    category: "Autoayuda",
    year: 2018,
    coverUrl: "https://picsum.photos/300/450?random=15"
  },
  {
    id: 7,
    title: "Las Venas Abiertas de AL",
    author: "Eduardo Galeano",
    price: "Bs. 95",
    priceValue: 95,
    category: "Historia",
    year: 1971,
    coverUrl: "https://picsum.photos/300/450?random=16"
  },
  {
    id: 8,
    title: "Rayuela",
    author: "Julio Cortázar",
    price: "Bs. 110",
    priceValue: 110,
    category: "Ficción",
    year: 1963,
    coverUrl: "https://picsum.photos/300/450?random=17"
  }
];

// Mock locations in Sucre, Bolivia
export const ROUTE_SCHEDULE: Stop[] = [
  {
    id: 1,
    location: "Plaza 25 de Mayo",
    date: "24 Oct",
    time: "10:00 AM - 4:00 PM",
    coordinates: { x: 50, y: 50 }, // Center
    isPast: true
  },
  {
    id: 2,
    location: "Parque Simón Bolívar",
    date: "26 Oct",
    time: "11:00 AM - 6:00 PM",
    coordinates: { x: 30, y: 20 }, // Northwestish
    isPast: false
  },
  {
    id: 3,
    location: "Mirador de la Recoleta",
    date: "28 Oct",
    time: "09:00 AM - 3:00 PM",
    coordinates: { x: 70, y: 70 }, // Southeastish (high ground)
    isPast: false
  },
  {
    id: 4,
    location: "Avenida de las Américas",
    date: "30 Oct",
    time: "12:00 PM - 5:00 PM",
    coordinates: { x: 20, y: 80 }, // South
    isPast: false
  }
];