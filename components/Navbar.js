import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Clock, Bell, Globe, Brain, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { title: 'Time Tools', icon: <Clock size={20} /> },
  { title: 'Productivity', icon: <Brain size={20} /> },
  { title: 'Integrations', icon: <Globe size={20} /> },
  { title: 'Settings', icon: <Settings size={20} /> },
];

export default function Navbar({ isMenuCollapsed }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 right-0 z-50 bg-background transition-all duration-300 ${isMenuCollapsed ? 'left-16' : 'left-64'}`}>
      <div className="neomorphic-menu p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Timer App</h1>
        <div className="flex items-center">
          <div className={`hidden md:flex items-center space-x-4`}>
            {navItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
          <ThemeToggle />
          <button
            className="md:hidden p-2 bg-transparent border-none cursor-pointer ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden neomorphic-menu mt-2 p-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 mb-2"
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}