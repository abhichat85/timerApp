import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { NeomorphicCard } from './ui/neomorphic-card'
import { Globe } from 'lucide-react';

const timeZones = [
  { name: 'Local', zone: DateTime.local().zoneName },
  { name: 'New York', zone: 'America/New_York' },
  { name: 'London', zone: 'Europe/London' },
  { name: 'Tokyo', zone: 'Asia/Tokyo' },
];

function AnalogClock({ time, name }) {
  const seconds = time.second + time.millisecond / 1000;
  const minutes = time.minute + seconds / 60;
  const hours = time.hour % 12 + minutes / 60;

  return (
    <div className="flex flex-col items-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="max-w-[150px]">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            transform={`rotate(${i * 30} 50 50)`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          transform={`rotate(${hours * 30} 50 50)`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          transform={`rotate(${minutes * 6} 50 50)`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          transform={`rotate(${seconds * 6} 50 50)`}
          stroke="red"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-2 text-sm font-semibold">{name}</p>
      <p className="text-xs text-muted-foreground">
        {time.toFormat('HH:mm:ss')}
      </p>
    </div>
  );
}

export default function WorldClock() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(({ name, zone }) => {
        newTimes[name] = DateTime.now().setZone(zone);
      });
      setTimes(newTimes);
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NeomorphicCard className="h-full p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <Globe className="mr-2" size={20} />
        World Clock
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {timeZones.map(({ name }) => (
          times[name] && <AnalogClock key={name} time={times[name]} name={name} />
        ))}
      </div>
    </NeomorphicCard>
  );
}