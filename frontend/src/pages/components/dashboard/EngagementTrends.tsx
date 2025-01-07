
import { useOutletContext } from 'react-router-dom';
import { LineGraph } from "@/components/dashboard/line-graph";
import { EngagementData } from "@/types/engagementType";

interface DashboardContext {
  isLoading: boolean;
  allPosts: EngagementData[];
}

export default function EngagementTrends() {
  const { isLoading, allPosts } = useOutletContext<DashboardContext>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Engagement Trends</h2>
        <h3 className="text-md text-gray-400 tracking-tight">Analyze your engagement over time</h3>
      </div>
      <LineGraph isLoading={isLoading} data={allPosts} />
    </div>
  );
}

