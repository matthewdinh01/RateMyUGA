import React from 'react';
import { Search, Menu } from 'lucide-react';


// Dummy data for initial items
const initialItems = [
  {
    title: "Dining Halls",
    items: ["Bolton", "The Village Summit", "Oglethorpe", "Snelling", "The Niche"],
    image: "/api/placeholder/300/200"
  },
  {
    title: "Study Spots",
    items: ["Baldwin Hall", "Aderhold Hall", "Miller Learning Center", "Main Library", "Science Library"],
    image: "/api/placeholder/300/200"
  },
  {
    title: "Resources",
    items: ["MyUGA", "UGAMail", "Athena", "eLC", "SAGE"],
    image: "/api/placeholder/300/200"
  }
];

const Header = () => (
  <header className="p-4 border-b">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img 
          src="/api/placeholder/40/40" 
          alt="UGA Logo" 
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-bold">RateMyUGA</h1>
        <p className="text-purple-600">University of Georgia</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-full bg-red-100 text-red-900 hover:bg-red-200 transition">
            Log In
          </button>
          <button className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Navigation = () => (
  <nav className="bg-gray-100 p-4">
    <div className="max-w-7xl mx-auto flex justify-between">
      {["UGA Campus", "Map & Directions", "UGAMail", "eLC"].map((item) => (
        <button
          key={item}
          className="px-6 py-2 rounded-full bg-white hover:bg-gray-50 transition"
        >
          {item}
        </button>
      ))}
    </div>
  </nav>
);

const ItemCard = ({ title, items, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
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

const Home = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Navigation />
    
    <main className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialItems.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </div>
    </main>
  </div>
);

export default Home;