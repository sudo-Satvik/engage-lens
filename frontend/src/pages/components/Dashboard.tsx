'use client'

import { useState, useEffect } from 'react'
import { AiChat } from "@/components/dashboard/ai-chat"
import { LineGraph } from "@/components/dashboard/line-graph"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { Sidebar } from "@/pages/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Hello UserName</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <MetricCards isLoading={isLoading } />
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-6">
            <LineGraph isLoading={isLoading} />
            <AiChat isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}
