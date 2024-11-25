'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface NavigationProps {
  items: NavItem[];
  onNavClick: (path: string) => void;
}

interface HeaderProps {
  onSearch: (term: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

// Type for the search input event
type SearchInputEvent = React.ChangeEvent<HTMLInputElement>;

// Helper function to generate URL-friendly slugs
const generateSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

// Helper function to get the correct path based on category and item
const getItemPath = (category: string, item: string): string => {
  const itemSlug = generateSlug(item);
  return `/pages/${itemSlug}`;
};

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
    items: ["Main Library", "Science Library", "Miller Learning Center", "Tate Student Center", "Science Learning Center"],
    image: "../../../MLC.png",
    description: "Popular study locations on campus"
  },
  {
    id: "restaurants",
    title: "Restaurants",
    items: ["Chick-Fil-A", "Panda Express", "Jittery Joes", "Barberitos", "Einstein Bros"],
    image: "../../../panda-express.jpg",
    description: "Campus restaurants and coffee shops"
  }
];

const navigationItems: NavItem[] = [
  { id: "campus", label: "UGA Campus", path: "https://www.uga.edu" },
  { id: "map", label: "Map & Directions", path: "https://www.google.com/maps/search/uga+campus+map/@33.9181276,-83.4104864,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D/" },
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

const Header: React.FC<HeaderProps> = ({ onSearch, onLogin, onSignUp }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
    onSearch(value);
  };

  // Close dropdown when clicking outside
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
          onClick={() => router.push('/pages/Dashboard')}
          className="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <img 
            src="../../../uga-logo.png" 
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
            <button 
              onClick={() => router.push('/')}
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

const ItemCard: React.FC<ItemCardProps> = ({ id, title, items, image, description, onClick }) => {
  const router = useRouter();

  const handleItemClick = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();  // Prevent the card's onClick from firing
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
      </div>
    </div>
  );
};

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
    window.open(path, '_blank', 'noopener,noreferrer');
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