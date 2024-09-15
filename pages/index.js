import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Stopwatch from '../components/Stopwatch'
import Timer from '../components/Timer'
import WorldClock from '../components/WorldClock'
import Alarm from '../components/Alarm'
import DateWeatherLocation from '../components/DateWeatherLocation'
import SideMenu from '../components/SideMenu'
import Navbar from '../components/Navbar'
import { useUser, SignedOut, SignedIn } from "@clerk/nextjs"

const Clock = dynamic(() => import('../components/Clock'), { ssr: false })

const components = {
  Clock,
  WorldClock,
  Stopwatch,
  Timer,
  Alarm,
  DateWeatherLocation
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [layout, setLayout] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const [activeComponent, setActiveComponent] = useState(null)

  useEffect(() => {
    setIsClient(true)
    setLayout([
      { id: 'Clock-1', component: 'Clock', column: 'main' },
      { id: 'WorldClock-1', component: 'WorldClock', column: 'main' },
      { id: 'Stopwatch-1', component: 'Stopwatch', column: 'main' },
      { id: 'Timer-1', component: 'Timer', column: 'main' },
      { id: 'Alarm-1', component: 'Alarm', column: 'main' },
      { id: 'DateWeatherLocation-1', component: 'DateWeatherLocation', column: 'main' }
    ])
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(layout)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setLayout(items)
  }

  const renderComponent = (componentName) => {
    const Component = components[componentName]
    if (!Component) {
      console.error(`Component not found: ${componentName}`)
      return null
    }
    return <Component />
  }

  if (!isLoaded || !isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Timer App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SignedIn>
        <Navbar 
          isMenuCollapsed={isMenuCollapsed}
          setActiveComponent={setActiveComponent}
        />
        <SideMenu 
          isCollapsed={isMenuCollapsed}
          setIsCollapsed={setIsMenuCollapsed}
          setActiveComponent={setActiveComponent}
        />

        <div className={`main-content ${isMenuCollapsed ? 'ml-16' : 'ml-64'} mt-16`}>
          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {activeComponent ? (
              renderComponent(activeComponent)
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="main">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ${
                        snapshot.isDraggingOver ? 'bg-blue-100' : ''
                      }`}
                    >
                      {layout.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${snapshot.isDragging ? 'opacity-50' : ''} mb-4 sm:mb-0`}
                            >
                              {renderComponent(item.component)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-4">Welcome to Timer App</h1>
          <p className="mb-4">Please sign in to access the app.</p>
          <a href="/sign-in" className="btn-gradient">Sign In</a>
        </div>
      </SignedOut>
    </div>
  )
}