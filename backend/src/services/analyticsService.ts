import { v4 as uuidv4 } from "uuid";
import { EngagementModel } from "../models/engagementModel";
import { EngagementData, EngagementMetrics } from "../types/index";
import { getCollection } from "../config/database";


const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const generateMockData = async (
  count: number = 200
): Promise<EngagementData[]> => {
  const postTypes = ["static", "reel", "carousel"];
  const mockData: EngagementData[] = [];
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());


  for (let i = 0; i < count; i++) {
    mockData.push({
      id: uuidv4(),
      postType: postTypes[Math.floor(Math.random() * postTypes.length)],
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 100),
      timestamp: generateRandomDate(startDate, endDate).getTime(),
    });
  }
  await EngagementModel.insertMany(mockData);
  return mockData;
};

export const getEngagementMetrics = (): Promise<EngagementMetrics[]> => {
  const pipeline = [
    {
      $group: {
        _id: "$postType",
        avgLikes: { $avg: "$likes" },
        avgShares: { $avg: "$shares" },
        avgComments: { $avg: "$comments" },
        count: { $sum: 1 },
      },
    },
  ];

  return EngagementModel.aggregate(pipeline);
};

export const getAllPost = async () => {
  const collection = getCollection("engagement_metrics");
  const result = await collection.find({}).toArray();
  return result;
};
