"use client";

import { useState, useEffect } from "react";
import { AiChat } from "@/components/dashboard/ai-chat";
import { LineGraph } from "@/components/dashboard/line-graph";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { Sidebar } from "@/pages/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { EngagementData, EngagementMetrics } from "@/types/engagementType";
import axios from "axios";
import { Card } from "@/components/ui/card";
import InsightsDisplay from "./InsightsDisplay";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<string>("");

  console.log("all posts", allPosts);
  console.log("metrics", metrics);

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

        //fetch insigts
        const insightsResponse = await axios.get(
          "http://localhost:8000/api/analytics/insights"
        );
        //debugging line
        console.log("insights response", insightsResponse);
        setInsights(insightsResponse.data);
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

        //fetch insigts
        const insightsResponse = await axios.get(
          "http://localhost:8000/api/analytics/insights"
        );
        //debugging line
        console.log("debugging insights", insightsResponse);
        setInsights(insightsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch data. Please try again."
      );
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
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <main>
          <h2 className="text-3xl font-bold">Loading...</h2>
        </main>
      </>
    );
  }

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
        <header className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Hello UserName
          </h2>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <MetricCards isLoading={isLoading} />
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-6">
            <LineGraph isLoading={isLoading} />
            <InsightsDisplay isLoading={loading} insights={insights} />
            <AiChat isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}
