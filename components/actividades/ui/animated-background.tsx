"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  variant?: "subtle" | "dynamic" | "particles"
  className?: string
}

export function AnimatedBackground({ variant = "subtle", className = "" }: AnimatedBackgroundProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getThemeColors = () => {
    if (theme?.includes("sailor-moon")) {
      return {
        primary: "rgba(255, 182, 193, 0.1)",
        secondary: "rgba(221, 160, 221, 0.1)",
        accent: "rgba(255, 215, 0, 0.1)",
      }
    }
    if (theme?.includes("matrix")) {
      return {
        primary: "rgba(0, 255, 0, 0.1)",
        secondary: "rgba(0, 128, 0, 0.1)",
        accent: "rgba(0, 255, 127, 0.1)",
      }
    }
    if (theme?.includes("power-rangers")) {
      return {
        primary: "rgba(255, 0, 0, 0.1)",
        secondary: "rgba(0, 0, 255, 0.1)",
        accent: "rgba(255, 255, 0, 0.1)",
      }
    }
    if (theme?.includes("esoteric")) {
      return {
        primary: "rgba(138, 43, 226, 0.1)",
        secondary: "rgba(75, 0, 130, 0.1)",
        accent: "rgba(148, 0, 211, 0.1)",
      }
    }
    if (theme?.includes("harry-potter")) {
      return {
        primary: "rgba(220, 20, 60, 0.1)",
        secondary: "rgba(255, 215, 0, 0.1)",
        accent: "rgba(139, 69, 19, 0.1)",
      }
    }
    return {
      primary: "rgba(59, 130, 246, 0.1)",
      secondary: "rgba(99, 102, 241, 0.1)",
      accent: "rgba(168, 85, 247, 0.1)",
    }
  }

  const colors = getThemeColors()

  if (variant === "particles") {
    return (
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              background: Object.values(colors)[i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "dynamic") {
    return (
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${colors.primary} 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, ${colors.secondary} 0%, transparent 50%), 
                        radial-gradient(circle at 40% 80%, ${colors.accent} 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, ${colors.primary} 0%, transparent 50%, ${colors.secondary} 100%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
