"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface InsightsDisplayProps {
  insights: string;
  isLoading: boolean;
}

const InsightsDisplay: React.FC<InsightsDisplayProps> = ({
  insights,
  isLoading,
}) => {
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading insigts...</p>
          ) : insights ? (
            <div className="space-y-2">
              {insights.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p>No insights available. Try generating some!</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default InsightsDisplay;
