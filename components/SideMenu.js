import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Clock, Bell, Globe, Brain, Settings, Timer, Watch, World, Coffee, Calendar, Moon, Focus, Target, Cloud, Palette, Mic, Layout } from 'lucide-react';

const menuItems = [
  {
    title: 'Time Tools',
    icon: <Clock size={20} />,
    subItems: [
      { name: 'Alarm', component: 'Alarm', icon: <Bell size={16} /> },
      { name: 'Timer', component: 'Timer', icon: <Timer size={16} /> },
      { name: 'Stopwatch', component: 'Stopwatch', icon: <Watch size={16} /> },
      { name: 'Clock', component: 'Clock', icon: <Clock size={16} /> },
    ]
  },
  {
    title: 'Productivity',
    icon: <Brain size={20} />,
    subItems: [
      { name: 'Pomodoro', component: 'Pomodoro', icon: <Coffee size={16} /> },
      { name: 'Events', component: 'Events', icon: <Calendar size={16} /> },
      { name: 'Sleep Cycle', component: 'SleepCycle', icon: <Moon size={16} /> },
      { name: 'Focus Mode', component: 'FocusMode', icon: <Focus size={16} /> },
      { name: 'Habit Tracker', component: 'HabitTracker', icon: <Target size={16} /> },
    ]
  },
  {
    title: 'Integrations',
    icon: <Globe size={20} />,
    subItems: [
      { name: 'Weather', component: 'Weather', icon: <Cloud size={16} /> },
      { name: 'Calendar', component: 'Calendar', icon: <Calendar size={16} /> },
      { name: 'Voice Commands', component: 'VoiceCommands', icon: <Mic size={16} /> },
      { name: 'Widgets', component: 'Widgets', icon: <Layout size={16} /> },
    ]
  },
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    subItems: [
      { name: 'Themes', component: 'Themes', icon: <Palette size={16} /> },
      { name: 'Data Sync', component: 'DataSync', icon: <Globe size={16} /> },
    ]
  }
];

export default function SideMenu({ isCollapsed, setIsCollapsed, setActiveComponent }) {
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (index) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white`}>
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <span className="text-xl font-semibold">Timer App</span>}
          <button
            className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                className={`w-full text-left flex items-center justify-between p-3 hover:bg-gray-700 transition-colors duration-200 ${isCollapsed ? 'px-2' : ''}`}
                onClick={() => !isCollapsed && toggleSubMenu(index)}
              >
                <span className="flex items-center">
                  {item.icon}
                  {!isCollapsed && <span className="ml-3">{item.title}</span>}
                </span>
                {!isCollapsed && (openSubMenus[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </button>
              {!isCollapsed && openSubMenus[index] && (
                <ul className="bg-gray-800 py-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button 
                        className="w-full text-left pl-10 pr-4 py-2 hover:bg-gray-700 transition-colors duration-200 flex items-center"
                        onClick={() => setActiveComponent(subItem.component)}
                      >
                        {subItem.icon}
                        <span className="ml-3 text-sm">{subItem.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}