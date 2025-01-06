import { useEffect, useState } from "react";
import { EngagementData, EngagementMetrics } from "../../types/engagementType";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
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
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Social Media Dashboard</h1>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgLikes"
                stroke="#8884d8"
                name="Avg Likes"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="avgShares"
                stroke="#82ca9d"
                name="Avg Shares"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="avgComments"
                stroke="#ffc658"
                name="Avg Comments"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.postType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.likes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.comments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(post.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
