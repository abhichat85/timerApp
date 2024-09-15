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
      <div className="h-full neomorphic-menu overflow-y-auto bg-neutral-100 dark:bg-neutral-800">
        <button
          className="absolute top-4 right-4 p-2 neomorphic-button text-neutral-700 dark:text-neutral-200"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <nav className="mt-16 p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className={`w-full text-left flex items-center justify-between p-2 ${isCollapsed ? 'px-2' : ''} neomorphic-button text-neutral-700 dark:text-neutral-200`}
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
                        className="w-full text-left pl-6 p-2 neomorphic-button-inset flex items-center text-neutral-600 dark:text-neutral-300"
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

const styles = `
  .neomorphic-menu {
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 5px 5px 10px rgba(0, 0, 0, 0.05);
  }
  .neomorphic-button {
    background: linear-gradient(145deg, #f5f5f5, #e6e6e6);
    box-shadow: 3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff;
    border: none;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  .neomorphic-button:hover {
    box-shadow: inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff;
  }
  .neomorphic-button-inset {
    background: linear-gradient(145deg, #e6e6e6, #f5f5f5);
    box-shadow: inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff;
    border: none;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  .neomorphic-button-inset:hover {
    box-shadow: 3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff;
  }
  .dark .neomorphic-menu {
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05), 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
  .dark .neomorphic-button {
    background: linear-gradient(145deg, #3d3d3d, #333333);
    box-shadow: 3px 3px 6px #2a2a2a, -3px -3px 6px #464646;
  }
  .dark .neomorphic-button:hover {
    box-shadow: inset 3px 3px 6px #2a2a2a, inset -3px -3px 6px #464646;
  }
  .dark .neomorphic-button-inset {
    background: linear-gradient(145deg, #333333, #3d3d3d);
    box-shadow: inset 3px 3px 6px #2a2a2a, inset -3px -3px 6px #464646;
  }
  .dark .neomorphic-button-inset:hover {
    box-shadow: 3px 3px 6px #2a2a2a, -3px -3px 6px #464646;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}