// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import axios from "axios";

// interface InsightsDisplayProps {
//   isLoading: boolean;
// }

// const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ isLoading }) => {
//   // const [insights, setInsights] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInsights = async () => {
//       try {
//         // const response = await axios.get("http://localhost:8000/api/analytics/insights");
//         // console.log("Fetched insights:", response.data);
//         // setInsights(response.data.insights);
//       } catch (error) {
//         console.error("Error fetching insights:", error);
//         setError("Failed to fetch insights. Please try again later.");
//       }
//     };

//     if (!isLoading) {
//       fetchInsights();
//     }
//   }, [isLoading]);

//   return (
//     <Card className="col-span-3">
//       <CardHeader>
//         <CardTitle>AI Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <p>Loading insights...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : insights ? (
//           <div className="space-y-2">
//             <p className="text-sm text-gray-600">Here are the AI-generated insights based on your engagement metrics:</p>
//             <div className="p-4 bg-muted rounded-lg">
//               {insights.split('\n').map((line, index) => (
//                 <p key={index} className="mb-2">{line}</p>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No insights available. Please check your engagement metrics and try again.</p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default InsightsDisplay;
