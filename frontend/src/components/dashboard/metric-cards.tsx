// import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Video } from 'lucide-react'

interface MetricCardsProps {
  isLoading: boolean;
}

export function MetricCards({ isLoading }: MetricCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">400</div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">400</div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-card sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performing Post Type</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <Video className="h-6 w-6" />
              <div className="text-2xl font-bold">Video</div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

