import { useEffect, useState } from 'react'
import {EngagementData, EngagementMetrics} from '../../types/engagementType';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8000/api/analytics/generate-mock-data", {count: 50});

        const metricResponse = await axios.get("http://localhost:8000/api/analytics/engagement-metrics");
        
        if(!response.data || !metricResponse.data){
          throw new Error("Error generating mock data");
        }
        console.log("generated data", response.data);
        console.log("engagement metrics", metricResponse.data);
        setAllPosts(response.data);
        setMetrics(metricResponse.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);


  if(loading){
    return (
      <>
      <main>
        <h2 className='text-3xl font-bold'>Loading...</h2>
      </main>
      </>
    )
  }

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Social Media Dashboard</h1>
      
      {/* Engagement Metrics Chart */}
      <div className="mb-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgLikes" stroke="#8884d8" name="Avg Likes" />
            <Line type="monotone" dataKey="avgShares" stroke="#82ca9d" name="Avg Shares" />
            <Line type="monotone" dataKey="avgComments" stroke="#ffc658" name="Avg Comments" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.postType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.likes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.shares}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.comments}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(post.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Dashboard