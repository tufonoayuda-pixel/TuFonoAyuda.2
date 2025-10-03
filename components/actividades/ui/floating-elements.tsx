"use client"

import { useEffect, useState } from "react"
import { Brain, Sparkles, Heart, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

const icons = [Brain, Sparkles, Heart, Star, Zap]

interface FloatingElement {
  id: number
  Icon: typeof Brain
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => {
        const { id, Icon, x, y, size, duration, delay } = element
        return (
          <motion.div
            key={id}
            className="absolute opacity-10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} className="text-primary" />
          </motion.div>
        )
      })}
    </div>
  )
}
