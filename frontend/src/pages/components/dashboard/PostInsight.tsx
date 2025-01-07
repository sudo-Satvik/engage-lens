
import { useOutletContext } from 'react-router-dom';
import { MetricCards } from "@/components/dashboard/metric-cards";
import { LineGraph } from "@/components/dashboard/line-graph";
import { EngagementData, EngagementMetrics } from "@/types/engagementType";

interface DashboardContext {
  isLoading: boolean;
  metrics: EngagementMetrics[];
  allPosts: EngagementData[];
}

export default function PostInsight() {
  const { isLoading, metrics, allPosts } = useOutletContext<DashboardContext>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Post Engagement Overview</h2>
        <h3 className="text-md text-gray-400 tracking-tight">Average Interaction Types</h3>
      </div>
      <MetricCards isLoading={isLoading} metrics={metrics} allPosts={allPosts} />
      <LineGraph isLoading={isLoading} data={allPosts} />
    </div>
  );
}

