import type React from "react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppFooter } from "@/components/layout/footer"
import { EnhancedHeader } from "@/components/layout/enhanced-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AnimatedBackground variant="subtle" />
      <div className="flex min-h-screen relative">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <EnhancedHeader />
          <main className="flex-1 p-4 sm:p-6 relative">{children}</main>
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
