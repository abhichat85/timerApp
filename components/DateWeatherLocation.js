import { useState, useEffect } from 'react'
import { NeomorphicCard } from './ui/neomorphic-card'
import { DateTime } from 'luxon'
import { MapPin, Cloud, Sun, CloudRain, Calendar } from 'lucide-react'

export default function DateWeatherLocation() {
  const [dateTime, setDateTime] = useState(DateTime.local())
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' })
  const [location, setLocation] = useState('Loading...')

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(DateTime.local())
    }, 1000)

    // Simulating weather and location API calls
    setTimeout(() => {
      setWeather({ temp: '22°C', condition: 'Cloudy' })
      setLocation('New York, USA')
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6" />
      case 'rainy':
        return <CloudRain className="h-6 w-6" />
      default:
        return <Cloud className="h-6 w-6" />
    }
  }

  return (
    <NeomorphicCard className="h-full flex flex-col p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
        <Calendar className="mr-2" size={20} />
        Date & Weather
      </h2>
      <div className="flex flex-col items-center space-y-4 flex-grow justify-center">
        <h2 className="text-xl sm:text-2xl font-bold">{dateTime.toFormat('cccc')}</h2>
        <p className="text-lg sm:text-xl">{dateTime.toFormat('dd LLLL yyyy')}</p>
        <div className="flex items-center space-x-2">
          {getWeatherIcon(weather.condition)}
          <span className="text-base sm:text-lg">{weather.temp}</span>
          <span className="text-base sm:text-lg">{weather.condition}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-sm sm:text-base">{location}</span>
        </div>
      </div>
    </NeomorphicCard>
  )
}