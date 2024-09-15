import { NeomorphicCard } from './ui/neomorphic-card'
import { useState, useEffect } from 'react'
import AnalogClock from './AnalogClock';
import { DateTime } from 'luxon';
import { Clock as ClockIcon } from 'lucide-react';

export default function Clock() {
  const [time, setTime] = useState(DateTime.local())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.local());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <NeomorphicCard className="h-full flex flex-col p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <ClockIcon className="mr-2" size={20} />
        Current Time
      </h2>
      <div className="flex flex-col items-center flex-grow justify-center">
        <AnalogClock time={time} size={200} />
        <p className="mt-2 text-sm font-semibold">Local</p>
        <p className="text-xs text-muted-foreground">
          {time.toFormat('HH:mm:ss')}
        </p>
      </div>
    </NeomorphicCard>
  )
}