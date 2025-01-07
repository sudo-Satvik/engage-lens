"use client";
import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import axios from "axios";
import { Sidebar } from "@/pages/components/Sidebar";
import { EngagementData, EngagementMetrics } from "@/types/engagementType";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
          { count: 100 }
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
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch data. Please try again."
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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <Outlet context={{ isLoading, metrics, allPosts }} />
        </main>
      </div>
    </div>
  );
}
