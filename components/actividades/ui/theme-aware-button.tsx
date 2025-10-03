"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const themeAwareButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        magical:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl",
        matrix:
          "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-xl",
        ranger: "bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 text-white shadow-lg hover:shadow-xl",
        esoteric:
          "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl",
        wizard:
          "bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg hover:from-red-700 hover:to-yellow-600 hover:shadow-xl",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ThemeAwareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeAwareButtonVariants> {
  asChild?: boolean
  glow?: boolean
}

const ThemeAwareButton = React.forwardRef<HTMLButtonElement, ThemeAwareButtonProps>(
  ({ className, variant, size, asChild = false, glow = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const { theme } = useTheme()

    // Auto-select variant based on theme
    const getThemeVariant = () => {
      if (variant && variant !== "default") return variant

      if (theme?.includes("sailor-moon")) return "magical"
      if (theme?.includes("matrix")) return "matrix"
      if (theme?.includes("power-rangers")) return "ranger"
      if (theme?.includes("esoteric")) return "esoteric"
      if (theme?.includes("harry-potter")) return "wizard"

      return "default"
    }

    const finalVariant = getThemeVariant()

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
        <Comp
          className={cn(
            themeAwareButtonVariants({ variant: finalVariant, size, className }),
            glow && "shadow-lg shadow-primary/25 hover:shadow-primary/40",
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </motion.div>
    )
  },
)
ThemeAwareButton.displayName = "ThemeAwareButton"

export { ThemeAwareButton, themeAwareButtonVariants }
