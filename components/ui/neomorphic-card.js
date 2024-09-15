import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const NeomorphicCard = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neomorphic p-6 bg-card text-card-foreground relative overflow-hidden",
      "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-br before:from-transparent before:to-black/5 before:rounded-lg",
      className
    )}
    {...props}
  />
))
NeomorphicCard.displayName = "NeomorphicCard"

export { NeomorphicCard }