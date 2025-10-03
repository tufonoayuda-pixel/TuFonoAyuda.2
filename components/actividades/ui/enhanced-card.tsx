"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  gradient?: boolean
  hover?: boolean
  glow?: boolean
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, icon, gradient, hover = true, glow, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -4 } : {}}
      >
        <Card
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            hover && "hover:shadow-xl",
            gradient && "bg-gradient-to-br from-background to-muted/50",
            glow && "hover:shadow-2xl hover:shadow-primary/20",
            className,
          )}
          {...props}
        >
          {gradient && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
          )}
          {glow && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
          <div className="relative z-10">
            {icon && <div className="absolute top-4 right-4 opacity-10 text-6xl">{icon}</div>}
            {children}
          </div>
        </Card>
      </motion.div>
    )
  },
)
EnhancedCard.displayName = "EnhancedCard"

export { EnhancedCard }
