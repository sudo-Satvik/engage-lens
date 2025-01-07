import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

// Generate 2 years of sample data
const generateSampleData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2); // Go back 2 years

  for (let i = 0; i < 730; i++) { // 2 years * 365 days
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Generate random values with some patterns
    const baseValue = Math.sin(i / 30) * 50 + 100; // Creates a wave pattern
    const randomFactor = Math.random() * 30 - 15;
    
    data.push({
      timestamp: currentDate.getTime(),
      likes: Math.max(0, Math.round(baseValue + randomFactor)),
      shares: Math.max(0, Math.round((baseValue * 0.6) + randomFactor)),
      comments: Math.max(0, Math.round((baseValue * 0.4) + randomFactor))
    });
  }
  
  return data;
};

const sampleData = generateSampleData();

interface LineGraphProps {
  isLoading: boolean;
  data?: any; // Make data optional since we're using sample data
}

export const LineGraph: React.FC<LineGraphProps> = ({ isLoading }) => {
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [filterDays, setFilterDays] = useState("30");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Helper function to format date based on selected range
  const formatDate = (timestamp: number, days: number) => {
    const date = new Date(timestamp);
    if (days <= 30) {
      // For shorter ranges, show "Jan 1"
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (days <= 90) {
      // For medium ranges, show "Jan 1"
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      // For longer ranges, show "Jan 2023"
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
  };

  // Function to filter and process data based on selected days
  const processData = (days: string) => {
    const daysNum = parseInt(days);
    const currentDate = new Date().getTime();
    const cutoffDate = currentDate - (daysNum * 24 * 60 * 60 * 1000);

    // Filter and sort data
    const filtered = sampleData
      .filter(item => item.timestamp >= cutoffDate)
      .map(item => ({
        ...item,
        date: formatDate(item.timestamp, daysNum)
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    // For longer periods, aggregate data by week or month
    if (daysNum > 90) {
      const aggregated = filtered.reduce((acc: any, curr) => {
        const date = curr.date;
        if (!acc[date]) {
          acc[date] = {
            date,
            timestamp: curr.timestamp,
            likes: 0,
            shares: 0,
            comments: 0,
            count: 0
          };
        }
        acc[date].likes += curr.likes;
        acc[date].shares += curr.shares;
        acc[date].comments += curr.comments;
        acc[date].count += 1;
        return acc;
      }, {});

      // Average the values
      const aggregatedData = Object.values(aggregated).map((item: any) => ({
        date: item.date,
        timestamp: item.timestamp,
        likes: Math.round(item.likes / item.count),
        shares: Math.round(item.shares / item.count),
        comments: Math.round(item.comments / item.count)
      }));

      setFilteredData(aggregatedData);
    } else {
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      processData(filterDays);
      setSkeletonVisible(false);
    }
  }, [isLoading, filterDays]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">
                {entry.name}: {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-4 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Engagement Metrics Over Time</CardTitle>
        <Select value={filterDays} onValueChange={setFilterDays}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="180">Last 180 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[600px]">
        {skeletonVisible ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-[500px] w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                dy={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                dx={-10}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                name="Likes"
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
                name="Shares"
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#ffc658"
                strokeWidth={2}
                dot={false}
                name="Comments"
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default LineGraph;