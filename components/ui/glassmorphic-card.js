import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const GlassmorphicCard = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-gradient-card from-card-from to-card-to dark:from-card-from-dark dark:to-card-to-dark backdrop-blur-md border border-white/20 shadow-xl",
      className
    )}
    {...props}
  />
))
GlassmorphicCard.displayName = "GlassmorphicCard"

export { GlassmorphicCard }