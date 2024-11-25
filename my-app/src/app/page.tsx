'use client'

import React from 'react';
import { Search, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Combined interfaces
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

interface ItemCardProps extends Item {
  onClick?: (id: string) => void;
  isAuthenticated: boolean;
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

type SearchInputEvent = React.ChangeEvent<HTMLInputElement>;

// Helper functions
const generateSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

const getItemPath = (category: string, item: string): string => {
  const itemSlug = generateSlug(item);
  return `/pages/${itemSlug}`;
};

// Dummy data
const initialItems: Item[] = [
  {
    id: "dining-halls",
    title: "Dining Halls",
    items: ["Bolton", "The Village Summit", "Oglethorpe", "Snelling", "The Niche"],
    image: "Bolton.png",
    description: "UGA's premier dining locations"
  },
  {
    id: "study-spots",
    title: "Study Spots",
    items: ["Tate Student Center", "Miller Learning Center", "Main Library", "Science Library", "Science Learning Center"],
    image: "MLC.png",
    description: "Popular study locations on campus"
  },
  {
    id: "restaurants",
    title: "Restaurants",
    items: ["Chick-Fil-A", "Panda Express", "Barberitos", "Jittery Joes", "Einstein Bros"],
    image: "panda-express.jpg",
    description: "Other great eating options on campus"
  }
];

const navigationItems: NavItem[] = [
  { id: "campus", label: "UGA Campus", path: "https://www.uga.edu" },
  { id: "map", label: "Map & Directions", path: "https://www.google.com/maps/search/uga+campus+map" },
  { id: "mail", label: "UGAMail", path: "https://outlook.office.com/mail/" },
  { id: "elc", label: "eLC", path: "https://uga.view.usg.edu" }
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

const Header: React.FC<{ onSearch: (term: string) => void; isAuthenticated: boolean; setIsAuthenticated: (value: boolean) => void }> = ({ 
  onSearch, 
  isAuthenticated, 
  setIsAuthenticated 
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
    onSearch(value);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="p-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => router.push(isAuthenticated ? '/pages/Dashboard' : '/')}
          className="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <img 
            src="uga-logo.png" 
            alt="UGA Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">RateMyUGA</h1>
          <p className="#BA0C2F">University of Georgia</p>
        </button>
        
        <div className="flex items-center space-x-4">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
          <div className="flex space-x-2">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
                
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Submit New Rank
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                      <button
                        onClick={() => {
                          router.push('/pages/create-bolton-rating');
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Dining Hall
                      </button>
                      <button
                        onClick={() => {
                          router.push('/pages/create-study-rating');
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Study Spots
                      </button>
                      <button
                        onClick={() => {
                          router.push('/pages/create-restaurant-rating');
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Restaurants
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => router.push('/pages/user-data-page')}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  User Data
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsAuthenticated(true)}
                  className="px-4 py-2 rounded-full bg-red-100 text-red-900 hover:bg-red-200 transition"
                >
                  Log In
                </button>
                <button 
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Up
                </button>
              </>
            )}
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
          onClick={() => window.open(path, '_blank', 'noopener,noreferrer')}
          className="px-6 py-2 rounded-full bg-white hover:bg-gray-50 transition"
        >
          {label}
        </button>
      ))}
    </div>
  </nav>
);

const ItemCard: React.FC<ItemCardProps> = ({ 
  id, 
  title, 
  items, 
  image, 
  description, 
  onClick,
  isAuthenticated 
}) => {
  const router = useRouter();

  const handleItemClick = (e: React.MouseEvent, item: string) => {
    if (!isAuthenticated) return;
    e.stopPropagation();
    const path = getItemPath(id, item);
    router.push(path);
  };

  return (
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
        {isAuthenticated ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-gray-600">•</span>
                <button
                  onClick={(e) => handleItemClick(e, item)}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gray-50 rounded-lg">
            <Lock className="w-8 h-8 text-gray-400" />
            <p className="text-gray-600">Sign in to access content</p>
            <button className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition text-sm">
              Log In to View
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  // Set this to true to show logged-in state, false for logged-out state
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [searchResults, setSearchResults] = React.useState<Item[]>(initialItems);

  const handleSearch = (term: string): void => {
    const filtered = initialItems.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.items.some(i => i.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handleNavigation = (path: string): void => {
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  const handleItemClick = (id: string): void => {
    console.log(`Clicked item: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
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
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;