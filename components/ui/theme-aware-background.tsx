"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeAwareBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getThemeElements = () => {
    if (theme?.includes("sailor-moon")) {
      return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Sailor Moon sparkles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />
        </div>
      )
    }

    if (theme?.includes("matrix")) {
      return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Matrix rain effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-20 bg-green-500 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-100, window.innerHeight + 100],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-black/20" />
        </div>
      )
    }

    if (theme?.includes("power-rangers")) {
      return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Power Rangers energy effects */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(0, 0, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(255, 255, 0, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      )
    }

    if (theme?.includes("esoteric")) {
      return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Esoteric mystical effects */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full border border-purple-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-violet-500/5" />
        </div>
      )
    }

    if (theme?.includes("harry-potter")) {
      return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Harry Potter magical effects */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 via-red-600/5 to-amber-600/5" />
        </div>
      )
    }

    // Default theme
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    )
  }

  return getThemeElements()
}
