"use client";
import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import axios from "axios";
import { Sidebar } from "@/pages/components/Sidebar";
import { EngagementData, EngagementMetrics } from "@/types/engagementType";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react"; // Import Menu icon
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch metrics data
      const metricsResponse = await axios.get(
        "https://engage-lens-backend.onrender.com/api/analytics/engagement-metrics"
      );
      setMetrics(metricsResponse.data || []);

      // Fetch posts data
      const postResponse = await axios.get(
        "https://engage-lens-backend.onrender.com/api/analytics/all-posts"
      );
      setAllPosts(postResponse.data || []);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 bg-red-50 border-red-100">
          <h2 className="text-xl font-semibold text-red-800">{error}</h2>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={`
          fixed top-2 left-4 z-50 lg:hidden
          bg-[#18181B] text-white
          hover:bg-gray-700 hover:text-white
          ring-2 ring-white/20 shadow-lg
          transition-all duration-200
          hover:ring-white/40 hover:scale-105
          active:scale-95
        `}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden mt-[3.5rem] ml-0 lg:ml-0 sm:ml-10 sm:mt-10">
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <Outlet context={{ isLoading, metrics, allPosts }} />
        </main>
      </div>
    </div>
  );
}