import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsUp, Share2, MessageCircle, TrendingUp, TrendingDown, Image, Video, Images } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AllPost, EngagementMetrics } from '@/types/engagementType';

interface MetricCardsProps {
  isLoading: boolean;
  metrics?: EngagementMetrics[];
  allPosts?: AllPost;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'carousel':
      return <Images className="h-5 w-5 text-blue-500" />;
    case 'reel':
      return <Video className="h-5 w-5 text-purple-500" />;
    case 'static':
      return <Image className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

export default function MetricCards({ isLoading, metrics, allPosts }: MetricCardsProps) {
  const calculateEngagementMetrics = () => {
    if (!Array.isArray(allPosts?.posts) || allPosts.posts.length === 0) {
      return { totalPosts: 0, totalEngagement: 0, distributions: [], changes: {} };
    }

    const totalPosts = allPosts.posts.length;
    console.log("metrics", metrics);
    const totalEngagement = allPosts.posts.reduce((acc, post) => {
      return acc + post.likes + post.shares + post.comments;
    }, 0);

    const postTypeCount = allPosts.posts.reduce((acc, post) => {
      acc[post.postType] = (acc[post.postType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const distributions = Object.entries(postTypeCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));

    const engagementByType = allPosts.posts.reduce((acc, post) => {
      if (!acc[post.postType]) {
        acc[post.postType] = {
          likes: 0,
          shares: 0,
          comments: 0,
          count: 0
        };
      }
      acc[post.postType].likes += post.likes;
      acc[post.postType].shares += post.shares;
      acc[post.postType].comments += post.comments;
      acc[post.postType].count += 1;
      return acc;
    }, {} as Record<string, { likes: number; shares: number; comments: number; count: number }>);

    const totalAvg = totalEngagement / totalPosts;
    const changes = Object.entries(engagementByType).reduce((acc, [type, data]) => {
      const typeAvg = (data.likes + data.shares + data.comments) / data.count;
      acc[type] = ((typeAvg - totalAvg) / totalAvg) * 100;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPosts,
      totalEngagement,
      distributions,
      changes
    };
  };

  const { totalPosts, totalEngagement, distributions, changes } = calculateEngagementMetrics();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-lg border">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} posts`}</p>
          <p className="text-gray-600">{`(${((payload[0].value / totalPosts) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const MetricChange = ({ type, change }: { type: string; change: number }) => (
    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
      <div className="flex items-center gap-2">
        {getContentTypeIcon(type)}
        <span className="capitalize font-medium">{type}</span>
      </div>
      <div className="flex items-center gap-1">
        {change > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`${change > 0 ? "text-green-500" : "text-red-500"} font-medium`}>
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-card h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Engagements</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-[calc(100%-4rem)]">
          {isLoading ? (
            <Skeleton className="h-10 w-24" />
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="text-6xl font-bold">{(totalEngagement ?? 0).toLocaleString()}</div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    {Array.isArray(allPosts?.posts) ? allPosts.posts.reduce((sum, post) => sum + post.likes, 0).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    {Array.isArray(allPosts?.posts) ? allPosts.posts.reduce((sum, post) => sum + post.shares, 0).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">
                    {Array.isArray(allPosts?.posts) ? allPosts.posts.reduce((sum, post) => sum + post.comments, 0).toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Engagement Growth Metrics by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="space-y-2  mt-5">
              {changes && Object.entries(changes).map(([type, change]) => (
                <MetricChange key={type} type={type} change={change} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Post Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributions}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributions.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

