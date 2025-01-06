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
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const metricsResponse = await axios.get(
        "http://localhost:8000/api/analytics/engagement-metrics"
      );
      if (metricsResponse.data && metricsResponse.data.length > 0) {
        setMetrics(metricsResponse.data);
        const postResponse = await axios.get(
          "http://localhost:8000/api/analytics/all-posts"
        );
        if (postResponse.data && postResponse.data.length > 0) {
          setAllPosts(postResponse.data);
        }
      } else {
        const mockResponse = await axios.post(
          "http://localhost:8000/api/analytics/generate-mock-data",
          { count: 50 }
        );
        if (!mockResponse.data) {
          throw new Error("Error generating mock data");
        }
        setAllPosts(mockResponse.data);

        const updateMetricsResponse = await axios.get(
          "http://localhost:8000/api/analytics/engagement-metrics"
        );
        setMetrics(updateMetricsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
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
