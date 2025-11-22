export interface Book {
  id: number;
  title: string;
  author: string;
  price: string; // Display string e.g., "Bs. 150"
  priceValue: number; // Numeric for filtering
  coverUrl: string;
  category: string;
  year: number;
}

export interface Stop {
  id: number;
  location: string;
  date: string;
  time: string;
  coordinates: { x: number; y: number }; // Percentage for the mock map
  isPast: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}