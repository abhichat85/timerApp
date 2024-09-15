// components/Timer.js
import { useState, useEffect, useRef } from 'react'
import { NeomorphicCard } from './ui/neomorphic-card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Timer as TimerIcon, Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

const PRESET_TIMERS = [
  { name: 'Pomodoro', seconds: 1500 },
  { name: 'Short Break', seconds: 300 },
  { name: 'Long Break', seconds: 900 },
  { name: 'Quick Task', seconds: 600 },
]

const TIMER_SOUNDS = ['beep', 'chime', 'alarm', 'bell']

export default function Timer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState('')
  const [timerSound, setTimerSound] = useState('beep')
  const audioRef = useRef(null)

  useEffect(() => {
    let intervalId
    if (isRunning && time > 0) {
      intervalId = setInterval(() => setTime(time => time - 1), 1000)
    } else if (time === 0 && isRunning) {
      setIsRunning(false)
      playTimerSound()
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time])

  const startStop = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true)
    } else {
      setIsRunning(false)
    }
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
    setInputTime('')
  }

  const handleInputChange = (e) => {
    setInputTime(e.target.value)
  }

  const setTimer = () => {
    const seconds = parseInt(inputTime)
    if (!isNaN(seconds) && seconds > 0) {
      setTime(seconds)
      setInputTime('')
    }
  }

  const setPresetTimer = (seconds) => {
    setTime(seconds)
    setInputTime('')
  }

  const playTimerSound = () => {
    audioRef.current.src = `/sounds/${timerSound}.mp3`
    audioRef.current.play()
  }

  const formatTime = () => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <NeomorphicCard className="h-full flex flex-col p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <TimerIcon className="mr-2" size={20} />
        Timer
      </h2>
      <div className="flex flex-col items-center flex-grow">
        <p className="text-2xl sm:text-4xl font-mono mb-4">{formatTime()}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Input
            type="number"
            value={inputTime}
            onChange={handleInputChange}
            placeholder="Enter seconds"
            className="w-24 sm:w-32"
          />
          <Button onClick={setTimer} variant="gradient">Set</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {PRESET_TIMERS.map(preset => (
            <Button key={preset.name} onClick={() => setPresetTimer(preset.seconds)} variant="gradient" size="sm">
              {preset.name}
            </Button>
          ))}
        </div>
        <Select value={timerSound} onValueChange={setTimerSound} className="mb-4">
          <SelectTrigger className="w-[140px] sm:w-[180px]">
            <Volume2 className="mr-2" size={16} />
            <SelectValue placeholder="Timer Sound" />
          </SelectTrigger>
          <SelectContent>
            {TIMER_SOUNDS.map(sound => (
              <SelectItem key={sound} value={sound}>{sound}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={startStop} variant="gradient">
            {isRunning ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} variant="gradient">
            <RotateCcw className="mr-2" size={16} />
            Reset
          </Button>
        </div>
      </div>
      <audio ref={audioRef} />
    </NeomorphicCard>
  )
}