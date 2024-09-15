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
      { name: 'World Clock', component: 'WorldClock', icon: <World size={16} /> },
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
    <div className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-full neomorphic-menu overflow-y-auto">
        <button
          className="absolute top-4 right-4 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <nav className="mt-16 p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className={`w-full text-left flex items-center justify-between p-2 ${isCollapsed ? 'px-2' : ''} bg-transparent border-none cursor-pointer`}
                onClick={() => !isCollapsed && toggleSubMenu(index)}
              >
                <span className="flex items-center">
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.title}</span>}
                </span>
                {!isCollapsed && (openSubMenus[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </button>
              {!isCollapsed && openSubMenus[index] && (
                <ul className="ml-4 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="text-sm">
                      <button 
                        className="w-full text-left pl-6 p-2 bg-transparent border-none cursor-pointer flex items-center"
                        onClick={() => setActiveComponent(subItem.component)}
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.name}</span>
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