import { useState, useEffect, useRef } from 'react'
import { NeomorphicCard } from './ui/neomorphic-card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Repeat, Clock, Plus, Volume2 } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ALARM_SOUNDS = ['default', 'gentle', 'urgent', 'bells', 'digital']

export default function Alarm() {
  const [alarms, setAlarms] = useState([])
  const [hours, setHours] = useState('12')
  const [minutes, setMinutes] = useState('00')
  const [ampm, setAmpm] = useState('AM')
  const [alarmSound, setAlarmSound] = useState('default')
  const [repeat, setRepeat] = useState([])
  const [snoozeTime, setSnoozeTime] = useState(5)
  const audioRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(checkAlarms, 1000)
    return () => clearInterval(interval)
  }, [alarms])

  const checkAlarms = () => {
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    const currentDay = DAYS[now.getDay()]
    
    alarms.forEach(alarm => {
      if (alarm.time === currentTime && !alarm.triggered && alarm.active &&
          (alarm.repeat.length === 0 || alarm.repeat.includes(currentDay))) {
        triggerAlarm(alarm)
      }
    })
  }

  const triggerAlarm = (alarm) => {
    audioRef.current.src = `/sounds/${alarm.sound}.mp3`
    audioRef.current.play()
    const shouldSnooze = confirm(`Alarm: ${alarm.time}\nSnooze for ${snoozeTime} minutes?`)
    if (shouldSnooze) {
      snoozeAlarm(alarm.id)
    } else {
      const updatedAlarms = alarms.map(a => 
        a.id === alarm.id ? { ...a, triggered: true } : a
      )
      setAlarms(updatedAlarms)
    }
  }

  const addAlarm = () => {
    if (hours && minutes) {
      let time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
      if (ampm === 'PM' && hours !== '12') {
        time = `${(parseInt(hours) + 12).toString().padStart(2, '0')}:${minutes}`
      } else if (ampm === 'AM' && hours === '12') {
        time = `00:${minutes}`
      }
      const newAlarmObj = { 
        id: Date.now(), 
        time, 
        triggered: false,
        sound: alarmSound,
        repeat,
        active: true
      }
      setAlarms([...alarms, newAlarmObj])
      setHours('12')
      setMinutes('00')
      setAmpm('AM')
      setRepeat([])
      setAlarmSound('default')
    }
  }

  const removeAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id))
  }

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ))
  }

  const snoozeAlarm = (id) => {
    const alarm = alarms.find(a => a.id === id)
    if (alarm) {
      const snoozeTime = new Date()
      snoozeTime.setMinutes(snoozeTime.getMinutes() + parseInt(snoozeTime))
      const newAlarmTime = snoozeTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      const updatedAlarms = alarms.map(a => 
        a.id === id ? { ...a, time: newAlarmTime, triggered: false } : a
      )
      setAlarms(updatedAlarms)
    }
  }

  const toggleRepeat = (day) => {
    setRepeat(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <NeomorphicCard className="h-full flex flex-col p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <Bell className="mr-2" size={20} />
        Alarm
      </h2>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 grid grid-cols-3 gap-2">
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger>
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i} value={(i + 1).toString().padStart(2, '0')}>
                    {(i + 1).toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={minutes} onValueChange={setMinutes}>
              <SelectTrigger>
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(60)].map((_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                    {i.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ampm} onValueChange={setAmpm}>
              <SelectTrigger>
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addAlarm} variant="gradient">
            <Plus className="mr-2" size={16} />
            Add
          </Button>
        </div>
        <Select value={alarmSound} onValueChange={setAlarmSound}>
          <SelectTrigger>
            <Volume2 className="mr-2" size={16} />
            <SelectValue placeholder="Alarm Sound" />
          </SelectTrigger>
          <SelectContent>
            {ALARM_SOUNDS.map(sound => (
              <SelectItem key={sound} value={sound}>{sound}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="number"
            value={snoozeTime}
            onChange={(e) => setSnoozeTime(e.target.value)}
            placeholder="Snooze time (minutes)"
            className="w-40"
          />
          <span>minutes</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DAYS.map(day => (
            <Button
              key={day}
              variant={repeat.includes(day) ? "gradient" : "outline"}
              size="sm"
              onClick={() => toggleRepeat(day)}
            >
              {day}
            </Button>
          ))}
        </div>
        <ul className="space-y-4">
          {alarms.map((alarm) => (
            <li key={alarm.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="text-lg font-semibold">{alarm.time}</p>
                <p className="text-sm text-muted-foreground">
                  {alarm.repeat.length > 0 ? alarm.repeat.join(', ') : 'Once'}
                </p>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Volume2 className="mr-1" size={12} />
                  Sound: {alarm.sound}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="gradient" onClick={() => snoozeAlarm(alarm.id)}>
                  <Repeat className="h-4 w-4" />
                </Button>
                <Switch
                  checked={alarm.active}
                  onCheckedChange={() => toggleAlarm(alarm.id)}
                />
                <Button size="icon" variant="gradient" onClick={() => removeAlarm(alarm.id)}>
                  {alarm.active ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <audio ref={audioRef} />
    </NeomorphicCard>
  )
}