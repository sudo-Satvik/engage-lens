'use client'

import axios from 'axios';
import { useState, useEffect } from 'react'
import { LineGraph } from "@/components/dashboard/line-graph"
import { Sidebar } from "@/pages/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { EngagementData } from '@/types/engagementType'

export default function EngagementTrends() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:8000/api/analytics/all-posts");
      
      if (response.data && response.data.length > 0) {
        setAllPosts(response.data);
      } else {
        const mockResponse = await axios.post(
          "http://localhost:8000/api/analytics/generate-mock-data",
          { count: 100 }
        );
        
        if (!mockResponse.data) {
          throw new Error("Error generating mock data");
        }
        setAllPosts(mockResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 lg:p-6 border-b border-border bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight ml-5">
            Engagement Trends
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background">
          {error && (
            <div className="text-red-500 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight ml-5">
                Engagement Overview
              </h2>
              <h3 className="text-md text-gray-400 tracking-tight ml-5">
                Average Interaction Types
              </h3>
            </div>

            <div className="grid gap-4 grid-cols-1">
              <LineGraph 
                isLoading={isLoading} 
                data={allPosts} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}