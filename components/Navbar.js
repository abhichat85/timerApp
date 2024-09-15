import React from 'react';
import { Clock, Brain, Globe, Settings } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from './ThemeToggle';

const navItems = [
  { title: 'Time Tools', icon: <Clock size={20} />, component: 'Clock' },
  { title: 'Productivity', icon: <Brain size={20} />, component: 'Pomodoro' },
  { title: 'Integrations', icon: <Globe size={20} />, component: 'Weather' },
  { title: 'Settings', icon: <Settings size={20} />, component: 'Settings' },
];

export default function Navbar({ isMenuCollapsed, setActiveComponent }) {
  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 h-16 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ${isMenuCollapsed ? 'pl-16' : 'pl-64'}`}>
      <div className="flex justify-between items-center h-full px-4">
        <div className="text-xl font-bold text-gray-800 dark:text-white">Timer App</div>
        <div className="flex items-center space-x-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              onClick={() => setActiveComponent(item.component)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </button>
          ))}
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}