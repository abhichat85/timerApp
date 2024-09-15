import { useState, useEffect } from 'react'
import { NeomorphicCard } from './ui/neomorphic-card'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Timer, Play, Pause, RotateCcw, Flag } from 'lucide-react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let intervalId
    if (isRunning) {
      intervalId = setInterval(() => setTime(time => time + 10), 10)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
    setLaps([])
  }

  const lap = () => {
    setLaps([...laps, time])
  }

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = ms % 1000
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
  }

  return (
    <NeomorphicCard className="h-full flex flex-col p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <Timer className="mr-2" size={20} />
        Stopwatch
      </h2>
      <div className="flex flex-col items-center flex-grow">
        <p className="text-2xl sm:text-4xl font-mono mb-4">{formatTime(time)}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Button variant="gradient" onClick={startStop}>
            {isRunning ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="gradient" onClick={lap} disabled={!isRunning}>
            <Flag className="mr-2" size={16} />
            Lap
          </Button>
          <Button variant="gradient" onClick={reset}>
            <RotateCcw className="mr-2" size={16} />
            Reset
          </Button>
        </div>
        {laps.length > 0 && (
          <ScrollArea className="h-[150px] sm:h-[200px] w-full rounded-md border p-4 mt-4">
            <h3 className="font-semibold mb-2">Laps</h3>
            {laps.map((lapTime, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>Lap {index + 1}</span>
                <span>{formatTime(lapTime)}</span>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </NeomorphicCard>
  )
}