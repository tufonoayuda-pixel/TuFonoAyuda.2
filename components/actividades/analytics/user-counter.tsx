"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getUserCount } from "@/lib/auth-utils"

export function UserCounter() {
  const [userCount, setUserCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const count = await getUserCount()
        setUserCount(count)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user count:", error)
        setUserCount(0)
        setIsLoading(false)
      }
    }

    fetchUserCount()

    const interval = setInterval(async () => {
      try {
        const newCount = await getUserCount()
        setUserCount(newCount)
      } catch (error) {
        console.error("Error updating user count:", error)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="animate-pulse h-4 w-4 bg-muted rounded"></div>
        <div className="animate-pulse h-4 w-20 bg-muted rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 text-primary">
        <Users className="h-4 w-4" />
        <span className="font-semibold">{userCount.toLocaleString()}</span>
      </div>
      <span className="text-muted-foreground">usuarios registrados</span>
      <div className="flex items-center gap-1 text-green-600">
        <TrendingUp className="h-3 w-3" />
        <span className="text-xs">Crecimiento constante</span>
      </div>
    </div>
  )
}

export function UserCounterCard() {
  const [userCount, setUserCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const users = await getUserCount()
        setUserCount(users)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching counts:", error)
        setUserCount(0)
        setIsLoading(false)
      }
    }

    fetchCounts()

    // Update counts periodically
    const interval = setInterval(fetchCounts, 60000) // Every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {isLoading ? (
              <div className="animate-pulse h-10 w-20 bg-muted rounded mx-auto"></div>
            ) : (
              userCount.toLocaleString()
            )}
          </div>
          <div className="text-sm text-muted-foreground">Usuarios Registrados</div>
          <div className="flex items-center justify-center gap-1 text-green-600 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Crecimiento constante</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
