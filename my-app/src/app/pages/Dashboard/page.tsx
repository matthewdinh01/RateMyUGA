'use client'

import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
//import { useState} from 'react';
// Base interfaces for data structures
interface Item {
  id: string;
  title: string;
  items: string[];
  image: string;
  description?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
}

// Component Props interfaces
interface ItemCardProps extends Item {
  onClick?: (id: string) => void;
}

interface HeaderProps {
  onSearch: (term: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface NavigationProps {
  items: NavItem[];
  onNavClick: (path: string) => void;
}

// Type for the search input event
type SearchInputEvent = React.ChangeEvent<HTMLInputElement>;

// Dummy data with enhanced type safety
const initialItems: Item[] = [
  {
    id: "dining-halls",
    title: "Dining Halls",
    items: ["Bolton", "The Village Summit", "Oglethorpe", "Snelling", "The Niche"],
    image: "../../../Bolton.png",
    description: "UGA's premier dining locations"
  },
  {
    id: "study-spots",
    title: "Study Spots",
    items: ["Tate Student Center", "Law Library", "Miller Learning Center", "Main Library", "Science Library", "Science Learning Center"],
    image: "../../../MLC.png",
    description: "Popular study locations on campus"
  },
  {
    id: "restaurants",
    title: "Restaurants",
    items: ["Chick-Fil-A", "Panda Express", "Niche Pizza Co.", "Barberitos", "Starbucks", "Jittery Joes", "Einstein Bros"],
    image: "../../../UGA.png",
    description: "Other great eating options on campus"
  }
];

const navigationItems: NavItem[] = [
  { id: "campus", label: "UGA Campus", path: "/campus" },
  { id: "map", label: "Map & Directions", path: "/map" },
  { id: "mail", label: "UGAMail", path: "/mail" },
  { id: "elc", label: "eLC", path: "/elc" }
];

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search" }) => {
  const handleChange = (e: SearchInputEvent): void => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
      />
      <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ onSearch, onLogin, onSignUp }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const router = useRouter()
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="p-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="../../../uga-logo.png" 
            alt="UGA Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">RateMyUGA</h1>
          <p className="#BA0C2F">University of Georgia</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
          <div className="flex space-x-2">
        
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sign Out
            </button>
            <button 
              onClick={() => router.push('/pages/create-bolton-rating')}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Submit New Rank
            </button>
            <button 
              onClick={() => router.push('/pages/user-data-page')}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              User Data
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Navigation: React.FC<NavigationProps> = ({ items, onNavClick }) => (
  <nav className="bg-gray-100 p-4">
    <div className="max-w-7xl mx-auto flex justify-between">
      {items.map(({ id, label, path }) => (
        <button
          key={id}
          onClick={() => onNavClick(path)}
          className="px-6 py-2 rounded-full bg-white hover:bg-gray-50 transition"
        >
          {label}
        </button>
      ))}
    </div>
  </nav>
);

const ItemCard: React.FC<ItemCardProps> = ({ id, title, items, image, description, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    onClick={() => onClick?.(id)}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-gray-600">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<Item[]>(initialItems);

  const handleSearch = (term: string): void => {
    const filtered = initialItems.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.items.some(i => i.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handleNavigation = (path: string): void => {
    console.log(`Navigating to: ${path}`);
  };

  const handleItemClick = (id: string): void => {
    console.log(`Clicked item: ${id}`);
  };

  const handleLogin = (): void => {
    console.log('Login clicked');
  };

  const handleSignUp = (): void => {
    console.log('Sign up clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
      <Navigation 
        items={navigationItems}
        onNavClick={handleNavigation}
      />
      
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((item) => (
            <ItemCard 
              key={item.id} 
              {...item} 
              onClick={handleItemClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;